import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import SignUp from '@components/SignUp'
import SearchBox from '@components/SearchBox'
import CVTable from '@components/CVTable'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	fullscreenheight: {
		height: '100vh',
	},
	fullheight: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(2.5),
	},
	signup__container: {
		display: 'flex',
		alignItems: 'center',
		border: `2px solid ${theme.palette.divider}`,
		marginRight: 8,
	},
	userlist__container: {
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
	return (
		<Box className={classes.root}>
			<Grid
				container
				className={clsx(classes.fullscreenheight, classes.container)}
			>
				<Grid item xs={4}>
					<div className={clsx(classes.signup__container, classes.fullheight)}>
						<SignUp />
					</div>
				</Grid>
				<Grid item xs={8}>
					<div
						className={clsx(classes.userlist__container, classes.fullheight)}
					>
						<div className={classes.searchbox}>
							<Typography variant='h6' className={classes.searchbox__title}>
								User List
							</Typography>
							<SearchBox width={400} />
						</div>
						<CVTable />
					</div>
				</Grid>
			</Grid>
		</Box>
	)
}

User.propsTypes = {}

export default User
