import { apiSlice } from "../api/apiSlice";


export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation({
            query: ({ data, email }) => ({
                url: '/teams',
                method: "POST",
                body: data
            }),
            async onQueryStarted({ data, email }, { dispatch, queryFulfilled }) {
                const res = await queryFulfilled;
                console.log(res.data);
                dispatch(apiSlice.util.updateQueryData('getTeams', email, (draft) => {
                    return [...draft, res.data]
                }))
            }
        }),
        getTeams: builder.query({
            query: (email) => (`/teams?p=${email}`)
        }),
        getTeam: builder.query({
            query: (id) => (`/teams?id=${id}`)
        }),
        getUser: builder.query({
            query: (email) => `/users?email=${email}`
        }),
        addTeamMember: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teams/${id}`,
                method: "PATCH",
                body: data
            })
        }),
        deleteTeam: builder.mutation({
            query: ({ id, email }) => ({
                url: `/teams/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted({ id, email }, { dispatch, queryFulfilled }) {
                await queryFulfilled;

                dispatch(apiSlice.util.updateQueryData('getTeams', email, (draft) => {
                    const restTeam = draft.filter(t=> t.id != id)
                    return restTeam
                }))
            }
        })
    })
})
export const { useCreateTeamMutation, useGetTeamsQuery, useGetUserQuery, useGetTeamQuery, useAddTeamMemberMutation, useDeleteTeamMutation } = teamApi;