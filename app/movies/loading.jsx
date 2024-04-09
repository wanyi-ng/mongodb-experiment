import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

function SearchSkeleton() {
  return (
    <div className="pb-5 my-16 border-b border-gray-200 sm:my-24 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900">All Movies</h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              disabled
              type="text"
              name="mobile-search-movies"
              id="mobile-search-movies"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
              placeholder="Search movies"
            />
            <input
              disabled
              type="text"
              name="desktop-search-movies"
              id="desktop-search-movies"
              className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
              placeholder="Search movies"
            />
          </div>
          <button
            disabled
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Sort
            <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LoadingAllMovies() {
  return (
    <div className="container px-4 mx-auto my-16 sm:px-6 lg:px-8 sm:my-24">
      {/* <SearchSkeleton /> */}
      <section className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, i) => (
            <div key={i} className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="bg-gray-200 aspect-h-4 aspect-w-3 sm:aspect-none sm:h-96" />
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <span className="h-4 bg-gray-200 rounded-md" />
                <div className="flex flex-col justify-end flex-1 space-y-2">
                  <span className="w-full h-2 bg-gray-200 rounded-full" />
                  <span className="w-full h-2 bg-gray-200 rounded-full" />
                  <span className="w-2/3 h-2 bg-gray-200 rounded-full" />
                </div>
                <div className="flex flex-col justify-end flex-1 space-y-2">
                  <span className="w-1/4 h-2 bg-gray-200 rounded-full" />
                  <span className="w-1/5 h-2 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}
