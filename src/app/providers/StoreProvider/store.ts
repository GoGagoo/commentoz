import { baseApi } from '@/entities/Comment/models/api/rtkQuery'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export default store
