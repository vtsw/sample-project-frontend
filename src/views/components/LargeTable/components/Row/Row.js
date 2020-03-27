import React from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
	root: ({ style, index }) => ({
		...style,
		backgroundColor:
			index % 2 === 0 ? theme.palette.common.white : theme.palette.common.gray,
		padding: '14px 14px 14px 34px',
		cursor: 'pointer',
	}),

	item__left__container: {
		display: 'flex',
		alignItems: 'center',
	},

	item__close_icon: {
		position: 'absolute',
		top: 16,
		left: 10,
		zIndex: 1,
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
	text_overflow: {
		width: '100%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}))

const Row = props => {
	const { forwardedRef, index, data, style } = props
	const classes = useStyles({ style, index })
	const {
		items,
		propsRow: {
			columns,
			selectedRow,
			onClickRow,
			isIconClose,
			handleDeleteRow,
			isItemLoaded,
		},
	} = data

	let item
	if (!isItemLoaded(index)) {
		return 'Loading...'
	} else {
		item = items[index]
	}

	return (
		<Grid
			container
			className={clsx(
				classes.root,
				selectedRow.id === item.id ? classes.item__active : ''
			)}
			ref={forwardedRef}
			onClick={() => onClickRow(item)}
		>
			{isIconClose && (
				<CloseIcon
					className={classes.item__close_icon}
					onClick={e => {
						e.stopPropagation()
						handleDeleteRow(item)
					}}
				/>
			)}
			{columns.map(column => (
				<Grid item xs={column.xs} key={column.headerVariable}>
					<Box className={classes.item__left__container}>
						<Typography
							variant='body2'
							className={clsx(classes.item_bold, classes.text_overflow)}
						>
							{item[column.headerVariable]}
						</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	)
}

export default Row
