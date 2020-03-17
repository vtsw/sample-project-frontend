import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { CancelRounded } from '@material-ui/icons'
import Message from '../Message'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
	},
	typography: {
		fontWeight: 700,
	},
	container__typography: {
		marginLeft: '12px',
		fontWeight: 700,
	},
	icon: {
		fontSize: '18px',
		color: theme.palette.common.white,
		pointerEvents: 'none',
	},
	container__icon__typography: {
		alignItems: 'flex-end',
	},
	header: {
		padding: '8px 16px',
		borderTop: `1px solid #979797`,
		borderBottom: `1px solid #979797`,
	},
	item: {
		padding: '6px 16px',
	},
	table: {
		overflowY: 'overlay',
		height: 'calc(100vh - 270px)',
		flexWrap: 'nowrap',
	},
}))

const ListMessage = ({
	messageList,
	handleDeleteMessage,
	handleUpdateMessage,
}) => {
	const classes = useStyles()

	return (
		<Grid
			container
			alignItems='stretch'
			className={classes.root}
			direction='column'
		>
			<Grid container className={classes.header}>
				<Grid xs={5} container className={classes.container__icon__typography}>
					<CancelRounded className={classes.icon} />
					<Typography
						variant='caption'
						className={classes.container__typography}
					>
						DATE
					</Typography>
				</Grid>

				<Grid item xs={7}>
					<Typography variant='caption' className={classes.typography}>
						TEXT
					</Typography>
				</Grid>
			</Grid>
			<Grid container className={classes.table} direction='column'>
				{messageList.items.map((item, index) => (
					<Message
						key={item.id}
						{...item}
						haveBackground={index % 2}
						handleDeleteMessage={handleDeleteMessage}
						handleUpdateMessage={handleUpdateMessage}
					/>
				))}
			</Grid>
		</Grid>
	)
}

export default ListMessage
