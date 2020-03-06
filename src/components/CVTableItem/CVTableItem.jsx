import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.common.white,
		padding: '12px',
		height: 'auto',
		cursor: 'pointer',
		'&:nth-child(2n)': {
			backgroundColor: theme.palette.common.gray,
		},
	},
	item__date__container: {
		display: 'flex',
		alignItems: 'center',
	},
	item__date: {
		marginLeft: theme.spacing(1.5),
	},
	item__text: {
		marginLeft: theme.spacing(1.2),
	},
	item__closeicon: {
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
}))

const CVTableItem = ({
	id,
	email,
	name,
	hasCloseIcon,
	activeItem,
	setActiveItem,
}) => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={clsx(
				classes.root,
				activeItem === id ? classes.item__active : ''
			)}
			onClick={() => setActiveItem(id)}
		>
			<Grid item xs={5}>
				<Box className={classes.item__date__container}>
					{hasCloseIcon ? (
						<CloseIcon className={classes.item__closeicon} />
					) : null}
					<Typography variant='body2' className={classes.item__date}>
						{email}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={7}>
				<Typography variant='body2' className={classes.item__text}>
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
	activeItem: PropTypes.bool,
	setActiveItem: PropTypes.func,
}

export default CVTableItem
