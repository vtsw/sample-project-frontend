import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

import { DeleteDialog } from '@views_components'

const USER_FIELDS = gql`
	fragment UserFields on User {
		id
		name
		email
	}
`

const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

const UPDATE_USER = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

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
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form_title: {
		color: teal[600],
		fontWeight: 600,
	},
	form_input: {
		width: '100%',
		marginTop: '18px',
	},
	form_content: {
		padding: 0,
	},
	form_buttons: {
		display: 'flex',
		flexDirection: 'column',
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: theme.spacing(2),
			marginLeft: 0,
			'&:not(:first-child)': {
				marginLeft: 0,
			},
		},
	},
	form_button: {
		color: '#ffffff',
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: teal[600],
		},
	},
})

const FormEditor = ({
	id,
	name,
	email,
	password,
	confirmPassword,
	setName,
	setEmail,
	setPassword,
	setConfirmPassword,
	selectedItem,
	setSelectedItem,
	history,
}) => {
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

	const [createNewUser] = useMutation(CREATE_USER, {
		update(cache, { data: { createUser } }) {
			const { userList } = cache.readQuery({
				query: FETCH_USER_LIST,
				variables: { query: { searchText: '', limit: 100 } },
			})
			cache.writeQuery({
				query: FETCH_USER_LIST,
				variables: { query: { searchText: '', limit: 100 } },
				data: {
					userList: { ...userList, items: [createUser, ...userList.items] },
				},
			})
		},
	})
	const [updateUser] = useMutation(UPDATE_USER, {
		update(cache, { data: { updateUser } }) {
			const { userList } = cache.readQuery({
				query: FETCH_USER_LIST,
				variables: { query: { searchText: '', limit: 100 } },
			})
			const newItemIndex = userList.items.findIndex(
				item => item.id === updateUser.id
			)
			if (newItemIndex !== -1) {
				userList.items[newItemIndex] = updateUser
				cache.writeQuery({
					query: FETCH_USER_LIST,
					variables: { query: { searchText: '', limit: 100 } },
					data: {
						userList: { ...userList, items: userList.items },
					},
				})
			}
		},
	})
	const [deleteUser] = useMutation(DELETE_USER, {
		update(cache, { data: { deleteUser } }) {
			const { userList } = cache.readQuery({
				query: FETCH_USER_LIST,
				variables: { query: { searchText: '', limit: 100 } },
			})
			const deleteItemIndex = userList.items.findIndex(
				item => item.id === deleteUser.id
			)
			console.log(deleteItemIndex, deleteUser)
			if (deleteItemIndex !== -1) {
				userList.items.splice(deleteItemIndex, 1)
				console.log(userList)
				cache.writeQuery({
					query: FETCH_USER_LIST,
					variables: { query: { searchText: '', limit: 100 } },
					data: {
						userList: { ...userList, items: [...userList.items] },
					},
				})
			}
			const afterData = cache.readQuery({
				query: FETCH_USER_LIST,
				variables: { query: { searchText: '', limit: 100 } },
			})
			console.log('afterData', afterData)
		},
	})

	const classes = useStyles()

	const onCancel = () => {
		if (!name && !email) {
			history.push('/sign-in')
			return
		}
		setSelectedItem({ id: '', name: '', email: '' })
		setPassword('')
		setConfirmPassword('')
	}

	const validateForm = () => {
		const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm
		const isValidEmail = email.match(emailRegex)
		console.log(isValidEmail)

		if (isValidEmail === null || password !== confirmPassword) {
			return false
		}
		return true
	}

	const onSubmit = () => {
		const isValid = validateForm()

		if (isValid) {
			if (id) {
				updateUser({
					variables: { user: { id, email, name, password } },
				})
					.then(data => {
						console.log(data)
						onCancel()
					})
					.catch(error => console.error(error))
			} else {
				createNewUser({
					variables: { user: { email, name, password } },
				})
					.then(data => {
						console.log(data)
						onCancel()
					})
					.catch(error => console.error(error))
			}
		} else {
			alert('Not valid!!!!')
		}
	}

	const onAgreeDeleteAnUser = () => {
		deleteUser({ variables: { id } })
			.then(data => {
				console.log(data)
			})
			.catch(error => console.error(error))
		setOpenConfirmDeleteDialog(false)
	}

	return (
		<ThemeProvider theme={theme}>
			<Box className={classes.root}>
				<Typography variant='h5' className={classes.form_title}>
					{selectedItem.id ? 'Modify' : 'Sign up'}
				</Typography>
				<div className={classes.form_content}>
					<TextField
						value={email}
						label='EMAIL'
						variant='outlined'
						type='email'
						className={classes.form_input}
						onChange={e => setEmail(e.target.value.toLowerCase())}
					/>
					<TextField
						value={name}
						label='NAME'
						variant='outlined'
						type='text'
						autoComplete='true'
						className={classes.form_input}
						onChange={e => setName(e.target.value)}
					/>
					<TextField
						value={password}
						label='PASSWORD'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.form_input}
						onChange={e => setPassword(e.target.value)}
					/>
					<TextField
						value={confirmPassword}
						label='PASSWORD CONFIRM'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.form_input}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className={classes.form_buttons}>
					<Button
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						className={classes.form_button}
						onClick={onSubmit}
					>
						{selectedItem.id ? 'Save' : 'Register'}
					</Button>
					{selectedItem.id ? (
						<Button
							variant='contained'
							size='large'
							fullWidth
							className={classes.form_button}
							onClick={() => {
								setOpenConfirmDeleteDialog(true)
							}}
						>
							Delete
						</Button>
					) : null}
					<Button
						variant='contained'
						size='large'
						fullWidth
						className={classes.form_button}
						onClick={onCancel}
					>
						Cancel
					</Button>
				</div>
				<DeleteDialog
					open={openConfirmDeleteDialog}
					onClose={() => {
						setOpenConfirmDeleteDialog(false)
					}}
					onAgree={onAgreeDeleteAnUser}
					onDisagree={() => {
						setOpenConfirmDeleteDialog(false)
					}}
				/>
			</Box>
		</ThemeProvider>
	)
}

FormEditor.propsTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	password: PropTypes.string,
	confirmPassword: PropTypes.string,
	selectedItem: PropTypes.object,
	setName: PropTypes.func,
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	setConfirmPassword: PropTypes.func,
	setSelectedItem: PropTypes.func,
}

export default withRouter(FormEditor)
