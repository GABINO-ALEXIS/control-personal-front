type Props = {};

export const Alert = (props: Props) => {
  return (
    <div className="absolute right-0 top-0 z-[1000] flex w-60 flex-col gap-2 text-[10px] sm:w-72 sm:text-xs">
      <div className="succsess-alert flex h-12 w-full cursor-default items-center justify-between rounded-lg bg-[#232531] px-[10px] sm:h-14">
        <div className="flex gap-2">
          <div className="rounded-lg bg-white/5 p-1 text-[#2b9875] backdrop-blur-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-white">done successfully :)</p>
            <p className="text-gray-500">This is the description section</p>
          </div>
        </div>
        <button className="rounded-md p-1 text-gray-600 transition-colors ease-linear hover:bg-white/5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
