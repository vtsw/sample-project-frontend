import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Typography, makeStyles } from '@material-ui/core'

import {
	DeleteDialog,
	ModifyDialog,
	LargeTable,
	Loading,
} from '@views_components'

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

	const messageListQueryVars = {
		query: {
			userId: selectedUser && selectedUser.id,
			limit: 20,
		},
	}
	const { data: dataMsg, fetchMore, networkStatus, loading } = useQuery(
		MESSAGE_LIST,
		{
			variables: messageListQueryVars,
			fetchPolicy: 'network-only',
			notifyOnNetworkStatusChange: true,
		}
	)

	const [deleteMsg] = useMutation(DELETE_MESSAGE, {
		update(cache, { data: { deleteMessage } }) {
			const { messageList } = cache.readQuery({
				query: MESSAGE_LIST,
				variables: messageListQueryVars,
			})
			const index = messageList.items.findIndex(
				item => item.id === deleteMessage.id
			)

			if (index > -1) {
				messageList.items.splice(index, 1)
				cache.writeQuery({
					query: MESSAGE_LIST,
					variables: messageListQueryVars,
					data: {
						messageList,
					},
				})
			}
		},
		onError: err => alert(err),
	})

	const [updateMsg] = useMutation(UPDATE_MESSAGE, {
		onError: err => alert(err),
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
					skip: dataMsg.messageList.items.length,
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

	const TABLE_HEADER = [
		{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
		{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
	]

	const valueDefault =
		dataMsg &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id) &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id)
			.content

	const classes = useStyles()

	return (
		<Box className={classes.root}>
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Loading open={true} msg={'Loading...'} />
			) : (
				<React.Fragment>
					<Typography variant='h5' className={classes.listtitle}>
						Total {dataMsg.messageList.items.length}
					</Typography>

					<LargeTable
						items={dataMsg.messageList.items}
						onClickRow={onSelectAMessage}
						selectedRow={selectedMessage}
						columns={TABLE_HEADER}
						isIconClose={true}
						handleDeleteRow={dataRow => {
							setDeleteDialogVisible(true)
							setSelectedMessage(dataRow)
						}}
						loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
						loadNextPage={loadNextMessagePage}
						hasNextPage={dataMsg.messageList && dataMsg.messageList.hasNext}
					/>
				</React.Fragment>
			)}

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
}

export default ListMessageOfUser
