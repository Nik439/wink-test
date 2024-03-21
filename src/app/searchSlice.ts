import { createSlice } from "@reduxjs/toolkit";

export interface SearchSliceState {
  searchTerm: string
  isWriting: boolean
}

const initialState: SearchSliceState = {
  searchTerm: "",
  isWriting: false
}

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    changeSearch(state, {payload}: {payload: string}){
      state.searchTerm = payload
    },
    setIsWriting(state, {payload}: {payload: boolean}){
      state.isWriting = payload
    }
  }
})

export const searchActions = searchSlice.actions

export default searchSlice