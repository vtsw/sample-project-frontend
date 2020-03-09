import React, { useState } from 'react'
import clsx from 'clsx'
import { Grid, makeStyles, Typography, Box } from '@material-ui/core'
import { CancelRounded } from '@material-ui/icons'
import { DeleteDialog, ModifyDialog } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: ({ active }) => ({
		background: active && theme.palette.common.gray,
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
		height: 40,
	}),
	item: {
		padding: `6px ${theme.spacing(1)}px`,
		height: 40,
	},
	typography: {
		fontWeight: 700,
	},
	typography_email: {
		marginLeft: theme.spacing(1.5),
	},
	icon: {
		fontSize: 18,
		color: theme.palette.common.gray,
		cursor: 'pointer',
	},
	container__icon__typography: {
		alignItems: 'center',
	},
}))

const DetailUser = ({ onClick, email, name }) => {
	// const classes = useStyles({ active: itemChosen.id === id });
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
	const [openConfirmModifyDialog, setOpenConfirmModifyDialog] = useState(false)
	const classes = useStyles()
	return (
		<Box>
			<Grid
				container
				className={classes.root}
				onClick={() => {
					onClick && onClick()
					setOpenConfirmModifyDialog(true)
				}}
			>
				<Grid xs={5} container className={classes.container__icon__typography}>
					<CancelRounded
						className={classes.icon}
						onClick={e => {
							e.stopPropagation()
							setOpenConfirmDeleteDialog(true)
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
				open={openConfirmDeleteDialog}
				onClose={() => {
					setOpenConfirmDeleteDialog(false)
				}}
				onAgree={() => {
					setOpenConfirmDeleteDialog(false)
				}}
				onDisagree={() => {
					setOpenConfirmDeleteDialog(false)
				}}
			/>
			<ModifyDialog
				open={openConfirmModifyDialog}
				onClose={() => {
					setOpenConfirmModifyDialog(false)
				}}
				onAgree={() => {
					setOpenConfirmModifyDialog(false)
				}}
				onDisagree={() => {
					setOpenConfirmModifyDialog(false)
				}}
			/>
		</Box>
	)
}

export default DetailUser
