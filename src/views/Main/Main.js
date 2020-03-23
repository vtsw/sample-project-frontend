import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
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
	const client = useApolloClient()
	const classes = useStyle()
	const [selectedUser, setSelectedUser] = useState('')

	const handleChoseImage = object => {
		setSelectedUser(object)
	}

	const handleSearch = async inputVal => {
		const result = await client.query({
			query: USER_LIST,
			variables: { query: { searchText: inputVal, limit: 100 } },
		})
		setUserList(result.data.userList)
		setSelectedUser('')
	}

	const { loading, error, data } = useQuery(USER_LIST, {
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

	const loadNextUserPage = async () => {
		const result = await client.query({
			query: USER_LIST,
			variables: {
				query: { limit: 10, skip: userList.items.length },
			},
		})
		setUserList({
			...userList,
			total: userList.total + result.data.userList.total,
			items: [...userList.items, ...result.data.userList.items],
		})
	}

	return (
		<Box className={classes.root}>
			<Loading open={loading} msg={'Loading...'} />
			<Grid container className={clsx(classes.fullheight, classes.container)}>
				<Grid item xs={4}>
					<Box
						className={clsx(
							classes.container__searchbox__largetable,
							classes.fullheight
						)}
					>
						<Box className={classes.searchbox}>
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
