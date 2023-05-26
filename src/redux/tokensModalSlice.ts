import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import tokensApi from '../common/tokensApi'

export const fetchTokens = createAsyncThunk('networks/fetchAsyncNetworks', async (request: string) => {
    const response = await tokensApi.get(`${request}`)
    return response.data.tokens
})

export interface TokensType {
    name: string
    symbol: string
    key: string
    image: string
    images: string[]
    network: string
    price: number
}

interface selectedTokenConfig {
    token: TokensType
    id: number
}

interface AppState {
    apiTokens: TokensType[]
    tokensFilter: string
    choosenTokens: [TokensType, TokensType] | [TokensType, null] | [null, null]
}

const initialState: AppState = {
    apiTokens: [],
    tokensFilter: '',
    choosenTokens: [null, null],
}

export const tokensModalSlice = createSlice({
    name: 'tokensModal',
    initialState,
    reducers: {
        clearTokens: (state) => {
            state.apiTokens = []
        },
        filterTokens: (state, action: PayloadAction<string>) => {
            state.tokensFilter = action.payload
        },
        chooseToken: (state, action: PayloadAction<selectedTokenConfig>) => {
            state.choosenTokens[action.payload.id] = action.payload.token
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTokens.pending, () => {})
        builder.addCase(fetchTokens.rejected, () => {})
        builder.addCase(fetchTokens.fulfilled, (state, { payload }) => {
            const prevTokens = state.apiTokens
            const uniqueTokens = payload.filter(
                (token: TokensType) => !prevTokens.some((prevToken) => prevToken.key === token.key)
            )
            state.apiTokens = [...prevTokens, ...uniqueTokens]
        })
    },
})

export const { clearTokens, filterTokens, chooseToken } = tokensModalSlice.actions

export const selectTokens = (state: RootState) => state.tokensModal.apiTokens
export const selectTokensFilter = (state: RootState) => state.tokensModal.tokensFilter
export const selectChoosenTokens = (state: RootState) => state.tokensModal.choosenTokens

export default tokensModalSlice.reducer
