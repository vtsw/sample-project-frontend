import { useMutation } from '@apollo/react-hooks'

const genQueryOptions = (query, variables) => {
	return {
		query,
		variables,
	}
}

const useCreateAUser = (
	createUserMutation,
	fetchUserListQuery,
	vars,
	authToken
) => {
	return useMutation(
		createUserMutation,
		authToken &&
			!vars.query.searchText && {
				update(cache, { data: { createUser } }) {
					const options = genQueryOptions(fetchUserListQuery, vars)
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

const useDeleteAUser = (deleteUserMutation, fetchUserListQuery, vars) => {
	return useMutation(deleteUserMutation, {
		update(cache, { data: { deleteUser } }) {
			const options = genQueryOptions(fetchUserListQuery, vars)
			const { userList } = cache.readQuery(options)
			const items = userList.items.filter(item => item.id !== deleteUser.id)
			cache.writeQuery({
				...options,
				data: {
					userList: { ...userList, items },
				},
			})
		},
		onError: err => {
			alert(err)
		},
	})
}

export { useCreateAUser, useDeleteAUser }
