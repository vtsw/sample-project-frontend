import React from 'react'
import clsx from 'clsx'

import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	root: ({ style, index }) => ({
		...style,
		backgroundColor:
			index % 2 === 0 ? theme.palette.common.white : theme.palette.grey['300'],
		padding: '14px 14px 14px 34px',
		cursor: 'pointer',
	}),
	item__active: {
		backgroundColor: `${theme.palette.common.blue} !important`,
	},
	item__closeicon: {
		position: 'absolute',
		top: 16,
		left: 10,
		zIndex: 1,
		color: theme.palette.common.white,
		cursor: 'pointer',
		fontSize: '1rem',
		border: '1px solid transparent',
		backgroundColor: theme.palette.grey['300'],
		borderRadius: '50%',
		padding: 1,
	},
	columns__item: {
		display: 'flex',
		alignItems: 'center',
	},
	columns__item__typo: {
		width: '95%',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		fontWeight: 700,
	},
}))

const Row = props => {
	const { forwardedRef, index, data, style } = props
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

	const classes = useStyles({ style, index })
	let item

	if (!isItemLoaded(index)) {
		return 'Loading...'
	} else {
		item = items[index]
	}

	return (
		<Grid
			data-testid={`row-${item.id}`}
			container
			className={clsx(
				classes.root,
				selectedRow.id === item.id ? classes.item__active : ''
			)}
			ref={forwardedRef}
			onClick={() => onClickRow(item)}
		>
			{isIconClose && (
				<Close
					data-testid={`row-closeicon-${item.id}`}
					className={classes.item__closeicon}
					onClick={e => {
						e.stopPropagation()
						handleDeleteRow(item)
					}}
				/>
			)}
			{columns.map(column => (
				<Grid item xs={column.xs} key={column.headerVariable}>
					<Box className={classes.columns__item}>
						<Typography variant='body2' className={classes.columns__item__typo}>
							{item[column.headerVariable]}
						</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	)
}

export default Row
