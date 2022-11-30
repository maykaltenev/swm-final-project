import React from "react";

export default function Collapsible() {
  return (
    <div class="bg-gray-300 text-gray-600 min-h-screen">
      <div class="container mx-auto ml-8 md:ml-16 py-16 px-12 ">
        <details
          class="bg-snow shadow rounded group mb-4 border-solid border-2 hover:border-ultramarine-blue"
          open
        >
          <summary
            class="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 class="flex flex-1 p-4 font-semibold">Java Script</h3>
            <div class="flex w-10 items-center justify-center">
              <div
                class="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div class="p-4">
            <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-8 h-8 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30   title-font font-medium text-sm ">
                1
              </div>
              <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128px"
                  height="128px"
                  viewBox="0 0 256 256"
                  preserveAspectRatio="xMinYMin meet"
                >
                  <path d="M0 0h256v256H0V0z" fill="#F7DF1E" />
                  <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" />
                </svg>
                <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 class="font-medium title-font text-gray-900 mb-1 text-xl bg-gray-200">
                    Start your journey with the JavaScript Path
                  </h2>
                  <p class="leading-relaxed bg-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem vero impedit adipisci eius, accusamus culpa,
                    distinctio illum atque sunt rerum facere ex quia delectus
                    perspiciatis ipsa eos beatae odio voluptas.
                  </p>
                </div>
              </div>
              {/* <p>
              You can{" "}
              <a
                class="text-pink-500 hover:text-pink-300 hover:underline"
                href="https://youtu.be/CS2bsaFRECo"
              >
                watch the video
              </a>{" "}
              🎦 on how to build collapsible component from scratch with HTML
              and Tailwindcss only (no javascript).
            </p> */}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
