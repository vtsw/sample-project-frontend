import React, { useState } from 'react'
import {
	Grid,
	TextField,
	Typography,
	Button,
	makeStyles,
} from '@material-ui/core'

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
		background: theme.palette.primary.main,
		'&:hover': {
			background: theme.palette.primary.main,
		},
	},
}))

export default function BoxCreate({ handleCreate }) {
	const [createVal, setCreateVal] = useState('')
	const classes = useStyles()

	return (
		<Grid container alignItems='stretch' className={classes.save}>
			<TextField
				variant='outlined'
				label='Text'
				placeholder='text...'
				type='text'
				onChange={e => setCreateVal(e.target.value)}
				className={classes.textField}
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
