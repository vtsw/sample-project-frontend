import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		maxWidth: ({ width }) => width,
		width: '100%',
	},
	searchinput: {
		width: '80%',
	},
	searchbutton: {
		color: theme.palette.common.white,
		padding: 0,
	},
	searchbutton__icon: {
		fontSize: '2rem',
	},
}))

const SearchBox = ({ width, onSearch }) => {
	const [searchValue, setSearchValue] = useState('')
	const classes = useStyles({ width })
	return (
		<Box className={classes.root}>
			<TextField
				value={searchValue}
				variant='outlined'
				placeholder='search...'
				className={classes.searchinput}
				onChange={e => setSearchValue(e.target.value)}
			/>
			<Button
				variant='contained'
				size='large'
				className={classes.searchbutton}
				onClick={() => onSearch(searchValue)}
			>
				<Search className={classes.searchbutton__icon} />
			</Button>
		</Box>
	)
}

SearchBox.propsTypes = {
	width: PropTypes.string,
	onSearch: PropTypes.func,
}

export default SearchBox
