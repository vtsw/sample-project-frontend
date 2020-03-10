import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { FormEditor, SearchBox, CVTable } from '@views_components'
import { WelcomeDialog } from './components'
import { TABLE_TYPES } from '@src/shares/types'

const FETCH_USER_LIST = gql`
	query FetchUserList($query: UserListInput) {
		userList(query: $query) {
			items {
				name
				email
				id
			}
			hasNext
			total
		}
	}
`

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	full_screen_height: {
		height: '100vh',
	},
	full_height: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(3),
	},
	sign_up__container: {
		display: 'flex',
		alignItems: 'center',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
		position: 'relative',
	},
	user_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		overflow: 'hidden',
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

const user = [
	{ id: 1, email: 'test@test.com', name: 'test' },
	{ id: 2, email: 'test@test.com', name: 'test' },
	{ id: 3, email: 'test@test.com', name: 'test' },
	{ id: 4, email: 'test@test.com', name: 'test' },
	{ id: 5, email: 'test@test.com', name: 'test' },
	{ id: 6, email: 'test@test.com', name: 'test' },
	{ id: 21, email: 'test@test.com', name: 'test' },
	{ id: 31, email: 'test@test.com', name: 'test' },
	{ id: 41, email: 'test@test.com', name: 'test' },
	{ id: 51, email: 'test@test.com', name: 'test' },
	{ id: 61, email: 'test@test.com', name: 'test' },
	{ id: 22, email: 'test@test.com', name: 'test' },
	{ id: 32, email: 'test@test.com', name: 'test' },
	{ id: 42, email: 'test@test.com', name: 'test' },
	{ id: 52, email: 'test@test.com', name: 'test' },
	{ id: 62, email: 'test@test.com', name: 'test' },
	{ id: 23, email: 'test@test.com', name: 'test' },
	{ id: 33, email: 'test@test.com', name: 'test' },
	{ id: 43, email: 'test@test.com', name: 'test' },
	{ id: 53, email: 'test@test.com', name: 'test' },
	{ id: 63, email: 'test@test.com', name: 'test' },
	{ id: 24, email: 'test@test.com', name: 'test' },
	{ id: 34, email: 'test@test.com', name: 'test' },
	{ id: 44, email: 'test@test.com', name: 'test' },
	{ id: 54, email: 'test@test.com', name: 'test' },
	{ id: 64, email: 'test@test.com', name: 'test' },
	{ id: 25, email: 'test@test.com', name: 'test' },
	{ id: 35, email: 'test@test.com', name: 'test' },
	{ id: 45, email: 'test@test.com', name: 'test' },
	{ id: 55, email: 'test@test.com', name: 'test' },
	{ id: 65, email: 'test@test.com', name: 'test' },
	{ id: 26, email: 'test@test.com', name: 'test' },
	{ id: 36, email: 'test@test.com', name: 'test' },
	{ id: 46, email: 'test@test.com', name: 'test' },
	{ id: 56, email: 'test@test.com', name: 'test' },
	{ id: 66, email: 'test@test.com', name: 'test' },
]

const User = () => {
	const [dialogVisible, setDialogVisible] = useState(true)
	const [selectedItem, setSelectedItem] = useState('')
	const [searchText, setSearchText] = useState('')
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { loading, error, data, refetch } = useQuery(FETCH_USER_LIST, {
		variables: { query: { searchText } },
	})
	const classes = useStyles()
	if (loading) {
		return <div> Loading... </div>
	}

	const onSelectTableItem = ({ id, email, name }) => {
		setSelectedItem({ id, email, name })
		setName(name)
		setEmail(email)
	}

	const onSearch = value => {
		setSearchText(value)
		refetch()
	}
	console.log(loading, error, data)

	return (
		<Box className={classes.root}>
			<Grid
				container
				className={clsx(classes.full_screen_height, classes.container)}
			>
				<Grid item xs={4}>
					<Box
						className={clsx(classes.sign_up__container, classes.full_height)}
					>
						{dialogVisible && !selectedItem ? (
							<WelcomeDialog setDialogVisible={setDialogVisible} />
						) : null}
						<FormEditor
							id={selectedItem.id}
							name={name}
							email={email}
							password={password}
							confirmPassword={confirmPassword}
							setName={setName}
							setEmail={setEmail}
							setPassword={setPassword}
							setConfirmPassword={setConfirmPassword}
							setSelectedItem={onSelectTableItem}
						/>
					</Box>
				</Grid>
				<Grid item xs={8}>
					<Box
						className={clsx(classes.user_list__container, classes.full_height)}
					>
						<Box className={classes.search_box}>
							<Typography variant='h5' className={classes.search_box__title}>
								User List
							</Typography>
							<SearchBox
								width={400}
								searchText={searchText}
								setSearchText={setSearchText}
								onSearch={onSearch}
							/>
						</Box>
						{loading ? null : (
							<CVTable
								type={TABLE_TYPES.USER_INFO}
								tableData={data.userList.items}
								tableHeight='calc(100vh - 250px)'
								selectedItem={selectedItem}
								setSelectedItem={onSelectTableItem}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

User.propsTypes = {}

export default User
