---
title: Tips for Setting up GitLab Runner's on a Rancher 2.x Kubernetes Cluster
date: "2019-02-27"
---

Have you ever been assigned that task where everything seems to go wrong because of tiny issues that you only discover one by one as they crop up? That was my experience with getting GitLab Runner's inside of a Rancher 2.x Kubernetes cluster. Hopefully this article can save you the time I spent figuring out all those layers and you can get your runners in your cluster working in no time.

**Note:** The following experiences are from deploying the gitlab-runner image myself without using GitLab's Helm charts. You may have more luck with that! [GitLab Runner Helm Chart Documentation](https://docs.gitlab.com/ee/install/kubernetes/gitlab_runner_chart.html)

## Tip 1: Be aware of the docker in docker caveats

There are some interesting conditions that can occur when running docker in docker. You will find in almost every example that you should include the `docker:dind` image as a service if you plan on building docker inside of docker. What if we try to do the same thing in privileged mode? You may find your pipelines throwing any error saying it cannot connect to the docker socket!

But why? You are running the docker-in-docker service right? What's the problem? Well, due to the separated nature of the containers the actual build container is unaware of the service container. It tries to default to the unix socket but really should be communicating over TCP. This is actually [in the documentation](https://docs.gitlab.com/runner/executors/kubernetes.html#using-dockerdind) but may not be obvious at first glance. To fix it, add the following variable to your `.gitlab-ci.yaml`:

```yaml
variables:
  DOCKER_HOST: tcp://localhost:2375
  DOCKER_DRIVER: overlay
```

This will instruct the helper container to connect to the docker-in-docker service container over TCP and the problem will disappear!

## Tip 2: Register your runners with an initContainer

This one is interesting because the [documentation](https://docs.gitlab.com/runner/install/kubernetes.html) does actually mention registering your runner before starting it but suggests doing it through the runner's API. We can do better.

Kubernetes offers the ability to define `initContainers` which are one-off containers that will run _before_ the normally defined containers are. This means we can actually run a container specifically to register our runner and pass that config to the actual runner container through a volume! It's much cleaner! Here's how you do it...

Add an `initContainers` block to your spec in your deployment yaml:

```yaml{23-25}
initContainers:
  - args:
    - register
    env:
    - name: CI_SERVER_URL
      value: <your ci server>
    - name: KUBERNETES_PRIVILEGED
      value: "true"
    - name: REGISTER_NON_INTERACTIVE
      value: "true"
    - name: REGISTRATION_TOKEN
      value: <your registration token>
    - name: RUNNER_EXECUTOR
      value: kubernetes
    - name: RUNNER_REQUEST_CONCURRENCY
      value: "4"
    image: gitlab/gitlab-runner:latest
    name: init-runner
    volumeMounts:
    - mountPath: /etc/gitlab-runner
      name: config
```

A core part of this is highlighted above. We are also mounting a volume to this `initContainer` so that we will have the generated `config.toml` available to the actual main runner container. Make sure to mount the same volume for your main container as well or the config will not be passed over! With this method you don't need to create a ConfigMap at all and your pods start they will register themselves to your cluster!

If there is any downside to this is that it will always re-register your container any time the pod is redeployed. So might need to play cleanup in your Gitlab to kill dead old runners that are no longer available.

## Tip 3: Watch out for varying MTU's!

This one was a killer because I have never worked in a space where my Docker's MTU was different from the host's MTU. And because Rancher runs the Kubernetes cluster in docker containers this hit me hard. I was able to get my runner's to connect to my Gitlab but they never seemed able to actually keep a curl connection open without timing out. This means the runners couldn't actually request new jobs!

What was actually going wrong? The host machine's MTU was set to 1450, while docker was running at 1500. So every request was getting clipped by 50 bytes! 😱

This is solvable though! You can [customize the docker0 bridge](https://docs.docker.com/v17.09/engine/userguide/networking/default_network/custom-docker0/) to use any MTU you like! This fixed the runner being able to receive jobs and now my pods were actually spinning up! But uh oh, another problem. The runner sometimes had tasks that would spin up docker within itself! Another layer of docker in docker! The MTU we sent on the hosts dockerd does not propagate into the newly spawned docker process by the runner. Once again our MTU is set incorrectly!

Don't worry though we can solve this too! We can actually pass the same MTU argument into the dockerd that is being started by `docker:dind` in our `.gitlab-ci.yaml` file directly like so:

```yaml
services:
  - name: docker:dind
    command: ["--mtu=1450"]
```

🎉 Tada! All fixed! Did you know you can set commands for services? I have never had to use this feature until running into this problem but I am glad it's there! You can see what other options are available for services [here](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#available-settings-for-services).

## That's all for now!

These tips may or may not help you. But if theres some poor soul out there struggling to figure out why their CI isn't running when using the kubernetes executor my hope is that they stumble across this article and I can help save them some time.

I have learned a hell of a lot about GitLab's CI over the past few weeks and I plan on sharing more over time. Some planned articles are:

- How to build and deploy an Elixir application with GitLab CI
- How to use GitLab CI to validate and push new versions of your Apollo GraphQL schema to Apollo Engine
- Solving user touch/mouse interaction with tablets in a React application

Jeez two of those are dev-ops. What have I become? If you somehow find this article because of the above list and I haven't written the new articles yet, hit me up [on Twitter](https://twitter.com/sctx) and I will try and help you out.

Until next time, peace! ✌️