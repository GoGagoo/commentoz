import { useOnClickOutside } from '@/shared/lib/hooks/useOnClickOutside'
import React, { FC, useRef, useState } from 'react'

import * as s from './ReplyCommentForm.module.scss'

interface Props {
	onSubmit: (content: string, parentId?: string) => void
	onClose: () => void
	parentId: string
}

export const ReplyCommentForm: FC<Props> = ({
	onSubmit,
	onClose,
	parentId,
}) => {
	const [replyText, setReplyText] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const commentSendContainerRef = useRef<HTMLDivElement>(null)

	useOnClickOutside(commentSendContainerRef, onClose)

	const handleSubmit = async () => {
		if (!replyText.trim()) return

		setIsSubmitting(true)
		try {
			await onSubmit(replyText, parentId)
			setReplyText('')
			onClose()
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div ref={commentSendContainerRef} className={s.editor}>
			<textarea
				className={s.textarea}
				value={replyText}
				placeholder='Enter your reply comment'
				onChange={(e) => setReplyText(e.target.value)}
			/>
			<div className={s.send_block}>
				<hr />
					<button
						type='button'
						disabled={!replyText}
						onClick={handleSubmit}
						className={s.send_btn}
					>
						Send
					</button>
			</div>
		</div>
	)
}
