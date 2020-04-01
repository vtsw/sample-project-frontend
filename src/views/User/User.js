import React, { useState } from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { FormEditor } from '@views_components'
import { WelcomeDialog, UserList } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	container: {
		padding: theme.spacing(3),
		height: '100vh',
	},
	item__signup: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
		position: 'relative',
	},
}))

const User = () => {
	const [dialogVisible, setDialogVisible] = useState(true)

	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={4}>
					<Box className={classes.item__signup}>
						{dialogVisible ? (
							<WelcomeDialog onCreateUser={() => setDialogVisible(false)} />
						) : null}
						<FormEditor />
					</Box>
				</Grid>
				<Grid item xs={8}>
					<UserList onSelectAnUser={() => setDialogVisible(false)} />
				</Grid>
			</Grid>
		</Box>
	)
}

export default User
