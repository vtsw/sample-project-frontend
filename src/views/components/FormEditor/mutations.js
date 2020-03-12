import { useMutation } from '@apollo/react-hooks'

const genQueryOptions = (query, variables) => {
	return {
		query,
		variables,
	}
}

const useCreateAUser = (query, updateQuery, vars, isAuthenticated) => {
	return useMutation(
		query,
		isAuthenticated && {
			update(cache, { data: { createUser } }) {
				const options = genQueryOptions(updateQuery, vars)
				const { userList } = cache.readQuery(options)
				cache.writeQuery({
					...options,
					data: {
						userList: { ...userList, items: [createUser, ...userList.items] },
					},
				})
			},
		}
	)
}

const useDeleteAUser = (query, updateQuery, vars) => {
	return useMutation(query, {
		update(cache, { data: { deleteUser } }) {
			const options = genQueryOptions(updateQuery, vars)
			const { userList } = cache.readQuery(options)
			const items = userList.items.filter(item => item.id !== deleteUser.id)
			cache.writeQuery({
				...options,
				data: {
					userList: { ...userList, items },
				},
			})
		},
	})
}

export { useCreateAUser, useDeleteAUser }
