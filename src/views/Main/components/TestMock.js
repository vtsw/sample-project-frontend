import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { PAGE_LIMIT } from '@src/configs.local'
import { GET_USER_SEARCH_TEXT } from '@views/User/gql/query'

const TestMock = () => {
	const { data } = useQuery(MESSAGE_LIST, {
		variables: { userId: 'test', limit: PAGE_LIMIT },
		// fetchPolicy: 'network-only','messageList'
		// notifyOnNetworkStatusChange: true,
	})
	console.log('data message', data)

	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)

	console.log('userSearchValue', userSearchValue)

	return <div>hihi</div>
}

export default TestMock
