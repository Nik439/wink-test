import { Fragment } from "react/jsx-runtime";
import { Book } from "../app/booksApiSlice";
import { Link } from "react-router-dom";

interface BookItemProps {
  bookData: Book
}

export default function BookItem ({bookData}: BookItemProps) {

  return (
    <li className="mb-7 xs:mb-10 max-w-200 w-full">
      <Link to={bookData.id}>
        <p className="line-clamp-2 xs:hidden font-bold text-xl mb-1.5 hover:underline">{bookData.volumeInfo.title}</p>
      </Link>
      
      <div className="flex">
        <Link to={bookData.id}>
          {bookData.volumeInfo.imageLinks?.thumbnail ?
            <img className="w-20 xs:w-26  shadow-lg rounded-md" src={bookData.volumeInfo.imageLinks.thumbnail}/>
            :
            <div className="h-28 xs:h-36 w-20 xs:w-26 bg-amber-100 border border-zinc-500 flex items-center">
              <p className="p-2 text-center text-sm text-zinc-600 leading-4">Immagine non disponibile</p>
            </div>
          }
        </Link>
        
        {/* width: 100% - thumbnailWidth - margin */}
        <div className="ml-3 break-words w-[calc(100%-5rem-0.75rem)] xs:w-[calc(100%-6.5rem-0.75rem)]">
          <Link to={bookData.id}>
            <p className="hidden xs:line-clamp-2 font-bold text-xl mb-1.5 hover:underline">{bookData.volumeInfo.title}</p>
          </Link>
          
          {bookData.volumeInfo.authors &&
            <p className="xs:text-sm">
              {bookData.volumeInfo.authors.map((author:string, index:number, authors: string[]) => (
              <Fragment key={bookData.id+author}>
                {/* if it's not the last author add a comma at the end */}
                <Link to={`/?search=inauthor:"${author}"`} className="font-semibold hover:underline">{author}</Link>{index < authors.length-1 && ', '}
              </Fragment>
              ))}
              {bookData.volumeInfo.publishedDate &&
              <>
                <span> · </span>
                <span>{new Date(bookData.volumeInfo.publishedDate).getFullYear()}</span>
              </>
              }
            </p>
          }
          <p className="hyphens-manual break-words line-clamp-2 text-sm">{bookData.volumeInfo.description}</p>
        </div>  
      </div>
      
    </li>
  )
}