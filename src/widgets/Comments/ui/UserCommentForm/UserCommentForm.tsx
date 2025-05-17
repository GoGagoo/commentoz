import React, { useState } from 'react'

import johnDoeImage from '@/shared/assets/images/john-doe.webp'
import { useCommentActions } from '../../../../feature/Comments/lib/hooks/useCommentActions'

import * as s from './UserCommentForm.module.scss'

export const UserCommentForm = () => {
	const [commentText, setCommentText] = useState('')

	const { handleAddComment } = useCommentActions()

	const handleClick = () => {
		if (!commentText.trim()) return
		handleAddComment(commentText)
		setCommentText('')
	}

	return (
		<div className={s.container}>
			<div className={s.user}>
				<img className={s.user_avatar} src={johnDoeImage} alt='john-doe' />
				<p className={s.username}>John Doe</p>
			</div>
			<textarea
				className={s.comment_textarea}
				placeholder='Enter your comment'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<div className={s.divide}></div>
			<div className={s.bottom_container}>
				<button
					type='submit'
					disabled={!commentText}
					onClick={handleClick}
					className={s.send_comment_btn}
				>
					Comment
				</button>
			</div>
		</div>
	)
}
