import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Image } from '@material-ui/icons'

import { RichText } from '@views_components'
import { GET_DRAFT_LIST } from '../../../../gql/query'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
	CREATE_ZALO_MESSAGE,
	CREATE_ZALO_MESSAGE_ATTACHMENT,
	SET_CREATE_ZALO_MESSAGE_ATTACHMENT,
} from '../../../../gql/mutation'

EditorChat.propTypes = {}

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		borderTop: '1px solid #e5e5e9',
		background: '#f9f9fd',
	},

	tool: {
		height: 40,
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		borderBottom: '1px solid #e5e5e9',
	},
	tool__uploadinput: {
		display: 'none',
	},
	areainput: {
		display: 'flex',
		alignItems: 'center',
	},
}))
export default function EditorChat({ idUser }) {
	const classes = useStyles()

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)
	const [setCreateZaloMessageAttachment] = useMutation(
		SET_CREATE_ZALO_MESSAGE_ATTACHMENT
	)

	const valueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

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

	const handleSendZaloImageMessage = (attachmentFile, url) => {
		createZaloMessageAttachment({
			variables: {
				file: {
					to: idUser,
					content: '',
					attachmentFile,
				},
			},
		}).then(
			({
				data: {
					createZaloMessageAttachment: { id },
				},
			}) => {
				setCreateZaloMessageAttachment({
					variables: {
						message: {
							id,
							url,
							__typename: 'MessageAttachment',
						},
					},
				})
			}
		)
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
		const fileReader = new FileReader()

		fileReader.readAsBinaryString(file)
		fileReader.onload = e => {
			const url = createBlobUrl(e.target.result)
			handleSendZaloImageMessage(file, url)
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.tool}>
				<Box>
					<input
						id='editorchat-uploadinput'
						type='file'
						accept='image/*'
						className={classes.tool__uploadinput}
						onChange={onUploadImage}
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
					valueDefault={valueDefault}
					idUser={idUser}
					editableStyle={{
						maxHeight: 250,
						overflow: 'scroll',
						padding: 16,
					}}
					handleComfirm={handleSendZaloMessage}
				/>
			</Box>
		</Box>
	)
}
