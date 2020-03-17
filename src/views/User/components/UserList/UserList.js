import React, { useState } from 'react'

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { SearchBox, LargeTable } from '@views_components'

import {
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
} from '@views/User/gql/query'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	full_screen_height: {
		height: '100vh',
	},
	full_height: {
		height: '100%',
	},
	user_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		overflow: 'hidden',
		height: '100%',
	},
	user_list__table: {
		display: 'flex',
		height: 'calc(100vh - 200px)',
	},
	search_box: {
		width: '100%',
		padding: theme.spacing(3),
	},
	search_box__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
}))

const TABLE_HEADER = [
	{ headerLabel: 'EMAIL', xs: 5, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 7, headerVariable: 'name' },
]

const UserList = ({ selectedItem, setSelectedItem }) => {
	const client = useApolloClient()
	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)

	const { loading, _, data } = useQuery(FETCH_USER_LIST, {
		variables: { query: { searchText: userSearchValue, limit: 20 } },
	})
	const [setUserSearchValue] = useMutation(SET_USER_SEARCH_TEXT)
	const handleOnSearch = searchValue => {
		setUserSearchValue({ variables: { searchValue } })
		setSelectedItem({ id: '', name: '', email: '' })
	}

	const fetchUserList = async variables => {
		const { data } = await client.query({
			query: FETCH_USER_LIST,
			variables,
		})
		return data.userList
	}

	const updateUserListInCache = ({ items, hasNext, ...otherProps }) => {
		const { userList } = client.readQuery({
			query: FETCH_USER_LIST,
			variables: { query: { searchText: userSearchValue, limit: 20 } },
		})
		client.writeQuery({
			query: FETCH_USER_LIST,
			variables: { query: { searchText: userSearchValue, limit: 20 } },
			data: {
				userList: {
					...userList,
					items: [...userList.items, ...items],
					hasNext,
					...otherProps,
				},
			},
		})
	}

	const loadNextUserPage = async () => {
		const { items, hasNext } = await fetchUserList({
			query: {
				searchText: userSearchValue,
				limit: 10,
				skip: data.userList.items.length,
			},
		})
		updateUserListInCache({ items, hasNext, boole: true })
	}

	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Box className={clsx(classes.user_list__container, classes.full_height)}>
				<Box className={classes.search_box}>
					<Typography variant='h5' className={classes.search_box__title}>
						User List
					</Typography>
					<SearchBox width={400} onSearch={handleOnSearch} />
				</Box>
				<Box className={classes.user_list__table}>
					{!loading ? (
						<LargeTable
							items={data.userList.items}
							onClickRow={setSelectedItem}
							selectedRow={selectedItem}
							columns={TABLE_HEADER}
							isIconClose={false}
							loadNextPage={loadNextUserPage}
							hasNextPage={data.userList.hasNext}
						/>
					) : (
						<div>Loading...</div>
					)}
				</Box>
			</Box>
		</Box>
	)
}

UserList.propsTypes = {}

export default UserList
