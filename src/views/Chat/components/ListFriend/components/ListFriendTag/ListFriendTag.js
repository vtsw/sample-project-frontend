import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import FriendTag from '../FriendTag/FriendTag'
import Filter from '../Filter/Filter'
import { GET_NEW_NOTI_MESSAGE_LIST, GET_USER_INFO } from '../../../../gql/query'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	root__listfriend: {
		width: '332px',
	},
	root__chatview: {
		display: 'flex',
		flex: 1,
	},
}))

const ListFriendTag = () => {
	const classes = useStyles()

	const { data } = useQuery(GET_USER_INFO)
	const {
		data: {
			newNotiMessageList: { items },
		},
		loading,
	} = useQuery(GET_NEW_NOTI_MESSAGE_LIST)
	const numberNotiOfUser = from =>
		items.find(noti => noti.fromInterestedId === from) &&
		items.find(noti => noti.fromInterestedId === from).numberNoti

	const lastNewMessageOfUser = from =>
		items.find(noti => noti.fromInterestedId === from) &&
		items.find(noti => noti.fromInterestedId === from).lastMessage

	return (
		<Box className={classes.root}>
			<Filter />
			{!loading &&
				data &&
				data.me.followers.items.map(item => (
					<FriendTag
						key={item.id}
						{...item}
						numberNoti={numberNotiOfUser(item.id)}
						lastNewMessage={lastNewMessageOfUser(item.id)}
					/>
				))}
		</Box>
	)
}

export default ListFriendTag
