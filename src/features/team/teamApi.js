import { apiSlice } from "../api/apiSlice";


export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation({
            query: (data) => ({
                url: '/teams',
                method: "POST",
                body: data
            })
        }),
        getTeams: builder.query({
            query: (email) => (`/teams?p=${email}`)
        }),
        getUser: builder.query({
            query: (email) => `/users?email=${email}`
        })
    })
})
export const { useCreateTeamMutation, useGetTeamsQuery, useGetUserQuery } = teamApi;