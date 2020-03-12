import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
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
	GET_SEARCH_TEXT,
} from '@views/User/gql/queries'
import { useCreateAUser, useDeleteAUser } from './mutations'

import { getToken } from '@src/shares/utils'

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
	const isAuthenticated = getToken()
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
	const {
		data: { userSearchValue },
	} = useQuery(GET_SEARCH_TEXT)

	const [createNewUser] = useCreateAUser(
		CREATE_USER,
		FETCH_USER_LIST,
		{
			query: { searchText: userSearchValue, limit: 100 },
		},
		isAuthenticated
	)

	const [updateUser] = useMutation(UPDATE_USER)
	const [deleteUser] = useDeleteAUser(DELETE_USER, FETCH_USER_LIST, {
		query: { searchText: userSearchValue, limit: 100 },
	})

	const classes = useStyles()

	const onCancel = () => {
		if (!isAuthenticated) {
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
					.then(() => {
						onCancel()
					})
					.catch(error => console.error(error))
			} else {
				createNewUser({
					variables: { user: { email, name, password } },
				})
					.then(() => {
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
			.then(() => {
				setSelectedItem({ id: '', name: '', email: '' })
				setOpenConfirmDeleteDialog(false)
			})
			.catch(error => console.error(error))
	}

	return (
		<ThemeProvider theme={theme}>
			<Box className={classes.root}>
				<Typography variant='h5' className={classes.form_title}>
					{selectedItem && selectedItem.id ? 'Modify' : 'Sign up'}
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
						{selectedItem && selectedItem.id ? 'Save' : 'Register'}
					</Button>
					{selectedItem && selectedItem.id ? (
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
