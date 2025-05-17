import { RootState } from '@/app/providers/StoreProvider/store'
import { Comment } from '@/entities/comments'
import { createSelector } from 'reselect'
import { commentsApi } from '../api/commentsApi'

const selectCommentsResult = commentsApi.endpoints.getComments.select()

export const selectRootCommentsWithReplies = createSelector(
	(state: RootState) => selectCommentsResult(state)?.data ?? [],
	(comments: Comment[]): Comment[] => {
		const commentsWithReplies = comments.map((comment) => ({
			...comment,
			replies: [] as Comment[],
		}))

		const commentMap = new Map<string, Comment>()
		commentsWithReplies.forEach((comment) => {
			commentMap.set(comment.id, comment)
		})

		const result: Comment[] = []

		commentsWithReplies.forEach((comment) => {
			if (comment.parentId) {
				const parent = commentMap.get(comment.parentId)
				if (parent) {
					parent.replies.push(comment)
				}
			} else {
				result.push(comment)
			}
		})

		return result
	},
)
