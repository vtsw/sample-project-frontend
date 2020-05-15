import { Box, makeStyles } from '@material-ui/core'

import {
	MessageCard,
	MessageReservation,
} from '@views/Chat/components/ChatView/components'
import React from 'react'
import { Avatar } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	groupmessage: ({ reverseRow }) => ({
		display: 'flex',
		width: '100%',
		flexDirection: reverseRow ? 'row-reverse' : 'row',
	}),
	message: {
		width: '100%',
	},
	avatar: {
		display: 'flex',
		alignItems: 'flex-end',
		marginBottom: theme.spacing(1 / 2),
	},
}))

const renderMessage = item => {
	switch (item.type) {
		case 'reservation':
			return <MessageReservation {...item} />

		default:
			return <MessageCard {...item} />
	}
}

const GroupedMessages = props => {
	const { items, meId, endOfGroup } = props

	const classes = useStyles({ reverseRow: items && meId === items[0].from.id })

	return (
		<Box className={classes.root}>
			{
				<Box className={classes.groupmessage}>
					<Box className={classes.avatar}>
						<Avatar size={40} avatar={items[0].from.avatar} />
					</Box>
					<Box className={classes.message}>
						{items.map((item, index) =>
							renderMessage({
								...item,
								key: index,
								meId,
								endOfList: endOfGroup && index === items.length - 1,
								fromMe: meId === items[0].from.id,
							})
						)}
					</Box>
				</Box>
			}
		</Box>
	)
}

export default GroupedMessages
