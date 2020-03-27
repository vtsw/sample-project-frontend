import React, { useState } from 'react'
import clsx from 'clsx'
import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import { useMutation } from '@apollo/react-hooks'
import { SET_USER_SEARCH_TEXT } from '@views/User/query'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		maxWidth: ({ width }) => width,
		width: '100%',
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

const SearchBox = ({ width, onSearch, defaultValue }) => {
	const [searchValue, setSearchValue] = useState(defaultValue)
	const classes = useStyles({ width })
	const [setUserSearchValue] = useMutation(SET_USER_SEARCH_TEXT)
	const handleSearchTextChange = text => {
		setUserSearchValue({ variables: { text } })
	}
	return (
		<Box className={classes.root}>
			<TextField
				value={searchValue}
				variant='outlined'
				placeholder='search...'
				className={clsx(classes.margin, classes.search_input)}
				onChange={e => {
					setSearchValue(e.target.value)
					handleSearchTextChange(e.target.value)
				}}
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

export default SearchBox
