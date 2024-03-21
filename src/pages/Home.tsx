import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useSearchBooksQuery } from "../app/booksApiSlice";
import { useAppSelector } from "../app/hooks";

export default function HomePage () {
  const {searchTerm, isWriting} = useAppSelector(state => state.search)
  const { data, isError, isLoading, isSuccess, isFetching } = 
    useSearchBooksQuery(searchTerm, { skip: searchTerm==="" || isWriting })

  return (
    <div>
      <SearchBar/>
      <Link to={'/test-id'}>link</Link>
      
        { isLoading ?
          <p>Loading...</p>
        : isError ?
          <p>C'è stato un errore, riprova più tardi</p>
        : isSuccess ?
          <ul>
            {data.items.map(book=>(
              <li key={book.id}>
                <p>- {book.volumeInfo.title}</p>
              </li>
            ))}
          </ul>
        : 
          <p>Scrivi nella barra di ricerca per trovare il libro che cerchi!</p>
        }
    </div>
  )
}