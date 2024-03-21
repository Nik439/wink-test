import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchActions } from "../app/searchSlice";

const writingWaitTime = 300

export default function SearchBar () {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = useAppSelector(state => state.search.searchTerm)
  const dispatch = useAppDispatch()
  const timerRef = useRef<number|null>(null)

  useEffect(()=>{
    dispatch(searchActions.changeSearch(searchParams.get('search') || ""))
  }, [])

  // temporarly set isWriting property to true to prevent
  // triggering too many consecutive api calls 
  useEffect(()=>{
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
    dispatch(searchActions.setIsWriting(true))

    timerRef.current = setTimeout(()=>{
      dispatch(searchActions.setIsWriting(false))
    }, writingWaitTime)
  }, [searchTerm])

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target

    setSearchParams(value && {search: value})
    dispatch(searchActions.changeSearch(value))
  }
  
  return (
    <div>
      <input type="text" onChange={handleChange} value={searchTerm} placeholder="Cerca per titolo, autore, codice ISBN..."/>
    </div>
  )
}