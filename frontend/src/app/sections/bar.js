import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Example() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-yellow-400 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm/6 text-black">
            <a href="#agenda">
              <strong className="font-semibold">TARGI PRACY JESIEŃ 2024</strong>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              Odwiedź nas na targach&nbsp;<span aria-hidden="true">&rarr;</span>
            </a>
          </p>
          <button
            type="button"
            className="-m-1.5 flex-none p-1.5"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="size-5 text-black" />
          </button>
        </div>
      </div>
    </>
  );
}
