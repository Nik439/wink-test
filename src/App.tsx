import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BookListPage from "./pages/BookList"
import BookDetailPage from "./pages/BookDetail"
import { searchLoader } from "./utils/loaders"

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <BookListPage />,
        loader: searchLoader,
      },
      {
        path: ":bookId",
        element: <BookDetailPage />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
