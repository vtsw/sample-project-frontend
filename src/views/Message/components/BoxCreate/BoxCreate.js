import React, { useState } from 'react'
import { Grid, TextField, Button, makeStyles } from '@material-ui/core'

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

export default function BoxCreate({ handleCreate }) {
	const [createVal, setCreateVal] = useState('')
	const classes = useStyles()

	return (
		<Grid container alignItems='stretch' className={classes.root}>
			<TextField
				variant='outlined'
				label='Text'
				placeholder='text...'
				type='text'
				onChange={e => setCreateVal(e.target.value)}
				className={classes.textfield}
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
