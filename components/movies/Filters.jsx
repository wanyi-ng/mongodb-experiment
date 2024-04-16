"use client"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Search from './Search'

const filters = [
  {
    id: 'sort',
    name: 'Sort',
    options: [
      { value: 'Most Popular', label: 'Most Popular' },
      { value: 'Best Rating', label: 'Best Rating' },
      { value: 'Newest', label: 'Newest' },
    ],
  },
  {
    id: 'genres',
    name: 'Genres',
    options: [
      { value: 'action', label: 'Action' },
      { value: 'adventure', label: 'Adventure' },
      { value: 'comedy', label: 'Comedy' },
    ],
  },
  {
    id: 'country',
    name: 'Country',
    options: [
      { value: 'usa', label: 'USA' },
      { value: 'france', label: 'France' },
      { value: 'spain', label: 'Spain' },
    ],
  },
  {
    id: 'year',
    name: 'Year',
    options: [
      { value: '2024', label: '2024' },
      { value: '2023', label: '2023' },
      { value: '2022', label: '2022' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    options: [
      { value: 'english', label: 'English' },
      { value: 'french', label: 'French' },
      { value: 'spanish', label: 'Spanish' },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filters() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-8 sm:mb-12 bg-gray-50">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.name} className="px-4 py-6 border-t border-gray-200">
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -mx-2 -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-sm text-gray-400 bg-white">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="flex items-center ml-6">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" className="py-6 border-t border-gray-200">
          <h2 id="filter-heading" className="sr-only">
            Movie filters
          </h2>

          <div className="flex items-center justify-between gap-8">
            <Search placeholder={"Search..."} />

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 lg:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden lg:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  as="div"
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                      <span>{section.name}</span>
                      {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 z-10 p-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="pr-6 ml-3 text-sm font-medium text-gray-900 whitespace-nowrap"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  )
}