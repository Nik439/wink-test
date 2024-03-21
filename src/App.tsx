import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/Home"
import BookDetailPage from "./pages/BookDetail"

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage/>
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
