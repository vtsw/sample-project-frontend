import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import DetailUser from '../DetailUser'
import clsx from 'clsx'

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

const useStyles = makeStyles(theme => ({
	header: {
		padding: '8px 16px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
		borderBottom: `1px solid ${theme.palette.common.gray}`,
	},
	item: {
		padding: '6px 16px',
	},
	table: {
		overflowY: 'overlay',
		height: 'calc(100vh - 150px)',
		flexWrap: 'nowrap',
	},
	container: {
		border: `1px solid ${theme.palette.common.gray}`,
		height: '100%',
	},
	typography: {
		fontWeight: 'bold',
	},
	typography_email: {
		padding: '16px',
	},
	container__typography: {
		marginLeft: '12px',
	},
	icon: {
		fontSize: '18px',
		color: 'white',
		pointerEvents: 'none',
	},
	container__icon__typography: {
		alignItems: 'flex-end',
	},
}))

export default function ListDetailUsers() {
	const classes = useStyles()
	return (
		<Grid
			container
			alignItems='stretch'
			className={classes.container}
			direction='column'
		>
			<Grid item>
				<Typography
					variant='h5'
					className={clsx(classes.typography, classes.typography_email)}
				>
					Total {arr.length}
				</Typography>
			</Grid>
			<Grid container className={classes.header}>
				<Grid xs={5} container className={classes.container__icon__typography}>
					<CancelRoundedIcon className={classes.icon} />
					<Typography
						variant='caption'
						className={clsx(classes.typography, classes.container__typography)}
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
				{arr.map(item => (
					<DetailUser
						key={item.id}
						{...item}
						// onClick={() => setitemChosen(item)}
						// itemChosen={itemChosen}
					/>
				))}
			</Grid>
		</Grid>
	)
}
