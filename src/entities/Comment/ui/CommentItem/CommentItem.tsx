import React, { FC, useRef } from 'react'

import { Comment } from '@/entities/comments'
import { useCommentActions } from '@/feature/Comments/lib/hooks/useCommentActions'
import { ReplyCommentForm } from '@/feature/Comments/ui/ReplyCommentForm/ReplyCommentForm'
import { SkeletonComment } from '@/shared'
import avatars, { AvatarKey } from '@/shared/assets/images/avatars'
import { CommentActions } from '@/widgets'

import * as s from './CommentItem.module.scss'

interface Props {
	isLoading?: boolean
	comment: Comment
	activeReplyId?: string | null
	onSubmitReply?: (parentId: string, content: string) => void
	onDelete?: (id: string) => void
	commentItemWithReply?: () => void
}

export const CommentItem: FC<Props> = ({
	comment,
	isLoading,
	activeReplyId,
	commentItemWithReply,
}) => {
	const commentContainerRef = useRef<HTMLDivElement | null>(null)
	const isPublicImage = comment?.author?.avatar?.startsWith('/images/')

	const { handleDeleteComment, handleAddComment, handleLikeCommentToggle } =
		useCommentActions()

	const { id, author, likes, replies, isLiked, createdAt, content } = comment

	const avatarKey = comment?.author?.avatar as AvatarKey
	const avatarPath = isPublicImage
		? comment.author.avatar
		: (avatars[avatarKey] ?? avatars['john-doe.webp'])

	if (isLoading) return <SkeletonComment />

	return (
		<div ref={commentContainerRef} className={s.commentContainer}>
			<div className={s.commentUser}>
				<img className={s.commentUserAvatar} src={avatarPath} alt='john-doe' />
				<p className={s.commentUserUsername}>
					{comment?.author?.name || 'Unknown User'}
				</p>
			</div>
			<span className={s.commentText}>{content}</span>
			<CommentActions
				commentId={id}
				likes={likes || 0}
				isLiked={isLiked || false}
				createdAt={createdAt || new Date().toISOString()}
				onLike={() => handleLikeCommentToggle(comment)}
				commentItemWithReply={() => commentItemWithReply?.()}
				onDelete={() => handleDeleteComment(id)}
			/>

			{activeReplyId === id && handleAddComment && (
				<ReplyCommentForm
					onSubmit={(content) => {
						if (!id) return
						handleAddComment(content, id)
						commentItemWithReply?.()
					}}
					parentId={id}
					onClose={() => commentItemWithReply?.()}
				/>
			)}

			{replies && replies.length > 0 && (
				<div className={s.replies}>
					{replies.map((reply) => (
						<CommentItem
							key={reply.id}
							comment={reply}
							onDelete={handleDeleteComment}
							commentItemWithReply={commentItemWithReply}
							onSubmitReply={handleAddComment}
							activeReplyId={activeReplyId}
						/>
					))}
				</div>
			)}
		</div>
	)
}
