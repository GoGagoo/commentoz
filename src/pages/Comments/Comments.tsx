import React, { useEffect, useState } from 'react'

import { useGetCommentsQuery } from '@/entities/Comment/models/api/commentsApi'
import { SkeletonComment } from '@/shared'
import {
	EmptyCommentsListStub,
	UserCommentForm,
	VirtualizedCommentList,
} from '@/widgets'

import Cookies from 'js-cookie'
import * as s from './Comments.module.scss'

export const Comments = () => {
	const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

	const { isLoading, data: comments } = useGetCommentsQuery()

	const commentsCount = comments?.length || 0

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			Cookies.set('token', token)
		}
	}, [])

	return (
		<main className={s.container}>
			<div className={s.container_inner}>
				<h1 className={s.container_inner_title}>Comments</h1>
				<UserCommentForm />

				{isLoading ? (
					[...Array(3)].map((_, idx) => <SkeletonComment key={idx} />)
				) : !commentsCount ? (
					<EmptyCommentsListStub />
				) : (
					<VirtualizedCommentList
						activeReplyId={activeReplyId}
						setActiveReplyId={setActiveReplyId}
					/>
				)}
			</div>
		</main>
	)
}
