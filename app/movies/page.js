import Link from "next/link"
import clientPromise from "@/db/mongodb"
import { ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid"
import Filters from "@/components/movies/Filters"

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

  console.log("DATA: ", data.movies)

  return (
    <div className="container p-8 mx-auto sm:my-16">
      <header className="pb-5 mb-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900">All Movies</h3>
        <p className="max-w-4xl mt-2 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut purus ut mauris rutrum accumsan sed eget dolor. Proin pulvinar dictum risus, eu sodales arcu ultricies a. Vivamus aliquet est et risus cursus scelerisque.
        </p>
      </header>

      <Filters />
      
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2">
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
        <nav className="flex items-center justify-between px-4 my-8 border-t border-gray-200 sm:px-0 sm:my-16">
          <div className="flex flex-1 w-0 -mt-px">
            {/* disable Previous when page === 1 */}
            <Link
              href={`?page=${prevPage}`}
              disabled={page === 1}
              aria-label="Previous Page"
              className={`${page === 1 ? "pointer-events-none" : "hover:border-gray-300 hover:text-gray-700"} inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent`}
            >
              <ArrowLongLeftIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
              Previous
            </Link>
          </div>

          <div className="hidden md:-mt-px md:flex">
            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {pageNumbers.map((pageNumber, i) => (
              <Link
                key={i}
                aria-current={`page-${pageNumber}`}
                className={`${pageNumber === page ? "border-indigo-500 text-indigo-600" : "hover:text-gray-700 hover:border-gray-300"} border-transparent text-gray-500 inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium`}
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}
          </div>

          <div className="flex justify-end flex-1 w-0 -mt-px">
            {/* disable Next when page === totalPages */}
            <Link
              href={`?page=${nextPage}`}
              disabled={page === totalPages}
              aria-label="Previous Page"
              className={`${page === totalPages ? "pointer-events-none" : "hover:border-gray-300 hover:text-gray-700"} inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent`}
            >
              Next
              <ArrowLongRightIcon className="w-5 h-5 ml-3 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}