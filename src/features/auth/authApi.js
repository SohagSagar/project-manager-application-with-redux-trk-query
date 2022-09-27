import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                try {
                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: data?.accessToken,
                        user: data?.user
                    }))

                    dispatch(userLoggedIn(data))



                } catch (error) {
                    //do nothing
                }

            }

        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                try {
                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: data?.accessToken,
                        user: data?.user
                    }))

                    dispatch(userLoggedIn(data))



                } catch (error) {
                    //do nothing
                }

            }

        }),
        
    })
});

export const { useRegisterMutation ,useLoginMutation} = authApi;