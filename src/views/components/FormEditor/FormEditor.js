import React, { useState, useEffect, useReducer } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

import { DeleteDialog } from '@views_components'

import {
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	GET_SELECTED_USER,
	SET_SELECTED_USER,
} from '@views/User/query'
import { useCreateAUser, useDeleteAUser } from './useMutations'

import { getToken } from '@src/shares/utils'
import localConfigs from '@src/configs.local'

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

const initialState = {
	id: '',
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_USER_INFO':
			return { ...state, ...action.payload }
		default:
			return { ...state }
	}
}

const FormEditor = ({ history }) => {
	const isAuthenticated = getToken()

	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)
	const {
		data: { selectedUser },
	} = useQuery(GET_SELECTED_USER)
	const [setSelectedUser] = useMutation(SET_SELECTED_USER)
	const [updateUser] = useMutation(UPDATE_USER)
	const [createNewUser] = useCreateAUser(
		CREATE_USER,
		FETCH_USER_LIST,
		{
			query: { searchText: userSearchValue, limit: localConfigs.LIMIT },
		},
		isAuthenticated
	)
	const [deleteUser] = useDeleteAUser(DELETE_USER, FETCH_USER_LIST, {
		query: { searchText: userSearchValue, limit: localConfigs.LIMIT },
	})

	const [{ id, email, name, password, confirmPassword }, dispatch] = useReducer(
		reducer,
		initialState
	)

	// const [userId, setUserId] = useState('')
	// const [email, setEmail] = useState('')
	// const [name, setName] = useState('')
	// const [password, setPassword] = useState('')
	// const [confirmPassword, setConfirmPassword] = useState('')
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

	useEffect(() => {
		// setUserId(selectedUser.id)
		// setEmail(selectedUser.email)
		// setName(selectedUser.name)
		const { id, email, name } = selectedUser
		dispatch({
			type: 'UPDATE_USER_INFO',
			payload: {
				id,
				email,
				name,
			},
		})
	}, [selectedUser])

	console.log(selectedUser)

	const classes = useStyles()

	const onCancel = () => {
		if (!isAuthenticated) {
			history.push('/sign-in')
			return
		}
		setSelectedUser({
			variables: {
				selectedUser: {
					id: id + '_reset',
					name: '',
					email: '',
					__typename: 'User',
				},
			},
		})
		dispatch({
			type: 'UPDATE_USER_INFO',
			payload: {
				password: '',
				confirmPassword: '',
			},
		})
		// setPassword('')
		// setConfirmPassword('')
	}

	const validateForm = () => {
		const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm
		const isValidEmail = email.match(emailRegex)

		if (isValidEmail === null || password !== confirmPassword) {
			return false
		}
		return true
	}

	const shouldUseRefetchQueries = () => {
		return userSearchValue
			? [
					{
						query: FETCH_USER_LIST,
						variables: {
							query: { searchText: userSearchValue, limit: localConfigs.LIMIT },
						},
						awaitRefetchQueries: true,
					},
			  ]
			: []
	}

	const updateUserInfo = () => {
		let userInfo = { id, email, name }
		if (password) userInfo = { ...userInfo, password }
		updateUser({
			variables: { user: userInfo },
		})
			.then(() => {
				onCancel()
			})
			.catch(error => {
				alert(error.message)
				console.error(error)
			})
	}

	const createAUser = () => {
		createNewUser({
			variables: { user: { email, name, password } },
			refetchQueries: shouldUseRefetchQueries(),
		})
			.then(() => {
				onCancel()
			})
			.catch(error => {
				alert(error.message)
				console.error(error)
			})
	}

	const onSubmit = () => {
		const isValid = validateForm()

		if (isValid) {
			if (selectedUser.id && selectedUser.name && selectedUser.email) {
				updateUserInfo()
			} else {
				createAUser()
			}
		} else {
			alert('Not valid!!!!')
		}
	}

	const onAgreeDeleteAnUser = () => {
		deleteUser({ variables: { id } })
			.then(() => {
				setSelectedUser({
					variables: {
						selectedUser: {
							id: id + '_reset',
							name: '',
							email: '',
							__typename: 'User',
						},
					},
				})
				setOpenConfirmDeleteDialog(false)
			})
			.catch(error => console.error(error))
	}

	return (
		<ThemeProvider theme={theme}>
			<Box className={classes.root}>
				<Typography variant='h5' className={classes.form_title}>
					{selectedUser.id && selectedUser.name && selectedUser.email
						? 'Modify'
						: 'Sign up'}
				</Typography>
				<div className={classes.form_content}>
					<TextField
						value={email}
						label='EMAIL'
						variant='outlined'
						type='email'
						className={classes.form_input}
						onChange={e =>
							dispatch({
								type: 'UPDATE_USER_INFO',
								payload: {
									email: e.target.value.toLowerCase(),
								},
							})
						}
					/>
					<TextField
						value={name}
						label='NAME'
						variant='outlined'
						type='text'
						autoComplete='true'
						className={classes.form_input}
						onChange={e =>
							dispatch({
								type: 'UPDATE_USER_INFO',
								payload: {
									name: e.target.value,
								},
							})
						}
					/>
					<TextField
						value={password}
						label='PASSWORD'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.form_input}
						onChange={e =>
							dispatch({
								type: 'UPDATE_USER_INFO',
								payload: {
									password: e.target.value,
								},
							})
						}
					/>
					<TextField
						value={confirmPassword}
						label='PASSWORD CONFIRM'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.form_input}
						onChange={e =>
							dispatch({
								type: 'UPDATE_USER_INFO',
								payload: {
									confirmPassword: e.target.value,
								},
							})
						}
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
						{selectedUser.id && selectedUser.name && selectedUser.email
							? 'Save'
							: 'Register'}
					</Button>
					{selectedUser.id && selectedUser.name && selectedUser.email ? (
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

export default withRouter(FormEditor)
