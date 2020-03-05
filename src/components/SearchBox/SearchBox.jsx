import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		width: ({ width }) => width,
	},
	searchbtn: {
		color: theme.palette.common.white,
	},
	searchbtn__icon: {
		fontSize: '2rem',
	},
	textField: {
		width: '80%',
	},
}))

const SearchBox = ({ width }) => {
	const classes = useStyles({ width })
	return (
		<Box className={classes.root}>
			<TextField
				id='filled-start-adornment'
				placeholder='search...'
				className={clsx(classes.margin, classes.textField)}
				variant='outlined'
			/>
			<Button variant='contained' size='large' className={classes.searchbtn}>
				<Search className={classes.searchbtn__icon} />
			</Button>
		</Box>
	)
}

export default SearchBox
