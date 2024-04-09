export const paginateMovies = (movies, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize
  return movies.slice(startIndex, startIndex + pageSize)
}

export const paginatePages = () => {
  return
}