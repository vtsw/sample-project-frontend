import React, { useState } from 'react'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import { useMutation } from '@apollo/react-hooks'
import { SET_MESSAGE_CREATE_TEXT } from '@views/Message/query'

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

const InputActionBox = props => {
	const {
		type,
		placeholder,
		defaultValue,
		width,
		saveOnChange,
		onSubmit,
	} = props
	const [value, setValue] = useState(defaultValue)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)
	const debounce = (func, wait = 100) => {
		let timeout
		return function(...args) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.apply(this, args)
			}, wait)
		}
	}
	const handleOnInputChange = ({ target: { value } }) => {
		setValue(value)

		if (saveOnChange) {
			debounce(
				setMessageCreateValueOfMain({ variables: { createValue: value } }),
				1000
			)
		}
	}

	const classes = useStyles({ width })

	return (
		<Box className={classes.root}>
			<TextField
				value={value}
				variant='outlined'
				placeholder={placeholder}
				className={classes.input}
				onChange={handleOnInputChange}
				onKeyDown={e => {
					if (e.keyCode === 13) {
						onSubmit(value)
					}
				}}
			/>
			<Button
				color={`${type === 'search' ? 'default' : 'primary'}`}
				variant='contained'
				size='large'
				className={classes.button}
				onClick={() => onSubmit(value)}
			>
				{type === 'search' ? <Search className={classes.icon} /> : 'Save'}
			</Button>
		</Box>
	)
}

export default InputActionBox
