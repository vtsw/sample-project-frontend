import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { useMutation } from '@apollo/react-hooks'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'

import { SET_USER_SEARCH_TEXT } from '@views/User/gql/query'

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

const SearchBox = ({ width, setSelectedItem }) => {
	const [searchValue, setSearchValue] = useState('')
	const [setUserSearchValue] = useMutation(SET_USER_SEARCH_TEXT)

	const classes = useStyles({ width })

	const onSearch = searchValue => {
		if (searchValue) {
			setUserSearchValue({ variables: { searchValue } })
			setSelectedItem({ id: '', name: '', email: '' })
		}
	}
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
