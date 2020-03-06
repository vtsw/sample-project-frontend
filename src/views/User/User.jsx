import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import SignUp from '@components/SignUp'
import SearchBox from '@components/SearchBox'
import CVTable from '@components/CVTable'
import { WelcomeDialog } from './components'

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
		padding: theme.spacing(2.5),
	},
	sign_up__container: {
		display: 'flex',
		alignItems: 'center',
		border: `2px solid ${theme.palette.divider}`,
		marginRight: 8,
		position: 'relative',
	},
	user_list__container: {
		border: `2px solid ${theme.palette.divider}`,
		marginLeft: 8,
		overflow: 'hidden',
	},
	searchbox: {
		width: '100%',
		padding: theme.spacing(2.5),
	},
	searchbox__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
}))

const User = () => {
	const classes = useStyles()
	const [dialogVisible, setDialogVisible] = useState(true)
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
						<SignUp />
					</Box>
				</Grid>
				<Grid item xs={8}>
					<Box
						className={clsx(classes.user_list__container, classes.full_height)}
					>
						<Box className={classes.searchbox}>
							<Typography variant='h6' className={classes.searchbox__title}>
								User List
							</Typography>
							<SearchBox width={400} />
						</Box>
						<CVTable />
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

User.propsTypes = {}

export default User
