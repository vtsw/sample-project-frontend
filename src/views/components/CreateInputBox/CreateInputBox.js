import React from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { ActionInputBox } from '@views_components'

import {
	GET_MESSAGE_CREATE_TEXT,
	SET_MESSAGE_CREATE_TEXT,
} from '@views/Message/gql/query'

const CreateInputBox = props => {
	const { width, onSubmit } = props
	const {
		data: { messageCreateValueOfMessage },
	} = useQuery(GET_MESSAGE_CREATE_TEXT)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)

	const handleOnInputChange = value => {
		setMessageCreateValueOfMain({ variables: { createValue: value } })
	}

	return (
		<ActionInputBox
			defaultValue={messageCreateValueOfMessage}
			onSubmit={onSubmit}
			onChange={handleOnInputChange}
			width={width}
		/>
	)
}

export default CreateInputBox
