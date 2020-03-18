import React, { useState } from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { FormEditor } from '@views_components'
import { WelcomeDialog, UserList } from './components'

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

const User = () => {
	const [dialogVisible, setDialogVisible] = useState(true)

	const classes = useStyles()

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
						{dialogVisible ? (
							<WelcomeDialog setDialogVisible={setDialogVisible} />
						) : null}
						<FormEditor />
					</Box>
				</Grid>
				<Grid item xs={8}>
					<UserList setDialogVisible={setDialogVisible} />
				</Grid>
			</Grid>
		</Box>
	)
}

User.propsTypes = {}

export default User
