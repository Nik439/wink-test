import { MaxResults } from "../app/booksApiSlice"

export interface SearchLoaderResponse {
  searchQuery: string,
  activePage: number,
  maxElements: MaxResults
}

export function searchLoader ({request}: {request: Request}): SearchLoaderResponse {
  const searchParams = new URL(request.url).searchParams
  const search = searchParams.get('search') || ""
  const pageString = searchParams.get('p')
  let max = parseInt(searchParams.get('max') || "10")
  
  // if pageString is null return 0, if parseInt(pageString) is NaN return 0, otherwise return pageNumber
  let pageNumber = (pageString ? parseInt(pageString)-1 : 0) || 0
  
  if (pageNumber < 0)
    pageNumber = 0

  if ( max != 5 && max != 10 && max != 15 && max != 20 )
    max = 10

  return {
    searchQuery: search,
    activePage: pageNumber,
    maxElements: max as MaxResults
  }
}