import { useVirtualizer } from '@tanstack/react-virtual'
import React, { FC, useRef } from 'react'

import { selectRootCommentsWithReplies } from '@/entities/Comment/models/selectors/commentsSelectors'
import { CommentItem } from '@/entities/Comment/ui/CommentItem/CommentItem'
import { SkeletonComment } from '@/shared/'
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector'
import { renderVirtualRow } from '@/shared/lib/utils/renderVirtualContainer'

import * as s from './VirtualizedCommentList.module.scss'

interface Props {
	activeReplyId: string | null
	setActiveReplyId: React.Dispatch<React.SetStateAction<string | null>>
}

export const VirtualizedCommentList: FC<Props> = ({
	activeReplyId,
	setActiveReplyId,
}) => {
	const virtualizerContainerRef = useRef<HTMLDivElement>(null)

	const commentTree = useTypedSelector(selectRootCommentsWithReplies)

	const commentsVirtualizer = useVirtualizer({
		count: commentTree.length,
		getScrollElement: () => virtualizerContainerRef.current,
		estimateSize: () => 120,
		overscan: 0,
	})

	return (
		<div ref={virtualizerContainerRef} className={s.visualizer_container}>
			<div
				style={{
					height: `${commentsVirtualizer.getTotalSize()}px`,
				}}
				className={s.virtual_list_container}
			>
				{commentsVirtualizer.getVirtualItems().map((virtualRow) => {
					const idx = virtualRow.index

					if (idx >= commentTree.length) {
						return renderVirtualRow({
							key: `skeleton-${virtualRow.key}`,
							virtualRow,
							measureElement: commentsVirtualizer.measureElement,
							children: <SkeletonComment />,
							className: s.virtual_item,
						})
					}

					const rootComment = commentTree[idx]
					return renderVirtualRow({
						key: rootComment.id,
						virtualRow,
						measureElement: commentsVirtualizer.measureElement,
						className: s.virtual_item,
						children: (
							<CommentItem
								comment={rootComment}
								activeReplyId={activeReplyId}
								commentItemWithReply={() =>
									setActiveReplyId((prev) =>
										prev === rootComment.id ? null : rootComment.id,
									)
								}
							/>
						),
					})
				})}
			</div>
		</div>
	)
}
