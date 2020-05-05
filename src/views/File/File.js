import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getToken } from '@src/shares/utils'

import { GET_USER_INFO, GET_FILE } from './gql/query'
import { UPLOAD_FILE, SET_UPLOADED_FILE } from './gql/mutation'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
		height: '100vh',
		padding: theme.spacing(3),
		position: 'relative',
	},
	container: {
		border: `1px solid ${theme.palette.common.border}`,
		height: '100%',
	},
	container__uploader__imageviewer: {
		height: '100%',
	},
	item__uploader: {
		width: 462,
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	},
	item__uploader__button: {
		fontSize: '0.875rem',
		color: theme.palette.common.white,
		fontWeight: 700,
		textTransform: 'unset',
		marginRight: theme.spacing(1),
		padding: '3px 12px 3px 11px',
	},
	item__uploader__input: {
		position: 'absolute',
		top: 0,
		left: 0,
		opacity: 0,
		height: '100%',
		width: '100%',
	},
	item__uploader__filename: {
		width: 360,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
	item__imageviewer: {
		width: 462,
		height: 324,
		border: `1px solid ${theme.palette.common.border}`,
		background: theme.palette.common.greyButton,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(3),
		overflow: 'hidden',
	},
	item__imageviewer__image: {
		height: '100%',
	},
}))

const File = () => {
	const classes = useStyle()
	const [imageUrl, setImageUrl] = useState('')
	const { data: fileData } = useQuery(GET_FILE)
	const [setUploadedFile] = useMutation(SET_UPLOADED_FILE, {
		onError: err => alert(err),
	})

	// eslint-disable-next-line no-unused-vars
	const _ = useQuery(GET_USER_INFO, {
		onCompleted: data => {
			if (data?.me?.image && !fileData?.file.filename) {
				setUploadedFile({ variables: { file: data.me.image } })
			}
		},
		onError: err => alert(err),
	})

	const [uploadFile] = useMutation(UPLOAD_FILE, {
		onCompleted: async ({ uploadImage }) => {
			setUploadedFile({ variables: { file: uploadImage } })
			const imageUrl = await fetchAuthImage(uploadImage.link)

			setImageUrl(imageUrl)
		},
		onError: err => alert(err),
	})

	const onUploadFile = ({ target }) => {
		const file = target.files[0]

		uploadFile({ variables: { file } })
	}

	const fetchAuthImage = async imageUrl => {
		const token = getToken()
		const res = await fetch(imageUrl, {
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		})
		const blob = await res.blob()
		const url = URL.createObjectURL(blob)

		return url
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container}>
				<Grid
					container
					direction='column'
					alignItems='center'
					justify='center'
					className={classes.container__uploader__imageviewer}
				>
					<Grid item className={classes.item__uploader}>
						<Button
							data-testid='file-selectbutton'
							variant='contained'
							size='small'
							className={classes.item__uploader__button}
						>
							file select
							<input
								data-testid='file-input'
								accept='image/*'
								className={classes.item__uploader__input}
								onChange={onUploadFile}
								type='file'
							/>
						</Button>
						<Typography
							variant='body2'
							className={classes.item__uploader__filename}
						>
							{fileData?.file.filename
								? fileData?.file.filename
								: 'No file selected'}
						</Typography>
					</Grid>
					<Grid item className={classes.item__imageviewer}>
						{imageUrl ? (
							<img
								src={imageUrl}
								alt={fileData?.file.filename}
								className={classes.item__imageviewer__image}
							/>
						) : (
							<Typography variant='body2'>image</Typography>
						)}
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default File
