import React, { useState, useEffect } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { CVTable, DeleteDialog, ModifyDialog } from '@views_components'
import { TABLE_TYPES } from '@src/shares/types'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '../../../Message/mutation'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { MESSAGE_LIST, USER_LIST } from '../../query'
import { Loading } from '@views/components'

const useStyles = makeStyles(theme => ({
	message_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		position: 'relative ',
	},
	message_list__title: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},

	overlay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
		marginLeft: theme.spacing(1.5),
	},
}))

const ListMessageOfUser = ({ selectedUser }) => {
	const classes = useStyles()
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState('')
	const [message, setMessage] = useState(false)

	const [deleteMsg, { loading: loadingDeleteMsg }] = useMutation(
		DELETE_MESSAGE,
		{
			onCompleted: data => {
				const update = message.filter(item => item.id !== data.deleteMessage.id)

				setMessage(update)
			},

			onError: err => {
				alert(err)
			},
			refetchQueries: [
				{
					query: MESSAGE_LIST,
					variables: {
						query: {
							userId: selectedUser && selectedUser.id,
						},
					},
				},
			],
			awaitRefetchQueries: true,
		}
	)

	const [updateMsg, { loading: loadingUpdateMsg }] = useMutation(
		UPDATE_MESSAGE,
		{
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
			refetchQueries: [
				{
					query: MESSAGE_LIST,
					variables: {
						query: {
							userId: selectedUser && selectedUser.id,
						},
					},
				},
			],
		}
	)
	const handleUpdateMessage = value => {
		updateMsg({
			variables: { message: { id: selectedMessage.id, content: value } },
		})
	}

	const handleDeleteMessage = () => {
		deleteMsg({ variables: { id: selectedMessage.id } })
	}

	const onSelectAMessage = object => {
		setSelectedMessage(object)
		setModifyDialogVisible(true)
	}

	const { loading: loadingMsg, error: errMsg, data: dataMsg } = useQuery(
		MESSAGE_LIST,

		{
			variables: {
				query: {
					userId: selectedUser && selectedUser.id,
				},
			},
			fetchPolicy: 'network-only',
		}
	)
	useEffect(() => {
		if (dataMsg && dataMsg.messageList) {
			setMessage(dataMsg.messageList.items)
		}
	}, [dataMsg])

	return message && selectedUser && selectedUser.id ? (
		<Box className={classes.message_list__container}>
			{/* <Loading open={loadingMsg} msg={'Loading...'} /> */}
			<Typography variant='h5' className={classes.message_list__title}>
				Total {message.length}
			</Typography>

			<CVTable
				type={TABLE_TYPES.MESSAGE}
				tableData={message}
				tableHeight='calc(100vh - 185px)'
				selectedItem={selectedMessage}
				setSelectedItem={onSelectAMessage}
				setDeleteDialogVisible={(openDialogDelete, object) => {
					setDeleteDialogVisible(openDialogDelete)
					setSelectedMessage(object)
				}}
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
	) : (
		<Box className={classes.overlay}>
			<Typography variant='subtitle2' color='primary' gutterBottom>
				Select an item on the left.
			</Typography>
		</Box>
	)
}

export default ListMessageOfUser
