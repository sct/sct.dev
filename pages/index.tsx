import { NextPage } from 'next';
import React from 'react';

const IndexPage: NextPage = () => {
  return (
    <>
      <div className="flex flex-col mx-auto max-w-7xl">
        <div className="z-40 flex-1 px-4 pt-6 pb-24 md:px-6 md:py-12">
          <div className="relative z-50 flex flex-col justify-center mx-auto space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-100 sm:text-5xl md:text-6xl">
              <span className="block leading-tight xl:inline">
                Hi, I'm Ryan! 👋
              </span>
            </h1>
            <p className="text-base text-gray-300 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
              This is my internet space for things. I am a{' '}
              <a href="https://github.com/sct" target="_blank" rel="noreferrer">
                software engineer
              </a>{' '}
              that lives and works in Tokyo, Japan 🇯🇵 I'm addicted to coffee ☕️
              and I love{' '}
              <a
                href="https://instagram.com/sctlovescoffee"
                target="_blank"
                rel="noreferrer"
              >
                taking pictures
              </a>{' '}
              📸
            </p>
          </div>
          <div className="mt-20">
            <p className="text-3xl font-extrabold">
              At the moment, I am building <em>very</em> cool stuff at{' '}
              <a href="https://mercari.com" target="_blank" rel="noreferrer">
                Mercari
              </a>
              .
            </p>
            <p className="mt-6 text-2xl font-bold">
              I also build and maintain a neat open-source project called{' '}
              <a href="https://overseerr.dev" target="_blank" rel="noreferrer">
                Overseerr
              </a>
              .
            </p>
            <p className="mt-6 text-gray-300">
              If you want/need to get in contact, shoot me an{' '}
              <a href="mailto:ryan@sct.dev">email</a>. You can also find me on{' '}
              <a
                href="https://www.linkedin.com/in/ryan-cohen-a156aa13/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
