import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Loading, InfiniteTable } from '@views_components'
import { SearchUserBox } from '@views/User/components'

import { NETWORK_STATUS_FETCH_MORE, PAGE_LIMIT } from '@src/configs.local'

import { FETCH_USER_LIST } from '@views/User/gql/query'
import {
	GET_USER_SEARCH_TEXT,
	GET_SELECTED_USER_OF_MAIN,
} from '@views/Main/gql/query'
import {
	SET_USER_SEARCH_TEXT,
	SET_SELECTED_USER_OF_MAIN,
} from '@views/Main/gql/mutation'

const useStyle = makeStyles(theme => ({
	root: {
		height: '100%',
		position: 'relative',
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

const tableHeaders = [
	{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
]

const UserList = () => {
	const classes = useStyle()

	const { data: userSearchValueOfMainData } = useQuery(GET_USER_SEARCH_TEXT)

	const { data: selectedUserOfMainData } = useQuery(GET_SELECTED_USER_OF_MAIN)

	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		FETCH_USER_LIST,
		{
			variables: { query: { limit: PAGE_LIMIT } },
			notifyOnNetworkStatusChange: true,
			onError: err => alert(err),
		}
	)

	const [setSearchValue] = useMutation(SET_USER_SEARCH_TEXT)
	const [setSelectedUser] = useMutation(SET_SELECTED_USER_OF_MAIN)

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

	const handleSearch = inputVal => {
		setSearchValue({ variables: { searchValue: inputVal } })
		if (inputVal === userSearchValueOfMainData.userSearchValueOfMain) {
			return false
		} else {
			try {
				fetchMore({
					variables: {
						query: { searchText: inputVal, limit: PAGE_LIMIT },
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
			} catch (error) {
				alert(error.message)
			}
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

	const loadNextUserPage = () => {
		try {
			fetchMore({
				variables: {
					query: {
						limit: PAGE_LIMIT,
						skip: data.userList.items.length,
						searchText: userSearchValueOfMainData.userSearchValueOfMain,
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
		} catch (error) {
			alert(error.message)
		}
	}

	if (error) return <p>Error :(</p>

	return (
		<Box className={classes.root}>
			<Box className={classes.searchbox}>
				<SearchUserBox
					width={328}
					placeholder='search...'
					type='search'
					defaultValue={userSearchValueOfMainData?.userSearchValueOfMain}
					onSubmit={handleSearch}
				/>
			</Box>
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Loading open={true} msg={'Loading...'} />
			) : (
				<InfiniteTable
					items={data.userList.items}
					onClickRow={handleChoseImage}
					selectedRow={selectedUserOfMainData?.selectedUserOfMain}
					columns={tableHeaders}
					loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
					isIconClose={false}
					loadNextPage={loadNextUserPage}
					hasNextPage={data?.userList?.hasNext}
				/>
			)}
		</Box>
	)
}

export default UserList
