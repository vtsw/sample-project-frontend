import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import { Button, TextField, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		borderTop: `1px solid ${theme.palette.common.border}`,
	},
	textfield: {
		width: 328,
	},
	searchbutton: {
		color: theme.palette.common.white,
		marginLeft: theme.spacing(1),
		width: 56,
		boxShadow: 'none',
		background: theme.palette.grey['300'],
		'&:hover': {
			background: theme.palette.grey['300'],
		},
	},
	icon: {
		fontSize: 40,
	},
}))

const BoxSearch = ({ handleSearch }) => {
	const classes = useStyles()
	const [searchVal, setSearchVal] = useState('')
	return (
		<Grid container alignItems='stretch' className={classes.root}>
			<TextField
				variant='outlined'
				label='Search'
				placeholder='search...'
				type='search'
				onChange={e => setSearchVal(e.target.value)}
				className={classes.textfield}
			/>
			<Button
				variant='contained'
				className={classes.searchbutton}
				onClick={() => handleSearch(searchVal)}
			>
				<SearchIcon className={classes.icon} />
			</Button>
		</Grid>
	)
}

export default BoxSearch
