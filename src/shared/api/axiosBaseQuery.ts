import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, {
	AxiosError,
	AxiosHeaders,
	AxiosRequestConfig,
	AxiosRequestHeaders,
} from 'axios'
import Cookies from 'js-cookie'

type AxiosBaseQueryArgs = {
	baseUrl?: string
	prepareHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders
}

export const axiosBaseQuery = ({
	baseUrl = '',
	prepareHeaders,
}: AxiosBaseQueryArgs = {}): BaseQueryFn<
	{
		url: string
		method: AxiosRequestConfig['method']
		data?: AxiosRequestConfig['data']
		params?: AxiosRequestConfig['params']
		headers?: AxiosHeaders
	},
	unknown,
	unknown
> => {
	const api = axios.create({ baseURL: baseUrl })

	api.interceptors.request.use((config) => {
		const token = Cookies.get('token')

		if (token && config.headers && typeof config.headers.set === 'function') {
			config.headers.set('Authorization', `Bearer ${token}`)
		}

		return config
	})

	return async ({ url, method, data, params, headers }) => {
		try {
			const finalHeaders = prepareHeaders
				? prepareHeaders(headers || new AxiosHeaders())
				: headers

			const result = await api({
				url,
				method,
				data,
				params,
				headers: finalHeaders,
			})
			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
}
