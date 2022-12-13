import React from "react";
import Keyboard from "../../assets/banner-tiles/keyboard-black.png";
import DarkPurpleWindows from "../../assets/banner-tiles/waves.png";
import PurpleWindows from "../../assets/banner-tiles/window-purple.png";
import Head from "../../assets/banner-tiles/head.png";
import Neon from "../../assets/banner-tiles/neon.png";
import FlowWater from "../../assets/banner-tiles/flow-water.png";
import ManCoffee from "../../assets/banner-tiles/man-coffee.png";
import DarkPurple from "../../assets/banner-tiles/dark-purple.png";

export default function BannerTiles() {
  return (
    <div className="relative overflow-hidden poppins dark:shadow-2xl  ">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 ">
        <div className=" border-2relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg bg-text-ghost-white md:w-2/3   dark:bg-oxford-blue p-14  border-y-4 rounded-md border-ultramarine-blue-2  dark:border-cyber-yellow ">
            <h1 className="font text-4xl  font-bold tracking-tight text-ultramarine-blue sm:text-6xl">
              MERN+
            </h1>
            <h1 className="font text-4xl  font-bold tracking-tight text-ultramarine-blue-2 sm:text-6xl">
              Excelling in your coding career!
            </h1>
            <p className="mt-4 sm:text-4xl font-bold   text-bg-xiketic dark:text-cyber-yellow  text-bold ">
              Unleash your MERN potential with our challenges!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none md:absolute md:inset-y-0 md:mx-auto md:w-full md:max-w-7xl"
              >
                <div className=" absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-8">
                  <div className="flex items-center space-x-6 md:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 md:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 md:opacity-100">
                        <img
                          src={DarkPurple}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={PurpleWindows}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 md:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={Head}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={Keyboard}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={ManCoffee}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 md:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={Neon}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={FlowWater}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/5  w-2/6 md:w-1/2 lg:w-1/3 sm:flex lg:flex-shrink-0 sm:flex-row sm:justify-around">
                {/* <button className="rounded bg-cyber-yellow mb-2 sm:mx-4 sm:mb-0 sm:py-4 sm:py-2 px-12  text-center font-medium text-dark-raisin-black hover:bg-javascript-yellow ">
                  Start Journey
                </button> */}
                <button className="mb-2  sm:w-1/4 md:w-2/4 md:p-3 md:mr-2 sm:mb-0 rounded font-medium inline-flex w-full sm:w-2/4 items-center justify-center bg-cyber-yellow px-6 py-3 text-bg-ultramarine-blue-2  text-ultramarine-blue hover:bg-javascript-yellow ">
                  Start Journey
                </button>
                <button className="rounded md:w-2/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue ">
                  Test Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
