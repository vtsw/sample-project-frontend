import React, { useState } from 'react'

import {
	Box,
	Button,
	TextField,
	Typography,
	Grid,
	TextareaAutosize,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { validateEmail, validatePhone } from '@src/shares/utils'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	container: {
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	cardcontent: {
		padding: 0,
	},
	actions: {
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: theme.spacing(2),
		},
	},
	button: {
		fontWeight: 600,
		textTransform: 'unset',
		padding: '18px 0',
	},
	signuptext: {
		cursor: 'pointer',
	},
	row: {
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	interested: {
		height: 20,
		width: 88,
	},
}))

function createMarkupChat() {
	return {
		__html: `<div
class='zalo-chat-widget'
data-oaid='4368496045530866759'
data-welcome-message='Rất vui khi được hỗ trợ bạn!'
data-autopopup='0'
data-width='350'
data-height='420'
></div>`,
	}
}

function createMarkupFollow() {
	return {
		__html: `<div
		class='zalo-follow-only-button'
		data-oaid='4368496045530866759'
	></div>`,
	}
}

const ReservationWithoutSignin = props => {
	const { onSubmit, history } = props
	const classes = useStyles()

	const [name, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [note, setNote] = useState('')

	const handleOnSubmit = () => {
		const isValidPhone = validatePhone(phone)

		if (isValidPhone) {
			onSubmit(name, phone)
			return
		} else {
			alert('Invalid phone')
		}
	}

	const handlePressEnter = e => {
		if (e.keyCode === 13) {
			handleOnSubmit()
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container}>
				<Typography variant='h5' className={classes.title}>
					Reservation
				</Typography>
				<div className={classes.cardContent}>
					<TextField
						value={name}
						label='NAME'
						placeholder='Name'
						variant='outlined'
						autoComplete='true'
						className={classes.input}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						value={phone}
						label='PHONE'
						placeholder='Phone'
						variant='outlined'
						type='number'
						autoComplete='true'
						className={classes.input}
						onChange={e => setPhone(e.target.value)}
						onKeyDown={handlePressEnter}
					/>
					<TextField
						value={note}
						label='NOTE'
						placeholder='note'
						multiline
						rows={4}
						variant='outlined'
						className={classes.input}
						onChange={e => setNote(e.target.value)}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						data-testid='signin-button'
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						className={classes.button}
						onClick={handleOnSubmit}
					>
						Reserve
					</Button>
					<Grid container className={classes.row}>
						<Typography
							data-testid='signup-text'
							variant='body2'
							className={classes.signuptext}
							onClick={() => history.push('/sign-in')}
						>
							sign in
						</Typography>
						<div className={classes.interested}>
							<div dangerouslySetInnerHTML={createMarkupFollow()} />
						</div>
					</Grid>
				</div>
			</Box>
			<div dangerouslySetInnerHTML={createMarkupChat()} />
		</Box>
	)
}

export default ReservationWithoutSignin
