import React from 'react'

// import { useQuery, useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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
	},
	item__uploader__input: {
		position: 'absolute',
		top: 0,
		left: 0,
		opacity: 0,
		height: '100%',
		width: '100%',
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
	},
}))

const File = () => {
	const onUpload = () => {}
	const classes = useStyle()

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
							variant='contained'
							size='small'
							className={classes.item__uploader__button}
						>
							file select
							<input
								accept='image/*'
								className={classes.item__uploader__input}
								id='uploading-input'
								onChange={onUpload}
								type='file'
							/>
						</Button>
						<Typography variant='body2'>No file selected</Typography>
					</Grid>
					<Grid item className={classes.item__imageviewer}>
						<Typography variant='body2'>image</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default File
