import React, { useState } from 'react'
import {
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { SET_MESSAGE_CREATE_TEXT } from '@views/Message/query'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
	textfield: {
		width: 328,
	},
	savebutton: {
		marginLeft: theme.spacing(1),
		width: 56,
		textTransform: 'none',
	},
}))

const BoxCreate = props => {
	const { handleCreate, defaultValue } = props
	const [createVal, setCreateVal] = useState(defaultValue)
	const classes = useStyles()
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)
	const handleCreateTextChange = text => {
		setMessageCreateValueOfMain({ variables: { createValue: text } })
	}
	return (
		<Grid container alignItems='stretch' className={classes.root}>
			<TextField
				variant='outlined'
				label='Text'
				placeholder='text...'
				type='text'
				onChange={e => {
					setCreateVal(e.target.value)
					handleCreateTextChange(e.target.value)
				}}
				className={classes.textfield}
				defaultValue={defaultValue}
			/>
			<Button
				variant='contained'
				color='primary'
				className={classes.savebutton}
				onClick={() => handleCreate(createVal)}
			>
				Save
			</Button>
		</Grid>
	)
}
export default BoxCreate
