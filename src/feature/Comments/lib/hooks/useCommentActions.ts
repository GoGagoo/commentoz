import {
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useGetCommentsQuery,
	useUpdateCommentMutation,
} from '@/entities/Comment/models/api/commentsApi'
import { Comment } from '@/entities/comments'

export const useCommentActions = () => {
	const { data: comments = [], refetch } = useGetCommentsQuery()

	const [createComment] = useCreateCommentMutation()
	const [deleteComment] = useDeleteCommentMutation()
	const [updateComment] = useUpdateCommentMutation()

	const rootComments = comments.filter((c) => !c.parentId)

	const handleAddComment = async (
		content: string,
		parentId?: string,
		onSuccess?: () => void,
	) => {
		try {
			await createComment({
				content,
				parentId,
				author: {
					name: 'John Doe',
					avatar: '@/shared/assets/images/john-doe.webp',
				},
				createdAt: new Date().toISOString(),
				likes: 0,
				isLiked: false,
			}).unwrap()
			onSuccess?.()
			await refetch()
		} catch (err) {
			console.error('Error adding comment:', err)
		}
	}

	const handleDeleteComment = async (id: string) => {
		try {
			await deleteComment(id).unwrap()
		} catch (err) {
			console.error('Error deleting comment:', err)
		}
	}

	const handleLikeCommentToggle = async (comment: Comment) => {
		try {
			await updateComment({
				id: comment.id,
				likes: comment.isLiked ? comment?.likes - 1 : comment?.likes + 1,
				isLiked: !comment.isLiked,
			}).unwrap()
		} catch (error) {
			console.error('Error updating comment:', error)
		}
	}

	return {
		rootComments,
		handleAddComment,
		handleDeleteComment,
		handleLikeCommentToggle,
	}
}
