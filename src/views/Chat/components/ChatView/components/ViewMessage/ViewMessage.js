import React, { useEffect, useState, useRef } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useMutation } from '@apollo/react-hooks'

import { SET_STATUS_READED_MESSAGE } from '@views/Chat/gql/mutation'

import GroupMessage from '../GroupMessage/GroupMessage'
import { convertData } from './helperViewMessage'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		height: '100%',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: theme.palette.common.light,
	},
	table: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',
		padding: '26px 16px',
		position: 'relative',
	},

	loadmore: {
		position: 'absolute',
		width: '100%',
		top: '0',
		left: '0',
		paddingTop: 6,
		textAlign: 'center',
	},
	button: {
		position: 'absolute',
		bottom: 40,
		right: 40,
		width: 40,
		height: 40,
	},
	button__newmessage: {
		position: 'absolute',
		top: -4,
		right: -4,
		background: 'red',
		color: 'white',
		fontSize: 10,
		borderRadius: '50%',
		width: 16,
		height: 16,
	},
}))

const ViewMessage = props => {
	const {
		items,
		hasNext,
		selectedUserOfChatId,
		handleFetchMore,
		loadMore,
		me,
	} = props
	const [haveNewMessage, setHaveNewMessage] = useState(0)
	const [oldScrollHeight, setOldScrollHeight] = useState(0)
	const [lastScrollTop, setLastScrollTop] = useState(0)
	const classes = useStyles()

	const refTable = useRef()

	useEffect(() => {
		const scrollTable = document.getElementById('scroll-reverse')
		scrollTable.scrollTop = scrollTable.scrollHeight
	}, [selectedUserOfChatId])

	useEffect(() => {
		// When data items change, viewMessage will re-render and this useEffect will be last called.
		// This is place to change scroll of div

		const scrollTable = document.getElementById('scroll-reverse')

		if (oldScrollHeight && lastScrollTop < 20) {
			scrollTable.scrollTop = scrollTable.scrollHeight - oldScrollHeight
		} else {
			if (items[0].from.id === me.id) {
				scrollTable.scrollTop = scrollTable.scrollHeight
			} else {
				if (
					scrollTable.offsetHeight + scrollTable.scrollTop + 100 >=
					scrollTable.scrollHeight
				) {
					scrollTable.scrollTop = scrollTable.scrollHeight
				} else {
					setHaveNewMessage(haveNewMessage => haveNewMessage + 1)
				}
			}
		}

		setOldScrollHeight(scrollTable.scrollHeight)
	}, [items])

	const [setStatusReadedMessage] = useMutation(SET_STATUS_READED_MESSAGE)

	const dataAfterConvert = convertData(items, me.id)

	const handleScrollNewMessage = () => {
		setHaveNewMessage(0)
		const scrollTable = document.getElementById('scroll-reverse')
		scrollTable.scrollTop = scrollTable.scrollHeight
	}

	const handleOnScroll = e => {
		let st = e.target.scrollTop
		if (e.target.scrollTop < 20 && !loadMore && hasNext) {
			handleFetchMore()
		}
		if (
			e.target.offsetHeight + e.target.scrollTop + 100 >=
			e.target.scrollHeight
		) {
			setHaveNewMessage(0)
			setStatusReadedMessage({
				variables: {
					readedMessage: {
						fromInterestedId: items[0].from.id,
					},
				},
			})
		}
		setLastScrollTop(st)
	}

	return (
		<Box className={classes.root}>
			<div
				className={classes.table}
				id='scroll-reverse'
				onScroll={handleOnScroll}
				ref={refTable}
			>
				{loadMore && (
					<div className={classes.loadmore}>
						<CircularProgress size={20} />
					</div>
				)}
				{dataAfterConvert.map((item, index) => (
					<GroupMessage
						{...item}
						key={item.id}
						meId={me.id}
						listPureMessage={items}
						endOfGroup={index === dataAfterConvert.length - 1}
					/>
				))}
			</div>
			{haveNewMessage !== 0 && (
				<Fab
					color='primary'
					aria-label='add'
					className={classes.button}
					onClick={handleScrollNewMessage}
				>
					<KeyboardArrowDownIcon />
					<div className={classes.button__newmessage}>{haveNewMessage}</div>
				</Fab>
			)}
		</Box>
	)
}

export default ViewMessage
