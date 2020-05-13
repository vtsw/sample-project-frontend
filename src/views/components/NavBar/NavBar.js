import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { RESET_CACHE } from './gql/mutation'

import NavBarItem from './NavBarItem'

import { deleteToken } from '@src/shares/utils'
import { initialState } from '@src/client'
import { ON_ZALO_MESSAGE_RECEIVED } from '@views/Chat/gql/subscription'
import { GET_NEW_NOTI_MESSAGE_LIST } from '@views/Chat/gql/query'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},
	tab: {
		position: 'relative',
		fontSize: theme.typography.htmlFontSize,
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.common.white,
		cursor: 'pointer',
		padding: theme.spacing(3, 1.5),
		textAlign: 'center',
		transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
		'&:last-child': {
			position: 'absolute',
			bottom: 0,
		},
	},
}))

const navbarItems = [
	{ page: 'main', pathname: '/' },
	{ page: 'user', pathname: '/user' },
	{ page: 'message', pathname: '/message' },
	{ page: 'file', pathname: '/file' },
	{ page: 'chat', pathname: '/chat' },
]

const NavBar = props => {
	const { location = { pathname: '' }, history } = props
	const classes = useStyles()

	const [currentPage, setCurrentPage] = useState(location.pathname)

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
			newNotiMessageList: { items },
		},
	} = useQuery(GET_NEW_NOTI_MESSAGE_LIST)

	const sumNewNotiMessageNumber = items.reduce((acc, cur) => {
		return cur.numberNoti + acc
	}, 0)

	const [resetCache, { client }] = useMutation(RESET_CACHE, {
		onCompleted: async () => {
			deleteToken()
			handleOnChangePage('/sign-in')
			await client.resetStore()
			client.writeData({ data: initialState })
		},
		onError: err => alert(err),
	})

	const handleOnChangePage = page => {
		setCurrentPage(page)
		history.push(page)
	}

	const handleOnLogOut = () => {
		resetCache({ variables: { data: initialState } })
	}

	return (
		<ul className={classes.root}>
			{navbarItems.map((item, index) => (
				<NavBarItem
					key={index}
					handleOnChangePage={handleOnChangePage}
					numberNoti={sumNewNotiMessageNumber}
					currentPage={currentPage}
					{...item}
				/>
			))}
			<li className={classes.tab} onClick={handleOnLogOut}>
				Logout
			</li>
		</ul>
	)
}

export default withRouter(NavBar)

export { NavBar }
