export interface Comment {
	id: string
	author: {
		name: string
		avatar: string
	}
	content: string
	createdAt: string
	likes: number
	isLiked: boolean
	parentId?: string
	replies: Comment[]
}
