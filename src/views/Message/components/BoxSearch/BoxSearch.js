import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import { Button, TextField, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	icon: {
		fontSize: '40px',
	},
	search: {
		padding: '16px',
		borderTop: `1px solid #979797`,
	},

	buttonSearch: {
		color: theme.palette.common.white,
		marginLeft: '8px',
		width: '56px',
		boxShadow: 'none',
		background: theme.palette.common.gray,
		'&:hover': {
			background: theme.palette.common.gray,
		},
	},
	textField: {
		width: '328px',
	},
}))

const BoxSearch = ({ handleSearch, defaultValue }) => {
	const classes = useStyles()
	const [searchVal, setSearchVal] = useState(defaultValue)
	return (
		<Grid container alignItems='stretch' className={classes.search}>
			<TextField
				variant='outlined'
				label='Search'
				placeholder='search...'
				type='search'
				defaultValue={defaultValue}
				onChange={e => setSearchVal(e.target.value)}
				className={classes.textField}
			/>
			<Button
				variant='contained'
				className={classes.buttonSearch}
				onClick={() => handleSearch(searchVal)}
			>
				<SearchIcon className={classes.icon} />
			</Button>
		</Grid>
	)
}
export default BoxSearch
