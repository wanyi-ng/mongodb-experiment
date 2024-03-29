"use client"
import { Suspense, useState } from 'react'
import LoadingAllMovies from './loading'
import Search from '@/components/movies/Search'
import { paginateMovies } from '@/helpers/paginate'
import Pagination from '@/components/movies/Pagination'

export default function MovieComponent({ movies, searchParams }) {  

  return (
    <Suspense fallback={<LoadingAllMovies />}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <Search />
        <section className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {movies.map((movie) => (
            <div key={movie._id} className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group">
              <div className="bg-gray-200 aspect-h-4 aspect-w-3 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="object-cover object-center w-full h-full sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={movie.title}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {movie.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{movie.plot}</p>
                <div className="flex flex-col justify-end flex-1">
                  <p className="text-sm italic text-gray-500">{movie.runtime} min</p>
                  <p className="text-base font-medium text-gray-900">{movie.year}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Suspense>
  )
}

{/* <Pagination
  moviesLength={movies.length} // 100
  currentPage={currentPage} // 1
  pageSize={pageSize} // 15
  onPageChange={onPageChange}
/> */}