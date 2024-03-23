import { createSlice } from "@reduxjs/toolkit";
import { MaxResults } from "./booksApiSlice";

export interface PaginationSliceState {
  currentPage: number
  maxResults: MaxResults
}

const initialState: PaginationSliceState = {
  currentPage: 0,
  maxResults: 10
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    setPage(state, {payload}: {payload: number}){
      state.currentPage = payload
    },
    setMaxResults(state, {payload}: {payload: MaxResults}){
      state.maxResults = payload
    }
  }
})

export const paginationActions = paginationSlice.actions

export default paginationSlice