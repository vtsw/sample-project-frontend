import React, { useEffect, useState, useRef } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import GroupMessage from '../GroupMessage/GroupMessage'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useMutation } from '@apollo/react-hooks'
import { SET_STATUS_READED_MESSAGE } from '@views/Chat/gql/mutation'

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
	root__table: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',
		padding: '26px 16px',
		position: 'relative',
	},

	root__loadmore: {
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

const convertBreakingLine = (arr, limitTime) => {
	return arr.reduce((acc, cur, index) => {
		if (index === 0) {
			acc.push({
				type: 'line',
				timestamp: arr[index].timestamp,
				id: arr[index].timestamp + 'id',
				content: arr[index].content,
				first: 'first',
			})
		}
		acc.push(cur)

		if (
			index !== arr.length - 1 &&
			Math.abs(cur.timestamp - arr[index + 1].timestamp) > limitTime
		) {
			acc.push({
				type: 'line',
				timestamp: arr[index + 1].timestamp,
				id: arr[index + 1].timestamp + 'id',
				content: arr[index + 1].content,
			})
		}
		return acc
	}, [])
}

const convertData = (arr, key) => {
	let tempIU = []
	let tempOA = []

	return arr.reduce((acc, cur, index) => {
		if (cur.type === 'line') {
			if (tempIU.length > 0) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })

				tempIU = []
			}
			if (tempOA.length > 0) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })

				tempOA = []
			}
			acc.push(cur)
		} else if (cur.from.id === key) {
			tempIU.push(cur)
			if (tempOA.length > 0) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })
				tempOA = []
			}
			if (index === arr.length - 1) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })
			}
		} else {
			tempOA.push(cur)
			if (tempIU.length) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })
				tempIU = []
			}
			if (index === arr.length - 1) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })
			}
		}

		return acc
	}, [])
}

let oldScrollHeight = 0
let lastScrollTop = 0

const ViewMessage = ({
	items,
	hasNext,
	selectedUserOfChatId,
	handleFetchMore,
	loadMore,
	me,
}) => {
	const [haveNewMessage, setHaveNewMessage] = useState(0)
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

		oldScrollHeight = scrollTable.scrollHeight
	}, [items])

	const [setStatusReadedMessage] = useMutation(SET_STATUS_READED_MESSAGE)

	const dataAfterConvert = convertData(
		convertBreakingLine([].concat(items).reverse(), 6000000),
		me.id
	)

	const handleScrollNewMessage = () => {
		setHaveNewMessage(0)
		const scrollTable = document.getElementById('scroll-reverse')
		scrollTable.scrollTop = scrollTable.scrollHeight
	}

	return (
		<Box className={classes.root}>
			<div
				className={classes.root__table}
				id='scroll-reverse'
				onScroll={e => {
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
					lastScrollTop = st
				}}
				ref={refTable}
			>
				{loadMore && (
					<div className={classes.root__loadmore}>
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
