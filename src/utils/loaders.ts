export interface SearchLoaderResponse {
  searchQuery: string,
  activePage: number
}

export function searchLoader ({request}: {request: Request}): SearchLoaderResponse {
  const searchParams = new URL(request.url).searchParams
  const search = searchParams.get('search') || ""
  const pageString = searchParams.get('p')
  console.log(pageString);
  
  // if pageString is null return 0, if parseInt(pageString) is NaN return 0, otherwise return pageNumber
  let pageNumber = (pageString ? parseInt(pageString)-1 : 0) || 0
  
  if (pageNumber < 0)
    pageNumber = 0

  console.log(pageNumber);

  return {
    searchQuery: search,
    activePage: pageNumber
  }
}