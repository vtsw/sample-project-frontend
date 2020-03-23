import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { USER_LIST } from './query'
import { ListMessageOfUser } from './components'
import Loading from '../components/Loading'
import LargeTable from '../components/LargeTable/LargeTable'
import { SearchBox } from '@views_components'

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
		position: 'relative',
	},
	full_height: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(3),
	},

	user_list__container: {
		display: 'flex',
		flexDirection: 'column',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
	},

	search_box: {
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
	const [searchValue, setSearchValue] = useState('')
	const [selectedUser, setSelectedUser] = useState('')

	const handleChoseImage = object => {
		setSelectedUser(object)
	}

	const { loading, error, data, fetchMore } = useQuery(USER_LIST, {
		fetchPolicy: 'network-only',
		variables: { query: { limit: 20 } },
	})

	useEffect(() => {
		if (data && data.userList) {
			setUserList(data.userList)
		}
	}, [data])

	if (error) return <p>Error :(</p>

	const columns = [
		{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
		{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
	]

	const handleSearch = async inputVal => {
		setSearchValue(inputVal)
		fetchMore({
			variables: {
				query: { searchText: inputVal, limit: 10 },
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
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
			},
		})
	}

	const loadNextUserPage = async resolve => {
		fetchMore({
			variables: {
				query: {
					limit: 10,
					skip: userList.items.length,
					searchText: searchValue,
				},
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

	return (
		<Box className={classes.root}>
			<Loading open={loading} msg={'Loading...'} />
			<Grid container className={clsx(classes.full_height, classes.container)}>
				<Grid item xs={4}>
					<Box
						className={clsx(classes.user_list__container, classes.full_height)}
					>
						<Box className={classes.search_box}>
							<SearchBox width={390} onSearch={handleSearch} />
						</Box>
						{userList && userList.items && (
							<LargeTable
								items={userList.items}
								onClickRow={handleChoseImage}
								selectedRow={selectedUser}
								columns={columns}
								isIconClose={false}
								loadNextPage={loadNextUserPage}
								hasNextPage={userList.hasNext}
							/>
						)}
					</Box>
				</Grid>
				<Grid item xs={8}>
					{selectedUser && selectedUser.id ? (
						<ListMessageOfUser selectedUser={selectedUser} />
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
