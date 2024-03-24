import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetBookbyIdQuery } from "../app/booksApiSlice"
import { Fragment } from "react/jsx-runtime"
import navPrev from '../assets/navigate_prev.svg'
import loadingDot from '../assets/loading-dot.svg'

export default function BookDetailPage () {
  const {bookId} = useParams()
  const navigate = useNavigate()
  const { data, isError, isLoading, isSuccess, isFetching } = 
    useGetBookbyIdQuery(bookId || "", {skip: !bookId})    

  function handleBack () {
    navigate(-1);
  }

  return (
    <div className="flex flex-col min-h-screen px-5 pt-7 pb-20 mx-auto max-w-[1000px]">
      <button className="w-10 h-10 ml-[-10px] mb-3" onClick={handleBack}>
        <img className="w-full" src={navPrev}/>
      </button>
      {isLoading || isFetching ?
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
      : isSuccess &&
        <>
          <div className="flex flex-col-reverse xs:grid grid-cols-book-detail gap-y-5 xs:gap-x-8">
            <div className="w-full">
              <h1 className="text-2xl md:text-4xl font-bold break-words">{data.volumeInfo.title}</h1>
              <h2 className="text-lg md:text-2xl font-semibold text-zinc-800">{data.volumeInfo.subtitle}</h2>
              <p className="text-zinc-600">
                <span>Di </span>
                {data.volumeInfo.authors.map((author:string, index:number, authors: string[]) => (
                  <Fragment key={data.id+author}>
                    {/* if it's not the last author add a comma at the end */}
                    <Link to={`/?search=inauthor:"${author}"`} className="text-zinc-950 hover:underline">{author}</Link>{index < authors.length-1 && ', '}
                  </Fragment>
                ))}
                {data.volumeInfo.publishedDate &&
                  <>
                    <span> · </span>
                    <span>{new Date(data.volumeInfo.publishedDate).getFullYear()}</span>
                  </>
                }
              </p>
              <p className="text-zinc-600">
                {data.volumeInfo.publisher}
              </p>
              <div className="flex justify-start mt-4">
                <a href={data.volumeInfo.infoLink} className="w-full xs:w-auto text-center px-5 py-3 bg-orange-400 hover:bg-orange-500 font-semibold rounded-lg">Compra</a>
              </div>
            </div>
            <div className="w-32 min-w-32 m-auto">
              <img className="w-full shadow-lg rounded-md" src={data.volumeInfo.imageLinks?.thumbnail}/>
            </div>
          </div>

          <span className="w-full h-px bg-zinc-400 my-5"></span>
          
          <div className="max-w-200">
            <div dangerouslySetInnerHTML={{__html: data.volumeInfo.description}}></div>
            
          </div>
        </>
      }
    </div>
    
  )
}