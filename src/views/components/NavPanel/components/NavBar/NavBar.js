import React, { useState } from 'react'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { ON_ZALO_MESSAGE_RECEIVED } from '@views/Chat/gql/subscription'
import { GET_NEW_NOTI_MESSAGE_LIST } from '@views/Chat/gql/query'
import NavBarItem from '../NavBarItem'
import { useSubscription, useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
		width: 80,
	},
	tab: {
		position: 'relative',
		color: theme.palette.common.white,
		width: '100%',
		cursor: 'pointer',
		padding: `28px 12px`,
		textTransform: 'lowercase',
		borderRadius: 0,
		'&>span': {
			fontWeight: theme.typography.fontWeightBold,
		},
	},
	active: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
		'&:hover': {
			backgroundColor: theme.palette.common.white,
		},
	},
}))

const NavBar = props => {
	const { location = { pathname: '' }, history, items } = props
	const classes = useStyles()

	const [currentPage, setCurrentPage] = useState(location.pathname || {})

	const { data } = useSubscription(ON_ZALO_MESSAGE_RECEIVED, {
		onSubscriptionData: ({
			subscriptionData: {
				data: { onZaloMessageReceived },
			},
			client,
		}) => {
			if (!onZaloMessageReceived) return

			const { newNotiMessageList } = client.readQuery({
				query: GET_NEW_NOTI_MESSAGE_LIST,
			})

			const findConversation = newNotiMessageList.items.find(
				noti => noti.fromInterestedId === onZaloMessageReceived.from.id
			)

			let updateNewNotiMessageList = {
				...newNotiMessageList,
				items: findConversation
					? newNotiMessageList.items.map(noti => {
							if (noti.fromInterestedId === onZaloMessageReceived.from.id)
								return {
									...noti,
									lastMessage: onZaloMessageReceived.content,
									numberNoti: noti.numberNoti + 1,
								}
							return noti
					  })
					: [
							...newNotiMessageList.items,
							{
								fromInterestedId: onZaloMessageReceived.from.id,
								lastMessage: onZaloMessageReceived.content,
								numberNoti: 1,
								__typename: 'NewNotiMessage',
							},
					  ],
			}

			const sumNewMessage = updateNewNotiMessageList.items.reduce(
				(acc, cur) => {
					return cur.numberNoti + acc
				},
				0
			)

			document.title = `(${sumNewMessage}) CleVer Dashboard`

			client.writeData({
				data: { newNotiMessageList: updateNewNotiMessageList },
			})
		},
	})

	const {
		data: {
			newNotiMessageList: { items: notiItems },
		},
	} = useQuery(GET_NEW_NOTI_MESSAGE_LIST)

	const sumNewNotiMessageNumber = notiItems.reduce((acc, cur) => {
		return cur.numberNoti + acc
	}, 0)

	const handleOnChangePage = page => {
		setCurrentPage(page)
		history.push(page)
	}

	const setActiveTab = pathname => {
		return currentPage === pathname ? classes.active : ''
	}

	return (
		<Grid className={classes.root}>
			{items.map((item, index) => (
				<NavBarItem
					key={index}
					handleOnChangePage={handleOnChangePage}
					numberNoti={sumNewNotiMessageNumber}
					styles={clsx(classes.tab, setActiveTab(item.pathname))}
					{...item}
				/>
			))}
		</Grid>
	)
}

export default NavBar
