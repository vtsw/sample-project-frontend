import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { InfiniteScroll } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	table__header: {
		padding: '14px 14px 14px 34px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
		borderBottom: `1px solid ${theme.palette.common.gray}`,
	},
	table__header__item: {
		fontWeight: 600,
	},
}))

const LargeTable = props => {
	const { items, columns, loadNextPage } = props
	const classes = useStyles()

	const [loadingMore, setLoadingMore] = useState(false)

	const _loadNextPage = async () => {
		setLoadingMore(true)
		let promise = new Promise(function(resolve) {
			loadNextPage(resolve)
		})

		promise.then(() => {
			setLoadingMore(false)
		})
	}

	return (
		<Box className={classes.root}>
			<Grid container className={classes.table__header}>
				{columns.map(column => (
					<Grid item xs={column.xs} key={column.headerVariable}>
						<Typography variant='body2' className={classes.table__header__item}>
							{column.headerLabel}
						</Typography>
					</Grid>
				))}
			</Grid>
			<Box className={classes.root}>
				{items.length > 0 && (
					<InfiniteScroll
						{...props}
						loadNextPage={_loadNextPage}
						isNextPageLoading={loadingMore}
					/>
				)}
			</Box>
		</Box>
	)
}

export default LargeTable
