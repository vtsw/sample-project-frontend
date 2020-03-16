import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles } from '@material-ui/core'
import { CVTable, SearchBox } from '@views_components'
import { TABLE_TYPES } from '@src/shares/types'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { USER_LIST, USER_LIST_WITHOUT_FILTER } from './query'
import { ListMessageOfUser } from './components'
import Loading from '../components/Loading'

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
			variables: { query: { searchText: inputVal, limit: 1000 } },
		})
		setUserList(result.data.userList)
		setSelectedUser('')
	}

	const { loading, error, data } = useQuery(USER_LIST_WITHOUT_FILTER, {
		fetchPolicy: 'network-only',
	})

	useEffect(() => {
		if (data && data.userList) {
			setUserList(data.userList)
		}
	}, [data])

	if (error) return <p>Error :(</p>

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
							<CVTable
								type={TABLE_TYPES.USER_INFO}
								tableData={userList.items}
								tableHeight='calc(100vh - 210px)'
								selectedItem={selectedUser}
								setSelectedItem={handleChoseImage}
							/>
						)}
					</Box>
				</Grid>
				<Grid item xs={8}>
					<ListMessageOfUser selectedUser={selectedUser} />
				</Grid>
			</Grid>
		</Box>
	)
}
export default Main
