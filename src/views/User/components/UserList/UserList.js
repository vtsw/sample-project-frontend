import React from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { SearchBox, LargeTable } from '@views_components'

import {
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
	GET_SELECTED_USER,
	SET_SELECTED_USER,
} from '@views/User/query'
import localConfigs from '@src/configs.local'

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

const UserList = ({ setDialogVisible }) => {
	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)

	const { loading, _, data, fetchMore } = useQuery(FETCH_USER_LIST, {
		variables: {
			query: { searchText: userSearchValue, limit: localConfigs.LIMIT },
		},
	})
	const {
		data: { selectedUser },
	} = useQuery(GET_SELECTED_USER)

	const [setUserSearchValue] = useMutation(SET_USER_SEARCH_TEXT)
	const [setSelectedUser] = useMutation(SET_SELECTED_USER)

	const handleOnSearch = searchValue => {
		setUserSearchValue({ variables: { searchValue } })
		setSelectedUser({
			variables: {
				selectedUser: {
					id: selectedUser.id + '_reset',
					name: '',
					email: '',
					__typename: 'User',
				},
			},
		})
	}

	const loadNextUserPage = async resolve => {
		fetchMore({
			variables: {
				query: { skip: data.userList.items.length },
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				const fetchedUserList = fetchMoreResult.userList
				let cacheUserList = prev.userList
				const items = [...cacheUserList.items, ...fetchedUserList.items]
				const hasNext = fetchedUserList.hasNext
				resolve('done')
				return {
					userList: {
						...cacheUserList,
						items,
						hasNext,
					},
				}
			},
		})
	}

	const selectAnUser = selectedUser => {
		setSelectedUser({
			variables: {
				selectedUser,
			},
		})
		setDialogVisible(false)
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
							onClickRow={selectAnUser}
							selectedRow={selectedUser}
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

UserList.propsTypes = {
	setDialogVisible: PropTypes.func,
}

export default UserList
