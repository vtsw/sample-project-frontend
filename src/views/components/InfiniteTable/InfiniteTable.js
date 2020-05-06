import React from 'react'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteScroll } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	container__header: {
		padding: '14px 14px 14px 34px',
		borderTop: `1px solid ${theme.palette.grey['300']}`,
		borderBottom: `1px solid ${theme.palette.grey['300']}`,
	},
	item__header: {
		fontWeight: 600,
	},
}))

const InfiniteTable = props => {
	const { items = [], columns, loadNextPage, loadingMore } = props
	const classes = useStyles()

	return (
		<Box data-testid='infinitetable' className={classes.root}>
			<Grid container className={classes.container__header}>
				{columns.map(column => (
					<Grid item xs={column.xs} key={column.headerVariable}>
						<Typography
							data-testid={`tableheader-${column.headerVariable}`}
							variant='body2'
							className={classes.item__header}
						>
							{column.headerLabel}
						</Typography>
					</Grid>
				))}
			</Grid>
			<Box className={classes.root}>
				{items.length > 0 && (
					<InfiniteScroll
						{...props}
						loadNextPage={loadNextPage}
						isNextPageLoading={loadingMore}
					/>
				)}
			</Box>
		</Box>
	)
}

export default InfiniteTable
