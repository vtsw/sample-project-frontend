import { useMutation } from '@apollo/react-hooks'

const genQueryOptions = (query, variables) => {
	return {
		query,
		variables,
	}
}

const useCreateAUser = (query, updateQuery, vars, authToken) => {
	return useMutation(
		query,
		authToken &&
			!vars.query.searchText && {
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
				onError: err => {
					alert(err)
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
		onError: err => alert(err),
	})
}

export { useCreateAUser, useDeleteAUser }
