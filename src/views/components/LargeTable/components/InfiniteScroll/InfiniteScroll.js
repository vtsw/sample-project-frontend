import React from 'react'
import { DynamicSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import { makeStyles } from '@material-ui/core'
import Row from '../Row'

const useStyles = makeStyles(() => ({
	overflow: {
		overflow: 'overlay !important',
	},
}))

const RefForwarder = React.forwardRef((props, ref) => (
	<Row forwardedRef={ref} {...props} />
))

const InfiniteScroll = ({
	hasNextPage,
	isNextPageLoading,
	loadNextPage,
	items = [],
	columns = [
		{ headerLabel: 'EMAIL', width: { xs: 1 }, headerVariable: 'email' },
	],
	onClickRow = () => {},
	isIconClose = false,
	selectedRow = {},
	handleDeleteRow = () => {},
}) => {
	const classes = useStyles()
	const itemCount = hasNextPage ? items.length + 1 : items.length
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage
	const isItemLoaded = index => !hasNextPage || index < items.length

	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
			threshold={1}
			minimumBatchSize={1}
		>
			{({ onItemsRendered, ref }) => (
				<AutoSizer>
					{({ height, width }) => (
						<List
							height={height}
							onItemsRendered={onItemsRendered}
							ref={ref}
							itemCount={items.length}
							width={width}
							className={classes.overflow}
							itemData={{
								items,
								propsRow: {
									onClickRow,
									selectedRow,
									isIconClose,
									handleDeleteRow,
									columns,
									isItemLoaded,
								},
							}}
						>
							{RefForwarder}
						</List>
					)}
				</AutoSizer>
			)}
		</InfiniteLoader>
	)
}
export default InfiniteScroll