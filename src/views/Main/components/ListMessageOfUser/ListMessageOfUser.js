import React, { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Typography, makeStyles } from '@material-ui/core'

import { LargeTable, DeleteDialog, ModifyDialog } from '@views_components'

import { MESSAGE_LIST } from '../../query'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '../../../Message/mutation'
import { NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		position: 'relative ',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	listtitle: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
}))

const ListMessageOfUser = props => {
	const { selectedUser } = props
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState('')
	const [message, setMessage] = useState(false)

	const { data: dataMsg, fetchMore, networkStatus } = useQuery(
		MESSAGE_LIST,

		{
			variables: {
				query: {
					userId: selectedUser && selectedUser.id,
					limit: 20,
				},
			},
			fetchPolicy: 'network-only',
			notifyOnNetworkStatusChange: true,
		}
	)

	useEffect(() => {
		if (dataMsg && dataMsg.messageList) {
			setMessage(dataMsg.messageList.items)
		}
	}, [dataMsg])

	const [deleteMsg] = useMutation(DELETE_MESSAGE, {
		onCompleted: data => {
			const update = message.filter(item => item.id !== data.deleteMessage.id)

			setMessage(update)
		},

		onError: err => {
			alert(err)
		},
	})

	const [updateMsg] = useMutation(UPDATE_MESSAGE, {
		onCompleted: ({ updateMessage }) => {
			const update = message.map(item => {
				if (item.id === updateMessage.id)
					return { ...item, content: updateMessage.content }
				return item
			})
			setMessage(update)
		},
		onError: err => {
			alert(err)
		},
	})
	const handleUpdateMessage = value => {
		updateMsg({
			variables: { message: { id: selectedMessage.id, content: value } },
		})
	}

	const handleDeleteMessage = () => {
		deleteMsg({ variables: { id: selectedMessage.id } })
	}

	const onSelectAMessage = dataRow => {
		setSelectedMessage(dataRow)
		setModifyDialogVisible(true)
	}

	const loadNextMessagePage = () =>
		fetchMore({
			variables: {
				query: {
					userId: selectedUser && selectedUser.id,
					limit: 10,
					skip: message.length,
				},
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				const fetchedMessageList = fetchMoreResult.messageList
				let cacheMessageList = prev.messageList
				const items = [...cacheMessageList.items, ...fetchedMessageList.items]
				const hasNext = fetchedMessageList.hasNext

				return {
					messageList: {
						...cacheMessageList,
						items,
						hasNext,
					},
				}
			},
		})

	const columns = [
		{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
		{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
	]

	const valueDefault =
		message &&
		message.find(item => item.id === selectedMessage.id) &&
		message.find(item => item.id === selectedMessage.id).content

	const classes = useStyles()

	return (
		message && (
			<Box className={classes.root}>
				<Typography variant='h5' className={classes.listtitle}>
					Total {message.length}
				</Typography>

				<LargeTable
					items={message}
					onClickRow={onSelectAMessage}
					selectedRow={selectedMessage}
					columns={columns}
					isIconClose={true}
					handleDeleteRow={dataRow => {
						setDeleteDialogVisible(true)
						setSelectedMessage(dataRow)
					}}
					loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
					loadNextPage={loadNextMessagePage}
					hasNextPage={dataMsg.messageList && dataMsg.messageList.hasNext}
				/>

				<DeleteDialog
					open={deleteDialogVisible}
					onClose={() => {
						setDeleteDialogVisible(false)
					}}
					onAgree={() => {
						setDeleteDialogVisible(false)
						handleDeleteMessage()
					}}
					onDisagree={() => {
						setDeleteDialogVisible(false)
					}}
				/>
				<ModifyDialog
					open={modifyDialogVisible}
					onClose={() => {
						setModifyDialogVisible(false)
					}}
					valueDefault={valueDefault}
					onAgree={value => {
						setModifyDialogVisible(false)
						handleUpdateMessage(value)
					}}
					onDisagree={() => {
						setModifyDialogVisible(false)
					}}
				/>
			</Box>
		)
	)
}

export default ListMessageOfUser
