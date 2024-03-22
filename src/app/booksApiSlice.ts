import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Book {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: any
  saleInfo: any
  accessInfo: any
  searchInfo: any
}

interface BooksApiResponse {
  kind: string
  totalItems: number
  items: Book[]
}

const booksApiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: "https://www.googleapis.com/books/v1/volumes"}),
  reducerPath: 'booksApi',
  endpoints: (builder) => ({
    searchBooks: builder.query<BooksApiResponse, string>({
      query: (searchTerm) => `?q=${searchTerm}`,
    }),
  }),
})

export const {useSearchBooksQuery} = booksApiSlice

export default booksApiSlice