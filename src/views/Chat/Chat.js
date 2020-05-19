import React from 'react'
import ChatView from './components/ChatView'
import ListFriend from './components/ListFriend'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { GET_SELECTED_USER_OF_CHAT } from './gql/query'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
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
	root__chatview__welcome: {
		textAlign: 'center',
		margin: 'auto',
		width: 500,
	},
	textwelcome: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: theme.spacing(4),
	},
	textdescription: {
		fontSize: 14,
	},
}))

const Chat = () => {
	const classes = useStyles()

	const {
		data: { selectedUserOfChat },
	} = useQuery(GET_SELECTED_USER_OF_CHAT)
	return (
		<Box className={classes.root}>
			<Box className={classes.root__listfriend}>
				<ListFriend />
			</Box>
			<Box className={classes.root__chatview}>
				{selectedUserOfChat.id ? (
					<ChatView selectedUserOfChat={selectedUserOfChat} />
				) : (
					<Box className={classes.root__chatview__welcome}>
						<Typography className={classes.textwelcome}>
							Chào mừng đến với Clever
						</Typography>
						<Typography className={classes.textdescription}>
							Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
							thân, bạn bè được tối ưu hoá cho máy tính của bạn.
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default Chat
