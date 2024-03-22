import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import BookListPage from "./pages/BookList"
import BookDetailPage from "./pages/BookDetail"

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <BookListPage/>
      },
      {
        path: ':bookId',
        element: <BookDetailPage/>
      }
    ]
  }
])

export default function App () {
  return (
    <RouterProvider router={router} />
  )
}
