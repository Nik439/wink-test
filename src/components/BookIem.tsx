import { Fragment } from "react/jsx-runtime";
import { Book } from "../app/booksApiSlice";

interface BookItemProps {
  bookData: Book
}

export default function BookItem ({bookData}: BookItemProps) {

  return (
    <li className="mb-7 xs:mb-10 max-w-200 w-full">
      <p className="line-clamp-2 xs:hidden font-semibold text-xl mb-1.5">{bookData.volumeInfo.title}</p>
      <div className="flex">
        {bookData.volumeInfo.imageLinks?.thumbnail ?
          <img className="w-20 xs:w-26" src={bookData.volumeInfo.imageLinks.thumbnail}/>
          :
          <div className="h-28 xs:h-36 w-20 xs:w-26 bg-amber-100 border border-zinc-500 flex items-center">
            <p className="p-2 text-center text-sm text-zinc-600 leading-4">Immagine non disponibile</p>
          </div>
        }
        {/* width: 100% - thumbnailWidth - margin */}
        <div className="ml-3 break-words w-[calc(100%-5rem-0.75rem)] xs:w-[calc(100%-6.5rem-0.75rem)]">
          <p className="hidden xs:line-clamp-2 font-semibold text-xl mb-1.5">{bookData.volumeInfo.title}</p>
          {bookData.volumeInfo.authors &&
            <p className="xs:text-sm">
              {bookData.volumeInfo.authors.map((author:string, index:number, authors: string[]) => (
              <Fragment key={bookData.id+author}>
                {/* if it's not the last author add a comma at the end */}
                <span>{author}</span>{index < authors.length-1 && ', '}
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