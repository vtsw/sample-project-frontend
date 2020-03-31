import React, { useState } from 'react'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'

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

const ActionInputBox = props => {
	const {
		type,
		placeholder,
		defaultValue,
		width,
		onSubmit,
		onChange = () => {},
	} = props
	const [value, setValue] = useState(defaultValue)

	const classes = useStyles({ width })

	return (
		<Box className={classes.root}>
			<TextField
				value={value}
				variant='outlined'
				placeholder={placeholder}
				className={classes.input}
				onChange={e => {
					setValue(e.target.value)
					onChange(e.target.value)
				}}
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
				onClick={() => {
					onSubmit(value)
					setValue('')
				}}
			>
				{type === 'search' ? <Search className={classes.icon} /> : 'Save'}
			</Button>
		</Box>
	)
}

export default ActionInputBox
