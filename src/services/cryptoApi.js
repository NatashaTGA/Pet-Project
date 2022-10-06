import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'fdea11df27msh0346d8e8cbe3e90p11b431jsn03703f13d087',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = `https://api.coingecko.com/api/v3/`;

const createRequest = (url) =>  ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi;