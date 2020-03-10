import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.common.white,
		padding: '14px',
		cursor: 'pointer',
		'&:nth-child(2n)': {
			backgroundColor: theme.palette.common.gray,
		},
	},
	item__left__container: {
		display: 'flex',
		alignItems: 'center',
	},
	item__left: {
		marginLeft: theme.spacing(1.5),
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
	item__active: {
		backgroundColor: `${theme.palette.common.blue} !important`,
	},
	item_bold: {
		fontWeight: 700,
	},
}))

const CVTableItem = ({
	id,
	email,
	name,
	hasCloseIcon,
	selectedItem,
	setSelectedItem,
	setDeleteDialogVisible,
}) => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={clsx(
				classes.root,
				selectedItem.id === id ? classes.item__active : ''
			)}
			onClick={() => setSelectedItem({ id, email, name })}
		>
			<Grid item xs={5}>
				<Box className={classes.item__left__container}>
					{hasCloseIcon ? (
						<CloseIcon
							className={classes.item__close_icon}
							onClick={e => {
								e.stopPropagation()
								setDeleteDialogVisible(true)
							}}
						/>
					) : null}
					<Typography
						variant='body2'
						className={clsx(classes.item__left, classes.item_bold)}
					>
						{email}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={7}>
				<Typography variant='body2' className={classes.item_bold}>
					{name}
				</Typography>
			</Grid>
		</Grid>
	)
}

CVTableItem.propsTypes = {
	id: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	hasCloseIcon: PropTypes.bool,
	selectedItem: PropTypes.object,
	setSelectedItem: PropTypes.func,
	setDeleteDialogVisible: PropTypes.func,
}

export default CVTableItem
