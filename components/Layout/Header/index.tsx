'use client';

import { Transition } from '@headlessui/react';
import useClickOutside from 'hooks/useClickOutside';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  useClickOutside(ref, () => setMobileMenuIsOpen(false));

  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <div className="relative z-50 pb-8 sm:pb-16 md:pb-16 lg:w-full lg:pb-28 xl:pb-16">
        <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" className="w-auto text-2xl font-bold fancy-link">
                  sct.dev
                </Link>
                <div className="flex items-center -mr-2 md:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-500 bg-gray-700 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    id="main-menu"
                    aria-haspopup="true"
                    onClick={() => setMobileMenuIsOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="justify-end flex-1 hidden md:ml-10 md:pr-4 md:space-x-8 md:flex">
              <a
                href="https://github.com/sct"
                className="font-medium text-gray-300 hover:text-white"
              >
                GitHub
              </a>
            </div>
          </nav>
        </div>
        <Transition
          show={mobileMenuIsOpen}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform md:hidden">
            <div
              className="overflow-hidden bg-gray-800 rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
              ref={ref}
            >
              <div className="flex items-center justify-between px-5 pt-4">
                <Link href="/" className="w-auto h-8">
                  sct.dev
                </Link>
                <div className="-mr-2">
                  <button
                    onClick={() => setMobileMenuIsOpen(false)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-700 rounded-md hover:text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close main menu</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="main-menu"
              >
                <div className="px-2 pt-2 pb-3 space-y-1" role="none">
                  <a
                    href="https://github.com/sct"
                    className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-gray-100 hover:bg-gray-50"
                    role="menuitem"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
