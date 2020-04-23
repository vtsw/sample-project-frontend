import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
		height: 72,
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#00897b80',
		},
	},
	root__listfriend: {
		width: '332px',
	},
	root__infor__name: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: theme.spacing(2),
	},
	root__infor__name__fullname: {
		fontSize: 18,
	},
	root__infor__name__time: {
		fontSize: 12,
		color: '#7a869a',
	},
	root__infor__name__message: {
		fontSize: 12,
		color: '#7a869a',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		width: '100%',
		whiteSpace: 'nowrap',
	},
	root__infor__boxname: {
		paddingRight: theme.spacing(2),
		display: 'flex',
		justifyContent: 'space-between',
	},
}))

export default function FriendTag(props) {
	const { name, imgUrl, message, time } = props
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Grid item className={classes.root__infor__avatar}>
				<Avatar size={50} imgUrl={imgUrl} status='online' showStatus={true} />
			</Grid>
			<Grid item xs={9}>
				<Grid container className={classes.root__infor__name}>
					<Box className={classes.root__infor__boxname}>
						<Typography className={classes.root__infor__name__fullname}>
							{name}
						</Typography>
						<Typography className={classes.root__infor__name__time}>
							{time}
						</Typography>
					</Box>

					<Typography className={classes.root__infor__name__message}>
						{message}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}

FriendTag.propTypes = {
	name: PropTypes.string.isRequired,
	imgUrl: PropTypes.string,
	message: PropTypes.string,
	time: PropTypes.string,
}

FriendTag.defaultProps = {
	name: 'Nguyễn Văn Đại',
	imgUrl:
		'http://s120-ava-talk.zadn.vn/3/e/5/2/2/120/c181045e8a31aa07c65e25d88bd249e6.jpg',
	message:
		"Hello, Good afternoon. How do you feel now? Are you free? You can chat with, aren't you",
	time: 'vài giây',
}
