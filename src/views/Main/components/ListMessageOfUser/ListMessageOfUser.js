import React, { useState, useEffect } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { LargeTable, DeleteDialog, ModifyDialog } from '@views_components'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '../../../Message/mutation'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { MESSAGE_LIST } from '../../query'

const useStyles = makeStyles(theme => ({
	root: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		position: 'relative ',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	message_list__title: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
}))

const ListMessageOfUser = ({ selectedUser }) => {
	const classes = useStyles()
	const client = useApolloClient()
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState('')
	const [message, setMessage] = useState(false)

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

	const { data: dataMsg } = useQuery(
		MESSAGE_LIST,

		{
			variables: {
				query: {
					userId: selectedUser && selectedUser.id,
					limit: 20,
				},
			},
			fetchPolicy: 'network-only',
		}
	)

	const loadNextMesagePage = async () => {
		const result = await client.query({
			query: MESSAGE_LIST,
			variables: {
				query: {
					userId: selectedUser && selectedUser.id,
					limit: 10,
					skip: message.length,
				},
			},
		})
		setMessage([...message, ...result.data.messageList.items])
	}

	useEffect(() => {
		if (dataMsg && dataMsg.messageList) {
			setMessage(dataMsg.messageList.items)
		}
	}, [dataMsg])

	const columns = [
		{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
		{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
	]

	return (
		message && (
			<Box className={classes.root}>
				<Typography variant='h5' className={classes.message_list__title}>
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
					loadNextPage={loadNextMesagePage}
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
					valueDefault={
						message.find(item => item.id === selectedMessage.id) &&
						message.find(item => item.id === selectedMessage.id).content
					}
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
