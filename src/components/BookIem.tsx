import { Book } from "../app/booksApiSlice";

interface BookItemProps {
  bookData: Book
}

export default function BookItem ({bookData}: BookItemProps) {

  return (
    <li key={bookData.id}>
      <p>- {bookData.volumeInfo.title}</p>
    </li>
  )
}