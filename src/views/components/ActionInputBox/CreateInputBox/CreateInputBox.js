import React, { useState } from 'react'
import clsx from 'clsx'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SET_MESSAGE_CREATE_TEXT } from '@views/Message/query'
import { GET_MESSAGE_CREATE_TEXT } from '../../../Message/query'
import { ActionInputBox } from '../../index'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
	},
	input: {
		width: ({ width }) => width,
		marginRight: theme.spacing(1),
	},
	button: {
		color: theme.palette.common.white,
		padding: 0,
		textTransform: 'capitalize',
		fontSize: '0.875rem',
	},
	icon: {
		fontSize: '2.5rem',
	},
}))

const CreateInputBox = props => {
	const { width, onSubmit } = props
	const {
		data: { messageCreateValueOfMessage },
	} = useQuery(GET_MESSAGE_CREATE_TEXT)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)

	const handleOnInputChange = value => {
		setMessageCreateValueOfMain({ variables: { createValue: value } })
	}

	const classes = useStyles({ width })

	return (
		<Box className={classes.root}>
			<ActionInputBox
				defaultValue={messageCreateValueOfMessage}
				onSubmit={onSubmit}
				onChange={handleOnInputChange}
				width={width}
			/>
		</Box>
	)
}

export default CreateInputBox
