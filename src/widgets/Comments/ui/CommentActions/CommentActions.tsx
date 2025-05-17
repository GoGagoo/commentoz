import { formatRelativeTime } from '@/shared/lib/utils/formatRelativeTime'
import React, { FC } from 'react'
import * as s from './CommentActions.module.scss'

interface CommentActionsProps {
	commentItemWithReply?: () => void
	onDelete?: (id: string) => void
	onLike?: () => void
	likes?: number
	isLiked?: boolean
	createdAt?: string
	commentId: string
}

export const CommentActions: FC<CommentActionsProps> = ({
	commentItemWithReply,
	onDelete,
	onLike,
	likes = 0,
	isLiked = false,
	createdAt,
	commentId,
}) => (
	<>
		<div className={s.formatting_btns}>
			<button
				onClick={onLike}
				className={isLiked ? s.comment_like_btn_active : s.comment_like_btn}
			>
				{isLiked ? 'Unlike' : 'Like'} {likes}
			</button>
			{commentItemWithReply && (
				<button onClick={commentItemWithReply} className={s.comment_reply_btn}>
					Reply
				</button>
			)}
			{onDelete && (
				<button
					onClick={() => onDelete(commentId)}
					className={s.comment_delete_btn}
				>
					Delete
				</button>
			)}
			<span className={s.comment_created_at}>
				{createdAt && formatRelativeTime(createdAt)}
			</span>
		</div>
	</>
)
