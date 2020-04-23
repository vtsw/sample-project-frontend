import React from 'react'
import ChatView from './components/ChatView'
import ListFriend from './components/ListFriend'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	root__listfriend: {
		width: 332,
	},
	root__chatview: {
		display: 'flex',
		flex: 1,
	},
}))

const Chat = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Box className={classes.root__listfriend}>
				<ListFriend />
			</Box>
			<Box className={classes.root__chatview}>
				<ChatView />
			</Box>
		</Box>
	)
}

export default Chat
