import { API_ROOT } from '@/entities/model/constants'
import { createApi } from '@reduxjs/toolkit/query/react'
import { AxiosHeaders } from 'axios'
import { axiosBaseQuery } from '../../../../shared/api/axiosBaseQuery'

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: axiosBaseQuery({
		baseUrl: API_ROOT,
		prepareHeaders: (headers = new AxiosHeaders()) => {
			const token = localStorage.getItem('token')
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	tagTypes: ['Comments'],
	endpoints: () => ({}),
})
