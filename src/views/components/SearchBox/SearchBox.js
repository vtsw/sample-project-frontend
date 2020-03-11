import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
		padding: 0,
	},
	search_btn__icon: {
		fontSize: '2rem',
	},
	search_input: {
		width: '80%',
	},
}))

const SearchBox = ({ width, searchText, onSearch }) => {
	const [searchValue, setSearchValue] = useState(searchText)
	const classes = useStyles({ width })
	return (
		<Box className={classes.root}>
			<TextField
				value={searchValue}
				variant='outlined'
				placeholder='search...'
				className={clsx(classes.margin, classes.search_input)}
				onChange={e => setSearchValue(e.target.value)}
			/>
			<Button
				variant='contained'
				size='large'
				className={classes.search_btn}
				onClick={() => onSearch(searchValue)}
			>
				<Search className={classes.search_btn__icon} />
			</Button>
		</Box>
	)
}

SearchBox.propsTypes = {
	width: PropTypes.string,
	searchText: PropTypes.string,
	onSearch: PropTypes.func,
}

export default SearchBox
