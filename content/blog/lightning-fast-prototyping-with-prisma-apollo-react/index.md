---
title: Lightning fast prototyping with Prisma, Apollo and React
date: "2019-03-18"
---

So just recently I took on a new project at work. Without getting into the details I needed to basically spin up a somewhat complex system involving a large amount of CRUD operations in less than two months. I have been looking for an opportunity to try Prisma lately and we are already using Apollo and GraphQL at the office so it seemed like the perfect fit to get things up and running... _fast_.

That’s the whole thing here right? I have 2 months to get this side project done along with my normal tasks every week. I need to find a workflow that allows me to be incredibly productive and produce new features at a high rate without any major slowdowns. Prisma you beauty. You saved me here.

## Ok but what is Prisma?
  
For those of you who don’t know Prisma is an ORM layer in between your database and server. Unlike traditional ORM’s, Prisma is defined with GraphQL schemas. You have one file `datamodel.prisma` that let’s you easily define your entire table structure and all the relations therein. If you are already familiar with GraphQL, this will just _make sense_ to you. If you aren’t, it’s not a far stretch to learn it. Here’s an example of what a type declaration and relational association looks like:

```js
type User {
  id: ID! @unique
  email: String! @unique
  password: String!
  name: String!
  posts: [Post!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

Now the magic! Prisma gives you a great CLI that does all the migrations for your database behind the scenes based on this schema! It then builds a **Prisma Client** just for _you_. That generated client (typed, if you use Typescript) let’s you perform all your CRUD operations without any additional effort! Cool!

## Along with Typescript

I gotta be honest here. I have shied away from using Typescript for far too long now. I think I have always been a little bit hesitant to dive learning another way to write the JS I have been writing this whole time. I knew the benefits of typing. I have written in typed languages before. Maybe it was all the additional tooling and setup that scared me? This isn’t a very good excuse though. Typescript tooling is _not that hard_ to setup once you figure it out the first time and even better, Prisma has some great boilerplate projects to get you off the ground and running. So I decided to dive head in to Typescript with this setup and boy am I glad I did.

Of course you’re getting the confidence that your code is typed but the part that really made using Typescript shine for me was how fantastic the tooling is (in tandem with VSCode). That plus the fact that Prisma can output a fully typed Prisma Client for you with no additional effort means you won’t ever be querying for things in your models that don't exist. Once I deploy my Prisma changes to the server, I know that the client will be able to tell me what can and cant be accessed. Whether it be through relations or methods to update an object. This is just _so darn neat!_

It get’s even better though. Because I use Apollo Server to build the endpoint the front end will access, I can also generate types automatically with Apollo Tooling. All my queries on the frontend now become typed and again, I get the intelligent autocomplete for every field I want to access. If something isn’t auto completing then I pretty much know I have made a mistake somewhere in my schema definitions. I love it.

## The actual flow you keep talking about. How does that work?

Okay so lets take it step by step. Let’s say I am creating a blog and I want to have blog posts that have an author. We need two tables usually for this in our database right? Posts and users. Let’s define that first in our Prisma data model.

```js
type User {
  id: ID! @unique
  email: String! @unique
  password: String!
  name: String!
  posts: [Post!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  author: User!
  content: String!
}
```

Once we create our model we simply run `prisma deploy` to create all of our migrations. Because we told Prisma that a `User` can have many `Post` and vice versa, we already have created our association on the database end. Let’s seed this data as well:

```js
mutation {
  user1: createUser(
    data: {
      email: "me@notreal.com"
      password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m" # "secret42"
      name: "Some Person"
      posts: {
        create: [
          {
            title: "Prototyping at lightspeed with Prisma/Apollo/React"
            content: "Here is a post about making this fast with this framework!"
          }
          {
            title: "Another post about another thing"
            content: "Hey you know whats neat? Things are neat! Like this post! Thats a thing!"
          }
        ]
      }
    }
  ) {
    id
  }
}
```

You can define your seed file in your Prisma config. Then we run `prisma seed` to push the test data into our database.

The thing here is that `prisma deploy` already created our Prisma Client for us. No extra work necessary. Now in our GraphQL resolvers we simply import our tailor made client and call the following methods to play with our data.

```js
# Get all posts
const posts = await prisma.posts();

# Get a specific post
const post = await prisma.post({ id });

# Get a posts author
const author = prisma.post({ id }).author();

# and so on...
```

Okay so all the hard work is done for us here, even our GraphQL server. Assuming we have created the appropriate schema with working resolvers using the Prisma Client we can now call our data in the frontend with Apollo Client:

```js
const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      content
      createdAt
      author {
        id
        name
      }
    }
  }
`;

const Home: React.FC = () => (
  <Query query={GET_POSTS}>
    {({ data, loading, error }) => {
      if (error) {
        throw error;
      }

      if (loading) {
        return <div>Loading!</div>;
      }

      const { posts } = data;

      return posts.map((post: GetAllPosts_posts) => (
        <div>
          <h1>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h1>
          <p>{post.content}</p>
        </div>
      ));
    }}
  </Query>
);
```

And then run `apollo client:codegen` to generate types for our query.

_Note:_ If you _really_ want to live on the bleeding edge and you aren't building anything for production then I highly recommend giving [React Apollo Hooks](https://github.com/trojanowski/react-apollo-hooks) a try. Hooks make a lot of sense when used in combination with Apollo and I am actually using hooks all over the place in my project!

Here’s the same component as above but with React Apollo Hooks.

```js
const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (error) {
    throw error;
  }

  if (loading) {
    return <div>Loading!</div>;
  }

  const { posts } = data;

  return posts.map((post: GetAllPosts_posts) => (
    <div>
      <h1><Link to={`/post/${post.id}`}>{post.title}</Link></h1>
      <p>{post.content}</p>
    </div>
  ));
};
```

That’s it! If you make more changes to the Prisma server just rerun `prisma deploy` and echo those changes down the chain to your frontend. You’re cooking with GraphQL now!

## Some important lessons I learned along the way

There are a few things I learned while building this that I had no idea about before. As we are just starting to migrate a major API to GraphQL at the office, I am pleased I discovered some of these gotchas now. I'd like to share them with you.

### Apollo Query components won’t listen to updates if they never succeeded in the first place

Something I hadn’t fully figured out before this project was how to handle authentication on the client side with Apollo. Of course, I understood how to pass along a cookie or to apply an Authorization header but what about managing the state of a user being logged in or not? I ended up forcing my client to try and request the profile from the server when the app first loads. If they are logged in, they get back a profile. If they are not logged in? Well... I would return an error. “You must be logged in to request a profile” or something along those lines.

Herein lies the problem. After a successful login, none of my Apollo components would re-render in the app. I was writing to the cache and triple checked that I was doing it correctly but none of my components subscribing to the _same query_ ever updated! What’s the deal?

It turns out it was the error! If you return an error from a Query, then the query is entirely rejected and nothing is written to cache. That's okay. I get that. The thing is... because the query never succeeded in the first place, it never starts watching for changes. So writing to the cache does nothing! It’s not listening!

I solved this by retuning just `null` for the profile query instead of returning an error when not logged in. Now the Query would succeed and start listening for changes. Problem solved!

### Typescript is not so scary

Too long have I put Typescript on the sidelines and avoided using it. No more! I'm a believer now. There were moments when I felt like my productivity took a major hit while I tried to figure out some way to type whatever implementation I was working on but overall I truly believe that using Typescript only helped me be _more_ productive. Having everything typed from the start meant I knew exactly what would compile and would break long before I ever hit save. Writing Prisma queries became absolute bliss. When I spent the time to properly type my own components then using them everywhere also became hilariously easy. I loved it. I think I will start using Typescript as my go to for future projects.

### I still love GraphQL/Apollo

Most of the reason I was able to be so quick here was, of course, Prisma’s amazing ORM. But without something like Apollo Server/Client... getting all of that into the front end would have still been a lot of extra work. Redux makes sense when working with incredibly complicated application state... but not for something like this. Apollo lets me just ask for data I want, and use it. No crazy state boilerplate required. (I’m looking at you, actions, reducers, sagas, normalizers, etc)

## Conclusion

I have had nothing but fantastic success with this stack. For my case, I even rolled in [Ant Design](https://github.com/trojanowski/react-apollo-hooks) to take out some of the effort of building my components for the prototype which further sped up my workflow. I went from having nothing to meeting all the design requirements in a week! And that’s _with_ having my other normal sprint tasks. Wow! (To be fair, that does include some time I put in on the weekend but hey... still fast!)

I have uploaded the stack I am using as a boilerplate [on my github here](https://github.com/sct/prisma-apollo-react-boilerplate). I really hope you give it a try! The README should cover most of the setup and explain some of the helpful VSCode tasks I bundled in.

And of course, if you have any questions about _anything_ above or if i made some mistake you would like to correct then please reach out to me on [Twitter](https://twitter.com/sctx). I’m happy to help.