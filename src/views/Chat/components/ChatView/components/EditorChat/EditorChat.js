import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Image, AttachFile } from '@material-ui/icons'

import { RichText } from '@views_components'
import { GET_DRAFT_LIST } from '@views/Chat/gql/query'
import { useQuery, useMutation } from '@apollo/react-hooks'
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

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)
	const [setCreateZaloMessageAttachment] = useMutation(
		SET_CREATE_ZALO_MESSAGE_ATTACHMENT
	)
	const [createZaloMessage] = useMutation(CREATE_ZALO_MESSAGE)
	const [createZaloMessageAttachment] = useMutation(
		CREATE_ZALO_MESSAGE_ATTACHMENT,
		{
			onError: err => alert(err),
		}
	)

	const handleSendZaloMessage = content => {
		createZaloMessage({
			variables: {
				message: {
					to: idUser,
					content: content.trim(),
				},
			},
		})
	}

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
		}).then(({ data }) => {
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
	}

	const createBlobUrl = file => {
		const length = file.length
		let arr = new Uint8Array(length)

		for (let i = 0; i < length; i++) {
			arr[i] = file.charCodeAt(i)
		}
		const blob = new Blob([arr], { type: 'image/png' })
		const url = URL.createObjectURL(blob)
		return url
	}

	const onUploadImage = ({ target }) => {
		const file = target.files[0]
		let fileType = 'Image'
		const fileReader = new FileReader()

		if (file.type === 'image/gif') {
			fileType = 'Gif'
		}

		fileReader.readAsBinaryString(file)
		fileReader.onload = e => {
			const url = createBlobUrl(e.target.result)
			handleSendZaloImageMessage({ attachmentFile: file, url, fileType })
		}
	}

	const onUploadFile = ({ target }) => {
		const file = target.files[0]

		handleSendZaloImageMessage({ attachmentFile: file, fileType: 'File' })
	}

	const richTextValueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

	return (
		<Box className={classes.root}>
			<Box className={classes.toolbar}>
				<Box>
					<input
						id='editorchat-uploadinput'
						type='file'
						accept='image/*'
						className={classes.toolbar__uploadinput}
						onChange={onUploadImage}
					/>
					<label htmlFor='editorchat-uploadinput'>
						<IconButton aria-label='upload image' component='span'>
							<Image />
						</IconButton>
					</label>
				</Box>
				<Box>
					<input
						id='editorchat-uploadfile'
						type='file'
						accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
						className={classes.toolbar__uploadinput}
						onChange={onUploadFile}
					/>
					<label htmlFor='editorchat-uploadfile'>
						<IconButton aria-label='upload image' component='span'>
							<AttachFile />
						</IconButton>
					</label>
				</Box>
			</Box>
			<Box className={classes.areainput}>
				<RichText
					valueDefault={richTextValueDefault}
					idUser={idUser}
					editableStyle={classes.richtext}
					handleComfirm={handleSendZaloMessage}
				/>
			</Box>
		</Box>
	)
}

export default EditorChat
