import React, { useState } from 'react'
import clsx from 'clsx'
import { Grid, makeStyles, Typography, Box } from '@material-ui/core'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { DeleteDialog, ModifyDialog } from '../../../components'

const useStyles = makeStyles(theme => ({
	container: ({ active }) => ({
		background: active && theme.palette.common.gray,
		padding: '8px 16px',
		height: '40px',
	}),
	item: {
		padding: '6px 8px',
		height: '40px',
	},
	typography: {
		fontWeight: 'bold',
	},
	typography_email: {
		marginLeft: '12px',
	},
	icon: {
		fontSize: '18px',
		color: theme.palette.common.gray,
		cursor: 'pointer',
	},
	container__icon__typography: {
		alignItems: 'center',
	},
}))

const DetailUser = ({ onClick, email, name }) => {
	// const classes = useStyles({ active: itemChosen.id === id });
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [openConfirmModify, setOpenConfirmModify] = useState(false)
	const classes = useStyles()
	return (
		<Box>
			<Grid
				container
				className={classes.container}
				onClick={() => {
					onClick && onClick()
					setOpenConfirmModify(true)
				}}
			>
				<Grid xs={5} container className={classes.container__icon__typography}>
					<CancelRoundedIcon
						className={classes.icon}
						onClick={e => {
							e.stopPropagation()
							setOpenConfirmDelete(true)
						}}
					/>
					<Typography
						variant='caption'
						className={clsx(classes.typography, classes.typography_email)}
					>
						{email}
					</Typography>
				</Grid>
				<Grid item xs={7} className={classes.typography}>
					{name}
				</Grid>
			</Grid>
			<DeleteDialog
				open={openConfirmDelete}
				onClose={() => {
					setOpenConfirmDelete(false)
				}}
				onAgree={() => {
					setOpenConfirmDelete(false)
				}}
				onDissagree={() => {
					setOpenConfirmDelete(false)
				}}
			/>
			<ModifyDialog
				open={openConfirmModify}
				onClose={() => {
					setOpenConfirmModify(false)
				}}
				onAgree={() => {
					setOpenConfirmModify(false)
				}}
				onDissagree={() => {
					setOpenConfirmModify(false)
				}}
			/>
		</Box>
	)
}

export default DetailUser
