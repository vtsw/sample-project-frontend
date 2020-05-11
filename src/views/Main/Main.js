import React from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { MessageList, UserList } from './components'

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
		position: 'relative',
	},
	container__userlist__messagelist: {
		height: '100%',
		padding: theme.spacing(3),
	},
}))

const Main = () => {
	const classes = useStyle()

	return (
		<Box className={classes.root}>
			<Grid container className={classes.container__userlist__messagelist}>
				<Grid item xs={4}>
					<UserList />
				</Grid>
				<Grid item xs={8}>
					<MessageList />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Main
