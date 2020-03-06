import React, { useState } from 'react'
import { Grid, makeStyles, Typography, Box } from '@material-ui/core'
import { CancelRounded } from '@material-ui/icons'
import { DeleteDialog, ModifyDialog } from '@views_components'

const useStyles = makeStyles(theme => ({
	container: ({ haveBackground }) => ({
		background: haveBackground && theme.palette.common.gray,
		padding: '8px 16px',
		height: 40,
	}),
	item: {
		padding: '6px 8px',
		height: 40,
	},
	typography: {
		fontWeight: 700,
	},
	typography_email: {
		marginLeft: '12px',
		fontWeight: 700,
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
					<CancelRounded
						className={classes.icon}
						onClick={e => {
							e.stopPropagation()
							setOpenConfirmDelete(true)
						}}
					/>
					<Typography variant='caption' className={classes.typography_email}>
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
				onDisagree={() => {
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
				onDisagree={() => {
					setOpenConfirmModify(false)
				}}
			/>
		</Box>
	)
}

export default Message
