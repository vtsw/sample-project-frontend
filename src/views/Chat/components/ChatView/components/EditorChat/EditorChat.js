import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Image } from '@material-ui/icons'

import { RichText } from '@views_components'
import { GET_DRAFT_LIST, GET_ZALO_MESSAGE_LIST } from '../../../../gql/query'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
	CREATE_ZALO_MESSAGE,
	CREATE_ZALO_IMAGE_MESSAGE,
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
	const [image, setImage] = React.useState(null)

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)

	const valueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

	const [createZaloMessage] = useMutation(CREATE_ZALO_MESSAGE)
	const [createZaloImageMessage] = useMutation(CREATE_ZALO_IMAGE_MESSAGE, {
		update(cache, { data: { createZaloImageMessage } }) {
			const { ZaloMessageList } = cache.readQuery({
				query: GET_ZALO_MESSAGE_LIST,
				variables: {
					query: {
						limit: 15,
						interestedUserId: idUser,
					},
				},
			})

			cache.writeQuery({
				query: GET_ZALO_MESSAGE_LIST,
				variables: {
					query: {
						limit: 15,
						interestedUserId: idUser,
					},
				},
				data: {
					zaloMessageList: {
						...ZaloMessageList,
						items: [createZaloImageMessage, ...ZaloMessageList.items],
					},
				},
			})
		},
		onError: err => alert(err),
	})

	const handleSendZaloMessage = content => {
		createZaloMessage({
			variables: {
				message: {
					to: idUser,
					content,
				},
			},
		})
	}

	const handleSendZaloImageMessage = attachment => {
		createZaloImageMessage({
			variables: {
				message: {
					to: idUser,
					attachment,
				},
			},
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

		const fileReader = new FileReader()
		fileReader.readAsBinaryString(file)
		fileReader.onload = e => {
			const url = createBlobUrl(e.target.result)
			setImage(url)
			handleSendZaloImageMessage(file)
		}
	}

	return (
		<Box className={classes.root}>
			<Box>
				<img src={image} alt='imasdfge wer' />
			</Box>
			<Box className={classes.tool}>
				<Box>
					<input
						accept='image/*'
						className={classes.tool__uploadinput}
						id='editorchat-uploadinput'
						type='file'
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
