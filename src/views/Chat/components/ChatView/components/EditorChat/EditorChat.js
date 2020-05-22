import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
	UploadImageButton,
	UploadFileButton,
	SendReservationButton,
} from '@views_components'
import { RichText } from '@views_components'
import { SendReservationDialog } from './components'

import { GET_DRAFT_LIST } from '@views/Chat/gql/query'
import {
	CREATE_ZALO_MESSAGE,
	CREATE_ZALO_MESSAGE_ATTACHMENT,
	SET_CREATE_ZALO_MESSAGE_ATTACHMENT,
} from '@views/Chat/gql/mutation'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		borderTop: '1px solid #e5e5e9',
		background: '#f9f9fd',
	},

	toolbar: {
		height: 40,
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		borderBottom: '1px solid #e5e5e9',
	},
	toolbar__uploadinput: {
		display: 'none',
	},
	areainput: {
		display: 'flex',
		alignItems: 'center',
	},
	richtext: {
		maxHeight: 250,
		overflow: 'scroll',
		padding: 16,
	},
}))

const EditorChat = props => {
	const { idUser } = props
	const classes = useStyles()

	const [
		sendReservationDialogVisible,
		setSendReservationDialogVisible,
	] = useState(true)

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)

	const [setCreateZaloMessageAttachment] = useMutation(
		SET_CREATE_ZALO_MESSAGE_ATTACHMENT,
		{
			onError: err => alert(err),
		}
	)
	const [createZaloMessage] = useMutation(CREATE_ZALO_MESSAGE, {
		onError: err => alert(err),
	})
	const [createZaloMessageAttachment] = useMutation(
		CREATE_ZALO_MESSAGE_ATTACHMENT
	)

	const richTextValueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

	const handleSendZaloImageMessage = ({
		attachmentFile,
		url = '',
		fileType,
	}) => {
		createZaloMessageAttachment({
			variables: {
				file: {
					to: idUser,
					content: '',
					attachmentFile,
					fileType,
				},
			},
		})
			.then(({ data }) => {
				const id = data?.createZaloMessageAttachment?.id

				setCreateZaloMessageAttachment({
					variables: {
						message: {
							id,
							url,
							__typename: 'MessageAttachment',
						},
					},
				})
			})
			.catch(e => alert(e))
	}

	const handleUploadImage = ({ target }) => {
		const file = target.files[0]
		let fileType = 'Image'
		const fileReader = new FileReader()

		if (file.type === 'image/gif') {
			fileType = 'Gif'
		}

		fileReader.readAsBinaryString(file)
		fileReader.onload = e => {
			const result = e.target.result
			const length = result.length
			let arr = new Uint8Array(length)

			for (let i = 0; i < length; i++) {
				arr[i] = result.charCodeAt(i)
			}

			const blob = new Blob([arr], { type: 'image/png' })
			const url = URL.createObjectURL(blob)

			handleSendZaloImageMessage({ attachmentFile: file, url, fileType })
		}
	}

	const handleOnUploadFile = ({ target }) => {
		const file = target.files[0]

		if (file.size / 1024 / 1024 > 5) {
			alert('You cannot upload a file larger than 5MB')
			return
		}
		handleSendZaloImageMessage({ attachmentFile: file, fileType: 'File' })
	}

	const handleSendZaloMessage = content => {
		createZaloMessage({
			variables: {
				message: {
					to: idUser,
					content: content,
				},
			},
		})
	}

	const handleOnAgreeSendReservation = () => {}

	return (
		<Box className={classes.root}>
			<Box className={classes.toolbar}>
				<UploadImageButton onChange={handleUploadImage} />
				<UploadFileButton onChange={handleOnUploadFile} />
				<SendReservationButton
					onClick={() => setSendReservationDialogVisible(true)}
				/>
			</Box>
			<Box className={classes.areainput}>
				<RichText
					valueDefault={richTextValueDefault}
					idUser={idUser}
					editableStyle={classes.richtext}
					handleComfirm={handleSendZaloMessage}
				/>
			</Box>
			<SendReservationDialog
				open={sendReservationDialogVisible}
				onClose={() => {
					setSendReservationDialogVisible(false)
				}}
				onAgree={handleOnAgreeSendReservation}
				onDisagree={() => {
					setSendReservationDialogVisible(false)
				}}
			/>
		</Box>
	)
}

export default EditorChat
