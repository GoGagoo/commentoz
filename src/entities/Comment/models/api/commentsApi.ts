import { Comment } from '@/entities/comments'
import { baseApi } from './rtkQuery'

export const commentsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getComments: builder.query<Comment[], void>({
			query: () => ({
				url: 'comments',
				method: 'GET',
			}),
			providesTags: ['Comments'],
		}),
		createComment: builder.mutation<Comment, Partial<Comment>>({
			query: (body) => ({
				url: 'comments',
				method: 'POST',
				data: {
					...body,
					author: body.author || {
						name: 'Anon',
						avatar: 'john-doe.webp',
					},
				},
			}),
			invalidatesTags: ['Comments'],
		}),
		deleteComment: builder.mutation<void, string>({
			query: (id) => ({
				url: `comments/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Comments'],
		}),
		updateComment: builder.mutation<Comment, Partial<Comment>>({
			query: ({ id, ...patch }) => ({
				url: `comments/${id}`,
				method: 'PATCH',
				data: patch,
			}),
			invalidatesTags: ['Comments'],
		}),
	}),
})

export const {
	useGetCommentsQuery,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
} = commentsApi
