import React from 'react'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Avatar } from '@views_components'

import {
	ImageMessage,
	FileMessage,
	TextMessage,
	ReservationMessage,
} from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	container__avatar__message: ({ reverseRow }) => ({
		display: 'flex',
		width: '100%',
		flexDirection: reverseRow ? 'row-reverse' : 'row',
	}),
	item__avatar: {
		display: 'flex',
		alignItems: 'flex-end',
		marginBottom: theme.spacing(1 / 2),
	},
	item__message: {
		width: '100%',
	},
}))

const renderMessage = item => {
	switch (item.type) {
		case 'Reservation':
			return <ReservationMessage {...item} />
		case 'Image':
		case 'Gif':
			return <ImageMessage {...item} />
		case 'File':
			return <FileMessage {...item} />
		default:
			return <TextMessage {...item} />
	}
}

const GroupMessageList = props => {
	const { items, meId, endOfGroup } = props
	const classes = useStyles({ reverseRow: items && meId === items[0].from.id })

	return (
		<Box className={classes.root}>
			<Box className={classes.container__avatar__message}>
				<Box className={classes.item__avatar}>
					<Avatar size={40} avatar={items[0].from.avatar} />
				</Box>
				<Box className={classes.item__message}>
					{items.map((item, index) =>
						renderMessage({
							...item,
							key: item.id,
							meId,
							endOfList: endOfGroup && index === items.length - 1,
							fromMe: meId === items[0].from.id,
						})
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default GroupMessageList
