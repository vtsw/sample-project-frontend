import React from 'react'

import clsx from 'clsx'
import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		width: ({ width }) => width,
	},
	search_btn: {
		color: theme.palette.common.white,
	},
	search_btn__icon: {
		fontSize: '2rem',
	},
	search_input: {
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
				className={clsx(classes.margin, classes.search_input)}
				variant='outlined'
			/>
			<Button variant='contained' size='large' className={classes.search_btn}>
				<Search className={classes.search_btn__icon} />
			</Button>
		</Box>
	)
}

export default SearchBox
