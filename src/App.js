// import { hot } from 'react-hot-loader/root'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from '@components/navbar'

import { Button } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	title: {
		color: 'red',
	},
}))

const App = () => {
	const classes = useStyles()
	return (
		<div>
			<Button variant='contained' color='primary' className={classes.title}>
				Click
			</Button>
			<NavBar />
		</div>
	)
}

export default App
