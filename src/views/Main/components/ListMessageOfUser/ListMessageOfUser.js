import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Typography, makeStyles } from '@material-ui/core'

import {
	DeleteDialog,
	ModifyDialog,
	LargeTable,
	Loading,
} from '@views_components'

import { MESSAGE_LIST } from '@views/Message/gql/query'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '@views/Message/gql/mutation'
import { useDeleteMessage } from '@views/Message/gql/useMutations'

import { NETWORK_STATUS_FETCH_MORE, PAGE_LIMIT } from '@src/configs.local'

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

const tableHeaders = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

const ListMessageOfUser = props => {
	const { selectedUser } = props
	const classes = useStyles()

	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState('')

	const messageListQueryVars = {
		query: {
			userId: selectedUser && selectedUser.id,
			limit: PAGE_LIMIT,
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

	const [deleteMessage] = useDeleteMessage(
		DELETE_MESSAGE,
		MESSAGE_LIST,
		messageListQueryVars
	)

	const [updateMessage] = useMutation(UPDATE_MESSAGE, {
		onError: err => alert(err),
	})

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

	const handleOnSelectMessage = message => {
		setSelectedMessage(message)
		setModifyDialogVisible(true)
	}

	const handleOnDeleteMessage = message => {
		setDeleteDialogVisible(true)
		setSelectedMessage(message)
	}

	const handleOnAgreeDeleteMessage = () => {
		setDeleteDialogVisible(false)
		deleteMessage({ variables: { id: selectedMessage.id } })
	}

	const handleOnAgreeModifyMessage = message => {
		updateMessage({
			variables: { message: { id: selectedMessage.id, content: message } },
		})
	}

	const valueDefault =
		dataMsg &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id) &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id)
			.content

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
						onClickRow={handleOnSelectMessage}
						selectedRow={selectedMessage}
						columns={tableHeaders}
						isIconClose={true}
						handleDeleteRow={handleOnDeleteMessage}
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
				onAgree={handleOnAgreeDeleteMessage}
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
				onAgree={handleOnAgreeModifyMessage}
				onDisagree={() => {
					setModifyDialogVisible(false)
				}}
			/>
		</Box>
	)
}

export default ListMessageOfUser
