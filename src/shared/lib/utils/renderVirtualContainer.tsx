import { VirtualItem } from '@tanstack/react-virtual'
import React, { JSX } from 'react'

interface RenderVirtualRowProps {
	virtualRow: VirtualItem
	measureElement: (el: HTMLElement | null) => void
	children: React.ReactNode
	className?: string
	key?: string | number
}

export const renderVirtualRow = ({
	virtualRow,
	measureElement,
	children,
	className = '',
	key,
}: RenderVirtualRowProps): JSX.Element => (
	<div
		key={key}
		data-index={virtualRow.index}
		ref={measureElement}
		className={className}
		style={{
			transform: `translateY(${virtualRow.start}px)`,
		}}
	>
		{children}
	</div>
)
