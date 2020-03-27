import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SearchBox, LargeTable, Loading } from '@views_components'

import {
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	GET_SELECTED_USER,
} from '@views/User/queries'
import { SET_USER_SEARCH_TEXT, SET_SELECTED_USER } from '@views/User/mutations'
import { PAGE_LIMIT, NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	userlist__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		overflow: 'hidden',
		height: '100%',
	},
	userlist__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100vh - 200px)',
	},
	searchbox: {
		width: '100%',
		padding: theme.spacing(3),
	},
	searchbox__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
}))

const TABLE_HEADER = [
	{ headerLabel: 'EMAIL', xs: 5, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 7, headerVariable: 'name' },
]

const UserList = props => {
	const { onSelectAnUser } = props
	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)

	const { loading, data, fetchMore, networkStatus } = useQuery(
		FETCH_USER_LIST,
		{
			variables: {
				query: { searchText: userSearchValue, limit: PAGE_LIMIT },
			},
			notifyOnNetworkStatusChange: true,
			onError: err => {
				alert(err)
			},
		}
	)
	const {
		data: { selectedUser },
	} = useQuery(GET_SELECTED_USER, {
		onError: err => {
			alert(err)
		},
	})

	const [setUserSearchValue] = useMutation(SET_USER_SEARCH_TEXT, {
		onError: err => {
			alert(err)
		},
	})
	const [setSelectedUser] = useMutation(SET_SELECTED_USER, {
		onError: err => {
			alert(err)
		},
	})

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

	const loadNextUserPage = () =>
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

				return {
					userList: {
						...cacheUserList,
						items,
						hasNext,
					},
				}
			},
		})

	const selectAnUser = selectedUser => {
		setSelectedUser({
			variables: {
				selectedUser,
			},
		})
		onSelectAnUser()
	}

	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Box className={classes.userlist__container}>
				<Box className={classes.searchbox}>
					<Typography variant='h5' className={classes.searchbox__title}>
						User List
					</Typography>
					<SearchBox
						userSearchValue={userSearchValue}
						width={400}
						onSearch={handleOnSearch}
					/>
				</Box>
				<Box className={classes.userlist__table}>
					{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
						<Loading open={true} msg={'Loading...'} />
					) : (
						<LargeTable
							items={data.userList.items}
							onClickRow={selectAnUser}
							selectedRow={selectedUser}
							columns={TABLE_HEADER}
							isIconClose={false}
							loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
							loadNextPage={loadNextUserPage}
							hasNextPage={data.userList.hasNext}
						/>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default UserList
