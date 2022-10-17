import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'fdea11df27msh0346d8e8cbe3e90p11b431jsn03703f13d087',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = `https://api.coingecko.com/api/v3`;

const createRequest = (url) =>  ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?per_page=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (id) => createRequest(`/coins/${id}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ id, days = 365, currentCurrency}) => createRequest(`/coins/${id}/market_chart?vs_currency=${currentCurrency}&days=${days}`),
        })
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
} = cryptoApi;