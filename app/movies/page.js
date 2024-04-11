import Link from "next/link"
import clientPromise from "@/db/mongodb"
import { ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid"

export const metadata = {
  title: 'Movies',
}

async function getMovies(perPage, page) {
  try {
    const client = await clientPromise
    const db = client.db("sample_mflix")

    const movies = await db
      .collection("movies")
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray()

    const itemCount = await db.collection("movies").countDocuments({})

    const res = { movies, itemCount }
    return res
  } catch(e) {
    console.error(e.message)
  }
}

export default async function Page({ searchParams }) {
  // initial searchParams is {} and NaN so convert to a number starting at 1
  // if page is undefined || null then set page # to 1 otherwise to current page #
  let page = parseInt(searchParams.page, 10)
  page = !page || page < 1 ? 1 : page
  const perPage = 16
  const data = await getMovies(perPage, page)

  const totalPages = Math.ceil(data.itemCount / perPage)

  const prevPage = page - 1 > 0 ? page - 1 : 1
  const nextPage = page + 1
	const isPageOutOfRange = page > totalPages

  // everytime move to and back a page, push page number to route
  const pageNumbers = []
  const offsetNumber = 3
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i)
    }
  }

  return (
    <div className="container mx-auto sm:my-32">
       <section className="grid grid-cols-4 gap-4 text-center">
        {data.movies.map((movie) => (
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

        {isPageOutOfRange ? (
          <div className="container block w-full p-12 mx-auto text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <h1 className="dark:text-zinc-300">No more pages....</h1>
          </div>
        ) : (
          <nav></nav>
        )}
    </div>
  )
}