import { useMutation } from '@apollo/react-hooks'

const genQueryOptions = (query, variables) => {
	return {
		query,
		variables,
	}
}

const useCreateAUser = (query, updateQuery, variables) => {
	useMutation(query, {
		update(cache, { data: { createUser } }) {
			const options = genQueryOptions(updateQuery, variables)
			const { userList } = cache.readQuery(options)
			cache.writeQuery({
				...options,
				data: {
					userList: { ...userList, items: [createUser, ...userList.items] },
				},
			})
		},
	})
}

export { useCreateAUser }
