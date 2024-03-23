import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
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

export type MaxResults = 5 | 10 | 15 | 20

interface BooksApiArgs {
  searchTerm: string,
  startIndex: number,
  maxResults: MaxResults
}

const booksApiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: "https://www.googleapis.com/books/v1/volumes"}),
  reducerPath: 'booksApi',
  endpoints: (builder) => ({
    searchBooks: builder.query<BooksApiResponse, BooksApiArgs>({
      query: ({searchTerm, startIndex, maxResults}) => `?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`,
    })
  }),
})

export const {useSearchBooksQuery} = booksApiSlice

export default booksApiSlice