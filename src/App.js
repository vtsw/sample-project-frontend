// import { hot } from 'react-hot-loader/root'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from '@components/navbar'

import { Button, Grid } from '@material-ui/core'
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
	title: {
		color: 'red',
	},
}))

const App = () => {
	const classes = useStyles()
	return (
		<Grid container>
			<Button variant='contained' color='primary' className={classes.title}>
				Click
			</Button>
			<AccessAlarm />
			<ThreeDRotation />
			<NavBar />
		</Grid>
	)
}

export default App
