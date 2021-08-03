import { NextPage } from 'next';
import React from 'react';

const CvPage: NextPage = () => {
  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <div className="z-40 flex-1 px-4 pt-6 pb-24 md:px-6 md:py-8">
        <div className="relative z-50 flex flex-col justify-center mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-100 sm:text-5xl md:text-6xl">
            <span className="block leading-tight xl:inline">Ryan Cohen</span>
          </h1>
          <p className="flex flex-col text-base text-gray-300 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
            <span>
              <span className="mr-2">🇯🇵</span>
              <span>Tokyo, Japan</span>
            </span>
            <span>
              <span className="mr-2">📨</span>
              <a href="mailto:ryan@sct.dev">ryan@sct.dev</a>
            </span>
          </p>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold">Skills</h2>
          <div className="mt-6 info-block">
            <h3>Languages and Libraries/Frameworks</h3>
            <p>
              TypeScript, JavaScript, React, GraphQL (Server and client),
              Node.js, Apollo, PHP, Laravel
            </p>
            <h3>Cloud Tech</h3>
            <p>
              AWS, Google Cloud Platform, Kubernetes, DigitalOcean, Heroku,
              Netlify, Vercel
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold">Work History</h2>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                July 2018 to August 2021
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">U-NEXT</span>
                <span className="yellow-badge">Principal Engineer</span>
              </span>
            </div>
            <div className="ml-4 prose">
              <ul>
                <li>
                  Spearheaded shift to GraphQL on a company level. Leading the
                  design and development of the future major APIs that power the
                  video streaming service
                </li>
                <li>
                  Lead complete rebuild of U-NEXT's frontend video service with
                  GraphQL, TypeScript, and NextJS
                </li>
                <li>
                  Solo built an internal evaluation system used for the
                  bi-annual peer evaluations using Prisma and TypeScript
                </li>
                <li>
                  Created internal CLI tools to automatically bootstrap and
                  configure new NextJS projects for easy deployment. Mainly used
                  for promotion-style temporary websites
                </li>
                <li>
                  Reapproached the CI/CD process for our projects to streamline
                  testing and deployment with GitHub Actions
                </li>
                <li>
                  Ran multiple group study sessions for TypeScript, GraphQL, and
                  React
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                January 2017 to January 2018
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">Stratz</span>
                <span className="yellow-badge">Frontend Engineer</span>
              </span>
            </div>
            <div className="ml-4 prose">
              <ul>
                <li>
                  Solo developed and deployed a single-page React application
                  working with a C# API backend
                </li>
                <li>Used Heroku for deploying the frontend SPA</li>
                <li>Fully test-driven deployments</li>
                <li>
                  Managed team contributions and handled code reviews (Using
                  GitHub PRs)
                </li>
                <li>
                  Built a fully working Electron desktop app that worked with a
                  Python screen reader to analyze screen data and perform API
                  actions based on the data gathered
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                January 2012 to Present
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">Technic</span>
                <span className="yellow-badge">Full-stack Engineer</span>
              </span>
            </div>
            <div className="ml-4 prose">
              <ul>
                <li>
                  Developed and deployed a fully custom game management system
                </li>
                <li>
                  Designed and developed a client-side game launcher in Java
                </li>
                <li>
                  Solely responsible for all website management, server
                  management, community management
                </li>
                <li>
                  Worked with Amazon Web Services (Including EC2, S3, OpsWorks,
                  SES, CloudWatch, Cloudfront) and DigitalOcean
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                December 2010 to August 2011
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">CSN Media</span>
                <span className="yellow-badge">Frontend Engineer</span>
              </span>
            </div>
            <div className="ml-4 prose">
              <ul>
                <li>Developed several high profile website back-end systems</li>
                <li>
                  Headed the team on some major projects, managing and assigning
                  tasks
                </li>
                <li>Created a multitude of WordPress and Joomla plugins</li>
                <li>
                  Fully customized WordPress on one site, including getting it
                  to work with a remote Oracle Database for user authentication
                </li>
                <li>Dealt with cross-site database synchronization</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                March 2010 to December 2010
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">Real Local Pages</span>
                <span className="yellow-badge">Web Developer</span>
              </span>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                June 2009 to March 2010
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">Intech Center</span>
                <span className="yellow-badge">Web Developer</span>
              </span>
            </div>
          </div>
          <div className="mt-6 info-block">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-200">
                January 2008 to December 2008
              </span>
              <span className="flex items-center text-2xl font-semibold text-gray-100">
                <span className="mr-2">Archon Media</span>
                <span className="yellow-badge">Web Developer</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-extrabold">Open-source Work</h2>
          <div className="mt-6 prose">
            <ul className="ml-4">
              <li>
                <a
                  href="https://overseerr.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  Overseerr
                </a>{' '}
                - Request management and media discovery tool for the Plex
                ecosystem
              </li>
              <li>
                <a
                  href="https://github.com/TechnicPack/TechnicSolder"
                  target="_blank"
                  rel="noreferrer"
                >
                  Technic Solder
                </a>{' '}
                - PHP web app that brings incremental pack updates to the
                Technic Launcher and Technic Platform
              </li>
              <li>
                <a
                  href="https://github.com/sct/sct.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  This Website
                </a>
              </li>
            </ul>
            <p>
              You can view my other open-source projects and contributions on my{' '}
              <a
                href="https://github.com/sct/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub profile
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-extrabold">Public Speaking</h2>
          <div className="mt-6 prose">
            <ul className="ml-4">
              <li>
                <a
                  href="https://webhack.connpass.com/event/142025/"
                  target="_blank"
                  rel="noreferrer"
                >
                  WebHack#25 x U-NEXT: GraphQL & Regression Test
                </a>{' '}
                (2019)
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-extrabold">Language</h2>
          <div className="mt-6 prose">
            <ul className="ml-4">
              <li>
                <strong>English</strong> - Native Speaker
              </li>
              <li>
                <strong>Japanese</strong> - Conversational
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-8"></div>
    </div>
  );
};

export default CvPage;
