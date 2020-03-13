import React, { useState } from 'react'
import { Grid, makeStyles, Typography, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { DeleteDialog, ModifyDialog } from '@views_components'

const useStyles = makeStyles(theme => ({
	container: ({ haveBackground }) => ({
		background: haveBackground && theme.palette.common.gray,
		padding: '8px 16px',
	}),
	item: {
		padding: '6px 8px',
	},
	typography: {
		fontWeight: 700,
	},
	typography_email: {
		marginLeft: '12px',
		fontWeight: 700,
	},

	container__icon__typography: {
		alignItems: 'center',
	},
	item__close_icon: {
		color: theme.palette.common.white,
		cursor: 'pointer',
		fontSize: '1rem',
		border: '1px solid transparent',
		backgroundColor: theme.palette.common.gray,
		borderRadius: '50%',
		padding: 1,
	},
}))

const Message = ({
	onClick,
	id,
	content,
	lastModified,
	haveBackground,
	handleDeleteMessage,
	handleUpdateMessage,
}) => {
	const classes = useStyles({ haveBackground })
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [openConfirmModify, setOpenConfirmModify] = useState(false)

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
					<CloseIcon
						className={classes.item__close_icon}
						onClick={e => {
							e.stopPropagation()
							setOpenConfirmDelete(true)
						}}
					/>
					<Typography variant='caption' className={classes.typography_email}>
						{lastModified}
					</Typography>
				</Grid>
				<Grid item xs={7} className={classes.typography}>
					{content}
				</Grid>
			</Grid>
			<DeleteDialog
				open={openConfirmDelete}
				onClose={() => {
					setOpenConfirmDelete(false)
				}}
				onAgree={() => {
					setOpenConfirmDelete(false)
					handleDeleteMessage(id)
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
				valueDefault={content}
				onAgree={value => {
					setOpenConfirmModify(false)
					handleUpdateMessage(id, value)
				}}
				onDisagree={() => {
					setOpenConfirmModify(false)
				}}
			/>
		</Box>
	)
}

export default Message
