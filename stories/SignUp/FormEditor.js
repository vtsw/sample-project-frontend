import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { action } from '@storybook/addon-actions'
import { DeleteDialog } from '@views_components'
import LinkTo from '@storybook/addon-links/react'

const useStyles = makeStyles(theme => ({
	root: {
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	formtitle: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	forminput: {
		width: '100%',
		marginTop: 18,
	},
	formcontent: {
		padding: 0,
	},
	formbuttons: {
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
	formbutton: {
		color: theme.palette.common.white,
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const FormEditor = () => {
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
	return (
		<Box className={classes.root}>
			<Typography variant='h5' className={classes.formtitle}>
				Sign up
			</Typography>
			<div className={classes.formcontent}>
				<TextField
					value={email}
					label='EMAIL'
					variant='outlined'
					type='email'
					className={classes.forminput}
					onChange={e => setEmail(e.target.value.toLowerCase())}
				/>
				<TextField
					value={name}
					label='NAME'
					variant='outlined'
					type='text'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					id='formeditor-password'
					value={password}
					label='PASSWORD'
					variant='outlined'
					type='password'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setPassword(e.target.value)}
				/>
				<TextField
					id='formeditor-password-confirm'
					value={confirmPassword}
					label='PASSWORD CONFIRM'
					variant='outlined'
					type='password'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</div>
			<div className={classes.formbuttons}>
				<Button
					data-cy='submit-button'
					color='primary'
					variant='contained'
					size='large'
					fullWidth
					className={classes.formbutton}
					onClick={() => action('Handle register')({ email, password, name })}
				>
					Register
				</Button>
				<Button
					variant='contained'
					size='large'
					fullWidth
					className={classes.formbutton}
				>
					<LinkTo kind='component-api-signin' story='sign-in'>
						Cancel
					</LinkTo>
				</Button>
			</div>
			<DeleteDialog
				open={openConfirmDeleteDialog}
				onClose={() => {
					setOpenConfirmDeleteDialog(false)
				}}
				// onAgree={onAgreeDeleteAnUser}
				onDisagree={() => {
					setOpenConfirmDeleteDialog(false)
				}}
			/>
		</Box>
	)
}

export default FormEditor
