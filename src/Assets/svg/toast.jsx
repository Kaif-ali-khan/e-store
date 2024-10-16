import React from "react";

const Toast = () => {
  return (
    <div
      id="dismiss-toast"
      className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
      role="alert"
      tabindex="-1"
      aria-labelledby="hs-toast-dismiss-button-label"
    >
      <div className="flex p-4">
        <p
          id="hs-toast-dismiss-button-label"
          className="text-sm text-gray-700 dark:text-neutral-400"
        >
          Your email has been sent
        </p>

        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
            aria-label="Close"
            data-hs-remove-element="#dismiss-toast"
          >
            <span className="sr-only">Close</span>
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
