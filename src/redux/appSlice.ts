import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import tokensApi from "../common/tokensApi";

export const fetchAsyncTokens = createAsyncThunk(
  "networks/fetchAsyncNetworks",
  async (request: string) => {
    const response = await tokensApi.get(`${request}`);
    return response.data.tokens;
  }
);

export interface TokensType {
  name: string;
  symbol: string;
  key: string;
  image: string;
  images: string[];
  network: string;
}

interface AppState {
  popUp: boolean;
  tokens: TokensType[];
  selectedChain: string;
  modal: boolean;
  page: number;
}

const initialState: AppState = {
  popUp: false,
  tokens: [],
  selectedChain: "",
  modal: false,
  page: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showPopUp: (state, action: PayloadAction<boolean>) => {
      state.popUp = action.payload;
    },
    changeChain: (state, action: PayloadAction<string>) => {
      state.selectedChain = action.payload;
    },
    showModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTokens.pending, () => {});
    builder.addCase(fetchAsyncTokens.rejected, () => {});
    builder.addCase(fetchAsyncTokens.fulfilled, (state, { payload }) => {
      state.tokens = payload;
    });
  },
});

export const { showPopUp, changeChain, showModal, changePage } =
  appSlice.actions;

export const selectPopUp = (state: RootState) => state.app.popUp;
export const selectTokens = (state: RootState) => state.app.tokens;
export const selectModal = (state: RootState) => state.app.modal;
export const selectPage = (state: RootState) => state.app.page;

export default appSlice.reducer;
