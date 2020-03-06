import React, { useState } from 'react'
import { Grid, makeStyles, Typography, Box } from '@material-ui/core'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { DeleteDialog, ModifyDialog } from '../../../components'

const useStyles = makeStyles(theme => ({
	container: ({ haveBackground }) => ({
		background: haveBackground && theme.palette.common.gray,
		padding: '8px 16px',
		height: '40px',
	}),
	item: {
		padding: '6px 8px',
		height: '40px',
	},
	typography: {
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

const Message = ({ onClick, email, name, haveBackground }) => {
	const classes = useStyles({ haveBackground })
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [openConfirmModify, setOpenConfirmModify] = useState(false)
	// const classes = useStyles()
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
					<Typography variant='caption' className={classes.typography}>
						{email}
					</Typography>
				</Grid>
				<Grid item xs={7}>
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

export default Message
