import { useEffect } from "react"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { SearchLoaderResponse } from "../utils/loaders"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { paginationActions } from "../app/paginationSlice"
import navPrev from '../assets/navigate_prev.svg'
import navNext from '../assets/navigate_next.svg'

interface PaginatorProps {
  totalItems: number
}

export default function Paginator ({totalItems}: PaginatorProps) {
  const {maxResults, currentPage} = useAppSelector(state => state.pagination)
  const dispatch = useAppDispatch()
  const {searchQuery, activePage} = useLoaderData() as SearchLoaderResponse
  const [_searchParams, setSearchParams] = useSearchParams()
  const totalPages = Math.ceil(totalItems/maxResults)
  const pages= generatePages()

  useEffect(()=>{
    dispatch(paginationActions.setPage(activePage))
  }, [activePage])

  function generatePages () {
    const pagesArr = []
    let i=currentPage-5
    let lastPage = currentPage+5

    if (i<0)
      i=0

    if (lastPage < 10)
      lastPage = 10

    if (lastPage > totalPages)
      lastPage = totalPages

    while (i<lastPage) {
      pagesArr.push({
        value: i+1,
        current: currentPage===i
      })
      i++
    }

    return pagesArr
  }

  function handlePageChange (newPage: number) {
    console.log(newPage);
    
    setSearchParams({search: searchQuery, p: newPage.toString()})
  }

  function handlePrevPage () {
    if (currentPage > 0) 
      handlePageChange(currentPage)
  }

  function handleNextPage () {
    if (currentPage+1 < totalPages) 
      handlePageChange(currentPage+2)
  }

  return (
    <div className="flex justify-center mt-6">
      {currentPage > 0 &&
        <button className="w-7 h-7 m-1"  onClick={handlePrevPage}>
          <img className="w-7" src={navPrev}/>
        </button>
      }
      {pages.map(page=>(
        <button
          key={`page-button-${page.value}`}
          onClick={()=>handlePageChange(page.value)}
          className={`${page.current ? 'bg-amber-700' : 'bg-zinc-900 hidden xs:flex'} text-amber-50 w-7 h-7 m-1 rounded-full flex justify-center select-none cursor-pointer`}
        >
          <span>
            {page.value}
          </span>
        </button>
      ))}
      {currentPage+1 < totalPages &&
        <button className="w-7 h-7 m-1" onClick={handleNextPage}>
          <img className="w-7" src={navNext}/>
        </button>
      }
      
    </div>
  )
}