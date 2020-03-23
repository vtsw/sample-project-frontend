import React, { useState } from 'react'
import {
	Grid,
	TextField,
	Typography,
	Button,
	makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {
		padding: '16px',
	},
	textfield: {
		width: '328px',
	},
	savebtn: {
		marginLeft: '8px',
		width: '56px',
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
				className={classes.savebtn}
				onClick={() => handleCreate(createVal)}
			>
				Save
			</Button>
		</Grid>
	)
}
