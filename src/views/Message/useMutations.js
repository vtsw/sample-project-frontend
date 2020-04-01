import { useMutation } from '@apollo/react-hooks'

const genQueryOptions = (query, variables) => {
	return {
		query,
		variables,
	}
}

const useCreateMessage = (query, updateQuery, vars) => {
	return useMutation(query, {
		update(cache, { data: { createMessage } }) {
			const options = genQueryOptions(updateQuery, vars)
			const { messageList } = cache.readQuery(options)

			cache.writeQuery({
				...options,
				data: {
					messageList: {
						...messageList,
						items: [createMessage, ...messageList.items],
					},
				},
			})
		},
		onError: err => alert(err),
	})
}

const useDeleteMessage = (query, updateQuery, vars) => {
	return useMutation(query, {
		update(cache, { data: { deleteMessage } }) {
			const options = genQueryOptions(updateQuery, vars)
			const { messageList } = cache.readQuery(options)
			const index = messageList.items.findIndex(
				item => item.id === deleteMessage.id
			)

			if (index > -1) {
				messageList.items.splice(index, 1)
				cache.writeQuery({
					...options,
					data: {
						messageList,
					},
				})
			}
		},
		onError: err => alert(err),
	})
}

export { useCreateMessage, useDeleteMessage }
