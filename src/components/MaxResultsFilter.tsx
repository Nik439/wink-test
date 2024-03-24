import { useLoaderData, useSearchParams } from "react-router-dom"
import { MaxResults } from "../app/booksApiSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { paginationActions } from "../app/paginationSlice"
import { SearchLoaderResponse } from "../utils/loaders"
import { useEffect } from "react"

export default function MaxResultsFilter () {
  const {maxElements} = useLoaderData() as SearchLoaderResponse
  const [_searchParams, setSearchParams] = useSearchParams()
  const {maxResults, currentPage} = useAppSelector(state=>state.pagination)
  const searchTerm = useAppSelector(state=>state.search.searchTerm)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(paginationActions.setMaxResults(maxElements))
  }, [maxElements])

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    let {value} = e.target
    let numValue = parseInt(value)

    if ( numValue != 5 && numValue != 10 && numValue != 15 && numValue != 20 )
      numValue = 10

    dispatch(paginationActions.setMaxResults(numValue as MaxResults))

    let searchObj = searchTerm && {search: searchTerm}
    let maxObj = numValue!=10 && {max: numValue.toString()}
    let pageObj = currentPage>0 && {p: currentPage.toString()}
    setSearchParams({...searchObj, ...pageObj, ...maxObj})
  }

  return (
    <div className="flex justify-end mb-10 mx-auto max-w-200 w-full xs:px-5">
      <div className=" text-zinc-500 hover:text-zinc-950">
        <label htmlFor="max-select" className="mr-1 select-none">
          Numero risultati:
        </label>
        <select ref={selectRef} value={maxResults} className="bg-transparent cursor-pointer" name="max-select" id="max-select" onChange={handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>  
      </div>
      
    </div>
  )
}