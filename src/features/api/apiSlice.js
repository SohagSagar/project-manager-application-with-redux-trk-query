import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_BASE_URL,
        prepareHeaders: async (headers,{getState})=>{
            const token = getState()?.auth?.token;
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({})
    
})