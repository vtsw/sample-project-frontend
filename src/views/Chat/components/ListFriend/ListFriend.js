import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import Header from './components/Header'
import ListFriendTag from './components/ListFriendTag'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		borderRight: '1px solid #e5e5e9',
	},
}))

const ListFriend = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Header />
			<ListFriendTag />
		</Box>
	)
}

export default ListFriend
