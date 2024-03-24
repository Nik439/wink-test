import { useEffect, useRef } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchActions } from "../app/searchSlice";
import { SearchLoaderResponse } from "../utils/loaders";
import { paginationActions } from "../app/paginationSlice";

const writingWaitTime = 300

export default function SearchBar () {
  const maxResults = useAppSelector(state => state.pagination.maxResults)
  const {searchQuery} = useLoaderData() as SearchLoaderResponse
  const [_searchParams, setSearchParams] = useSearchParams()
  const searchTerm = useAppSelector(state => state.search.searchTerm)
  const dispatch = useAppDispatch()
  const timerRef = useRef<number|null>(null)

  useEffect(()=>{
    dispatch(searchActions.changeSearch(searchQuery))
  }, [searchQuery])

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target
    dispatch(paginationActions.setPage(0))
    dispatch(searchActions.changeSearch(value))

    // temporarly set isWriting property to true to prevent
    // triggering too many consecutive api calls 
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
    dispatch(searchActions.setIsWriting(true))

    timerRef.current = setTimeout(()=>{
      dispatch(searchActions.setIsWriting(false))

      let searchObj = value && {search: value}
      let maxObj = maxResults!=10 && {max: maxResults.toString()}
      setSearchParams({...searchObj, ...maxObj})
    }, writingWaitTime)
  }
  
  return (
    <div className="mb-6 px-0 xs:px-5 flex justify-center">
      <input
        type="text"
        className="outline-slate-400 py-2 px-4 max-w-200 text-lg border border-zinc-900 rounded-full w-full"
        onChange={handleChange}
        value={searchTerm}
        placeholder="Cerca per titolo, autore, codice ISBN..."
      />
    </div>
  )
}