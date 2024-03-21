import { useParams } from "react-router-dom"

export default function BookDetailPage () {
  const {bookId} = useParams()

  return (
    <div>
      Book Detail: {bookId}
    </div>
  )
}