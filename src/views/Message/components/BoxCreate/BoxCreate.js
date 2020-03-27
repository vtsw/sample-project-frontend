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
	save: {
		padding: '16px',
	},
	textField: {
		width: '328px',
	},
	buttonSave: {
		color: theme.palette.common.white,
		marginLeft: '8px',
		width: '56px',
		boxShadow: 'none',
		textTransform: 'none',
		background: theme.palette.common.green,
		'&:hover': {
			background: theme.palette.common.green,
		},
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
		<Grid container alignItems='stretch' className={classes.save}>
			<TextField
				variant='outlined'
				label='Text'
				placeholder='text...'
				type='text'
				onChange={e => {
					setCreateVal(e.target.value)
					handleCreateTextChange(e.target.value)
				}}
				className={classes.textField}
				defaultValue={defaultValue}
			/>
			<Button
				variant='contained'
				className={classes.buttonSave}
				onClick={() => handleCreate(createVal)}
			>
				<Typography variant='caption'>Save</Typography>
			</Button>
		</Grid>
	)
}
export default BoxCreate
