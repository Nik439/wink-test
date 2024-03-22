import SearchBar from "../components/SearchBar";
import { Book, useSearchBooksQuery } from "../app/booksApiSlice";
import { useAppSelector } from "../app/hooks";
import logo from '../assets/logo.svg'
import loadingDot from '../assets/loading-dot.svg'
import BookItem from "../components/BookIem";

export default function BookListPage () {
  const {searchTerm, isWriting} = useAppSelector(state => state.search)
  const { data, isError, isLoading, isSuccess, isFetching } = 
    useSearchBooksQuery(searchTerm, { skip: searchTerm==="" || isWriting })

  return (
    <div className="flex flex-col px-5 pt-14 pb-20 min-h-screen">
      <SearchBar/>      
        { isLoading || isFetching || isWriting ?
          <div className="m-auto flex">
            <img className="w-8 animate-bounce-0" src={loadingDot} />
            <img className="w-8 animate-bounce-1" src={loadingDot} />
            <img className="w-8 animate-bounce-2" src={loadingDot} />
            <img className="w-8 animate-bounce-3" src={loadingDot} />
          </div>
        : isError ?
          <div className="flex flex-col m-auto">
            <p className="text-2xl text-center text-red-900 font-semibold">C'è stato un errore, riprova più tardi</p>
          </div>
        : isSuccess && data.totalItems > 0 ? 
          <ul>
            {data.items.map((book: Book)=>(
              <BookItem bookData={book} key={book.id}/>
            ))}
          </ul>
        : isSuccess && data.totalItems === 0 ? 
          <div className="text-xl text-center max-w-150 w-full flex flex-col m-auto break-words">
            <p className="mb-3">Non abbiamo trovato risultati per:</p>
            <p className="font-semibold">{searchTerm}</p>
          </div>
        : 
          <div className="m-auto pb-40 flex flex-col items-center">
            <img className="w-40 opacity-90 pb-3" src={logo} />
            <p className="text-center text-3xl text-zinc-600 max-w-100">Scrivi nella barra di ricerca per trovare il libro che cerchi!</p>
          </div>
        }
    </div>
  )
}