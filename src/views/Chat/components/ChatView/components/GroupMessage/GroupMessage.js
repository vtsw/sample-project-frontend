import React from 'react'
import MessageCard from '../MessageCard/MessageCard'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'
import moment from 'moment'

GroupMessage.propTypes = {}

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
	root__line: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(2, 0),

		padding: '0 46px',
	},

	root__timestamp: {
		background: '#00000033',
		borderRadius: '8px',
		padding: '3px 12px',
		fontSize: '14px',
		color: 'white',
	},
	root_line1: {
		border: '0.5px solid #d2d2d2',
		display: 'flex',
		flex: 1,
		height: 1,
		marginTop: 12,
	},
	root__avatar: {
		display: 'flex',
		alignItems: 'flex-end',
		marginBottom: theme.spacing(1 / 2),
	},
}))

export default function GroupMessage({
	items,
	listPureMessage,
	type,
	timestamp,
	meId,
	endOfGroup,
}) {
	const classes = useStyles({ reverseRow: items && meId === items[0].from.id })

	return (
		<Box className={classes.root}>
			{type !== 'line' ? (
				<Box className={classes.root__groupmessage}>
					{' '}
					<Box className={classes.root__avatar}>
						<Avatar size={40} avatar={items[0].from.avatar} />
					</Box>
					<Box className={classes.root__message}>
						{items.map((item, index) => (
							<MessageCard
								{...item}
								key={item.id}
								meId={meId}
								endOfList={
									endOfGroup &&
									index === items.length - 1 &&
									items &&
									meId === items[0].from.id
								}
							/>
						))}
					</Box>
				</Box>
			) : (
				<Box className={classes.root__line}>
					<div className={classes.root_line1} />
					<Typography className={classes.root__timestamp}>
						{moment(parseInt(timestamp, 10)).format('hh:mm DD/MM/YYYY')}
					</Typography>
					<div className={classes.root_line1} />
				</Box>
			)}
		</Box>
	)
}
