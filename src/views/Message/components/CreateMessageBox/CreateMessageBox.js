import React from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { ActionInputBox } from '@views_components'

import {
	GET_MESSAGE_CREATE_TEXT,
	SET_MESSAGE_CREATE_TEXT,
} from '@views/Message/gql/query'

const CreateMessageBox = props => {
	const { width, onSubmit, placeholder } = props
	const {
		data: { messageCreateValueOfMessage },
	} = useQuery(GET_MESSAGE_CREATE_TEXT)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)

	const handleOnInputChange = value => {
		setMessageCreateValueOfMain({ variables: { createValue: value } })
	}
	return (
		<ActionInputBox
			width={width}
			defaultValue={messageCreateValueOfMessage}
			placeholder={placeholder}
			onChange={handleOnInputChange}
			onSubmit={onSubmit}
		/>
	)
}

export default CreateMessageBox
