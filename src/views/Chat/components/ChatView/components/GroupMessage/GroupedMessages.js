import { Box, makeStyles } from '@material-ui/core'

import MessageCard from '../MessageCard'
import React from 'react'
import { Avatar } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	root__groupmessage: ({ reverseRow }) => ({
		display: 'flex',
		width: '100%',
		flexDirection: reverseRow ? 'row-reverse' : 'row',
	}),
	root__message: {
		width: '100%',
	},
	root__avatar: {
		display: 'flex',
		alignItems: 'flex-end',
		marginBottom: theme.spacing(1 / 2),
	},
}))

const GroupedMessages = props => {
	const { items, meId, endOfGroup } = props

	const classes = useStyles({ reverseRow: items && meId === items[0].from.id })

	return (
		<Box className={classes.root}>
			{
				<Box className={classes.root__groupmessage}>
					{' '}
					<Box className={classes.root__avatar}>
						<Avatar size={40} avatar={items[0].from.avatar} />
					</Box>
					<Box className={classes.root__message}>
						{items.map((item, index) => (
							<MessageCard
								{...item}
								key={index}
								meId={meId}
								endOfList={endOfGroup && index === items.length - 1}
								fromMe={meId === items[0].from.id}
							/>
						))}
					</Box>
				</Box>
			}
		</Box>
	)
}

export default GroupedMessages
