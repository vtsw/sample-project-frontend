import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SET_MESSAGE_CREATE_TEXT } from '@views/Message/query'
import { GET_MESSAGE_CREATE_TEXT } from '../../query'

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
	const [value, setValue] = useState(messageCreateValueOfMessage || '')

	const handleOnInputChange = value => {
		setValue(value)
		setMessageCreateValueOfMain({ variables: { createValue: value } })
	}

	const classes = useStyles({ width })

	return (
		<Box className={classes.root}>
			<TextField
				value={value}
				variant='outlined'
				placeholder='text...'
				className={classes.input}
				onChange={e => handleOnInputChange(e.target.value)}
				onKeyDown={e => {
					if (e.keyCode === 13) {
						onSubmit(value)
					}
				}}
			/>
			<Button
				color='primary'
				variant='contained'
				size='large'
				className={classes.button}
				onClick={() => {
					onSubmit(value)
					handleOnInputChange('')
				}}
			>
				Save
			</Button>
		</Box>
	)
}

export default CreateInputBox
