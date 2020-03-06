import React from 'react'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Message from '../Message'

const arr = [
	{ id: 11, email: '2020/02/30', name: 'test' },
	{ id: 21, email: '2020/02/30', name: 'test' },
	{ id: 31, email: '2020/02/30', name: 'test' },
	{ id: 41, email: '2020/02/30', name: 'test' },
	{ id: 51, email: '2020/02/30', name: 'test' },
	{ id: 61, email: '2020/02/30', name: 'test' },
	{ id: 12, email: '2020/02/30', name: 'test' },
	{ id: 22, email: '2020/02/30', name: 'test' },
	{ id: 32, email: '2020/02/30', name: 'test' },
	{ id: 42, email: '2020/02/30', name: 'test' },
	{ id: 52, email: '2020/02/30', name: 'test' },
	{ id: 62, email: '2020/02/30', name: 'test' },
	{ id: 11, email: '2020/02/30', name: 'test' },
	{ id: 21, email: '2020/02/30', name: 'test' },
	{ id: 31, email: '2020/02/30', name: 'test' },
	{ id: 41, email: '2020/02/30', name: 'test' },
	{ id: 51, email: '2020/02/30', name: 'test' },
	{ id: 61, email: '2020/02/30', name: 'test' },
	{ id: 11, email: '2020/02/30', name: 'test' },
	{ id: 21, email: '2020/02/30', name: 'test' },
	{ id: 31, email: '2020/02/30', name: 'test' },
	{ id: 41, email: '2020/02/30', name: 'test' },
	{ id: 51, email: '2020/02/30', name: 'test' },
	{ id: 61, email: '2020/02/30', name: 'test' },
	{ id: 11, email: '2020/02/30', name: 'test' },
	{ id: 21, email: '2020/02/30', name: 'test' },
	{ id: 31, email: '2020/02/30', name: 'test' },
	{ id: 41, email: '2020/02/30', name: 'test' },
	{ id: 51, email: '2020/02/30', name: 'test' },
	{ id: 61, email: '2020/02/30', name: 'test' },
]

const useStyles = makeStyles(() => ({
	container_table: {
		height: '100%',
	},
	typography: {
		fontWeight: 'bold',
	},
	container__typography: {
		marginLeft: '12px',
		fontWeight: 'bold',
	},
	icon: {
		fontSize: '18px',
		color: 'white',
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

const ListMessage = () => {
	const classes = useStyles()
	return (
		<Grid
			container
			alignItems='stretch'
			className={classes.container_table}
			direction='column'
		>
			<Grid container className={classes.header}>
				<Grid xs={5} container className={classes.container__icon__typography}>
					<CancelRoundedIcon className={classes.icon} />
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
				{arr.map((item, index) => (
					<Message key={item.id} {...item} haveBackground={index % 2} />
				))}
			</Grid>
		</Grid>
	)
}

export default ListMessage
