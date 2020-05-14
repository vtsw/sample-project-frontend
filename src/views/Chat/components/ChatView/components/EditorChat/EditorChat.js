import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Image } from '@material-ui/icons'

import { RichText } from '@views_components'
import { GET_DRAFT_LIST } from '@views/Chat/gql/query'
import { useMutation, useQuery } from '@apollo/react-hooks'
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

	const richTextValueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

	const handleUploadImage = ({ target }) => {
		const file = target.files[0]
		const fileReader = new FileReader()

		fileReader.readAsBinaryString(file)
		fileReader.onload = e => {
			const createBlobUrl = file => {
				const length = file.length
				let arr = new Uint8Array(length)

				for (let i = 0; i < length; i++) {
					arr[i] = file.charCodeAt(i)
				}

				const blob = new Blob([arr], { type: 'image/png' })
				return URL.createObjectURL(blob)
			}
			const url = createBlobUrl(e.target.result)
			handleSendZaloImageMessage(file, url)
		}
	}

	const handleSendZaloImageMessage = (attachmentFile, url) => {
		createZaloMessageAttachment({
			variables: {
				file: {
					to: idUser,
					content: '',
					attachmentFile,
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

	return (
		<Box className={classes.root}>
			<Box className={classes.toolbar}>
				<Box>
					<input
						id='editorchat-uploadinput'
						type='file'
						accept='image/*'
						className={classes.toolbar__uploadinput}
						onChange={handleUploadImage}
					/>
					<label htmlFor='editorchat-uploadinput'>
						<IconButton aria-label='upload image' component='span'>
							<Image />
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
