import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
	USER_LIST,
	GET_USER_SEARCH_TEXT,
	GET_SELECTED_USER_OF_MAIN,
	SET_USER_SEARCH_TEXT,
	SET_SELECTED_USER_OF_MAIN,
} from './query'

import { InputActionBox, Loading, LargeTable } from '@views_components'
import { ListMessageOfUser } from './components'

import { NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
		position: 'relative',
	},
	fullheight: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(3),
	},
	container__searchbox__largetable: {
		display: 'flex',
		flexDirection: 'column',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
	},
	searchbox__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
	searchbox: {
		padding: theme.spacing(3),
	},
	overlay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
		marginLeft: theme.spacing(1.5),
	},
}))

const Main = () => {
	const [userList, setUserList] = useState({})
	const classes = useStyle()

	const {
		data: { userSearchValueOfMain },
	} = useQuery(GET_USER_SEARCH_TEXT)

	const {
		data: { selectedUserOfMain },
	} = useQuery(GET_SELECTED_USER_OF_MAIN)

	const { loading, data, fetchMore, networkStatus } = useQuery(USER_LIST, {
		variables: { query: { limit: 20 } },
		notifyOnNetworkStatusChange: true,
	})

	const [setSearchValue] = useMutation(SET_USER_SEARCH_TEXT)
	const [setSelectedUser] = useMutation(SET_SELECTED_USER_OF_MAIN)

	useEffect(() => {
		if (data && data.userList) {
			setUserList(data.userList)
		}
	}, [data])

	const handleChoseImage = object => {
		setSelectedUser({
			variables: {
				selectedUser: {
					...object,
					__typename: 'UserOfMain',
				},
			},
		})
	}

	const columns = [
		{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
		{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
	]

	const handleSearch = inputVal => {
		setSearchValue({ variables: { searchValue: inputVal } })
		if (inputVal === userSearchValueOfMain) {
			return false
		} else {
			fetchMore({
				variables: {
					query: { searchText: inputVal, limit: 10 },
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) {
						return prev
					} else {
						const fetchedUserList = fetchMoreResult.userList
						let cacheUserList = prev.userList
						const hasNext = fetchedUserList.hasNext

						return {
							userList: {
								...cacheUserList,
								items: fetchedUserList.items,
								hasNext,
							},
						}
					}
				},
			})
			setSelectedUser({
				variables: {
					selectedUser: {
						id: '',
						name: '',
						email: '',
						__typename: 'UserOfMain',
					},
				},
			})
		}
	}

	const loadNextUserPage = () =>
		fetchMore({
			variables: {
				query: {
					limit: 10,
					skip: userList.items.length,
					searchText: userSearchValueOfMain,
				},
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

	return (
		<Box className={classes.root}>
			<Loading
				open={loading && networkStatus !== NETWORK_STATUS_FETCH_MORE}
				msg={'Loading...'}
			/>
			<Grid container className={clsx(classes.fullheight, classes.container)}>
				<Grid item xs={4}>
					<Box
						className={clsx(
							classes.container__searchbox__largetable,
							classes.fullheight
						)}
					>
						<Box className={classes.searchbox}>
							<InputActionBox
								width={328}
								placeholder='search...'
								type='search'
								defaultValue={userSearchValueOfMain}
								onSubmit={handleSearch}
							/>
						</Box>
						{userList && userList.items && (
							<LargeTable
								items={userList.items}
								onClickRow={handleChoseImage}
								selectedRow={selectedUserOfMain}
								columns={columns}
								loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
								isIconClose={false}
								loadNextPage={loadNextUserPage}
								hasNextPage={userList.hasNext}
							/>
						)}
					</Box>
				</Grid>
				<Grid item xs={8}>
					{selectedUserOfMain && selectedUserOfMain.id ? (
						<ListMessageOfUser selectedUser={selectedUserOfMain} />
					) : (
						<Box className={classes.overlay}>
							<Typography variant='subtitle2' color='primary' gutterBottom>
								Select an item on the left.
							</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}

export default Main
