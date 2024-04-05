import { Suspense } from "react"
import LoadingAllMovies from "./loading"
import MovieComponent from "."

export const metadata = {
  title: 'Movies',
}

async function getMovies() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/movies`, { cache: "no-store" })
    return res.json()
  } catch(e) {
    console.error(e.message)
  }
}

export default async function Page() {
  const movies = await getMovies()

  return (
    <Suspense fallback={<LoadingAllMovies />}>
      <MovieComponent movies={movies} />
    </Suspense>
  )
}
