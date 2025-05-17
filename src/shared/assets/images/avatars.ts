import johnDoe from './john-doe.webp'

const avatars = {
	'john-doe.webp': johnDoe,
} as const

export type AvatarKey = keyof typeof avatars
export default avatars
