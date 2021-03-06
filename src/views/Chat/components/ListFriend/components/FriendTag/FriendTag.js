import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
	SET_SELECTED_USER_OF_CHAT,
	SET_STATUS_READED_MESSAGE,
} from '@views/Chat/gql/mutation'
import {
	GET_SELECTED_USER_OF_CHAT,
	GET_DRAFT_LIST,
} from '@views/Chat/gql/query'
import { MessageNoti, ShowRichText } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: ({ isUserSelected }) => ({
		display: 'flex',
		width: '100%',
		height: 72,
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		backgroundColor: isUserSelected && 'rgba(0, 137, 123, 0.4)',
		'&:hover': {
			backgroundColor: 'rgba(0, 137, 123, 0.2)',
		},
	}),

	infor__name: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: theme.spacing(2),
	},
	infor__name__fullname: {
		fontSize: 18,
	},
	infor__name__time: {
		fontSize: 12,
		color: '#7a869a',
	},
	infor__unsent: {
		fontSize: 12,
		color: 'red',
	},
	infor__name__message: {
		fontSize: 12,
		color: '#7a869a',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		width: '100%',
		whiteSpace: 'nowrap',
	},
	infor__boxmesssage__messagedraf: {
		fontSize: 12,
		color: '#7a869a',
	},
	infor__boxname: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	infor__boxmesssage: {
		width: '100%',
		display: 'flex',
		alignItems: 'baseline',
		fontSize: 12,
		color: '#7a869a',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		// width: '100%',
		whiteSpace: 'nowrap',
	},
}))

const FriendTag = props => {
	const { displayName, avatar, lastNewMessage, time, id, numberNoti } = props

	const {
		data: { selectedUserOfChat },
	} = useQuery(GET_SELECTED_USER_OF_CHAT)

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)

	const valueDefault = items.find(item => item.toInterestId === id)
	const classes = useStyles({ isUserSelected: selectedUserOfChat.id === id })
	const [setSelectedUserOfChat] = useMutation(SET_SELECTED_USER_OF_CHAT)
	const [setStatusReadedMessage] = useMutation(SET_STATUS_READED_MESSAGE)

	const hanldeSelectedUser = () => {
		setSelectedUserOfChat({
			variables: {
				selectedUser: {
					displayName,
					id,
					avatar,
					__typename: 'UserOfMain',
				},
			},
		})
		document.title = 'CleVer Dashboard'
		setStatusReadedMessage({
			variables: {
				readedMessage: {
					fromInterestedId: id,
				},
			},
		})
	}

	return (
		<Box className={classes.root} onClick={hanldeSelectedUser}>
			<Grid item className={classes.infor__avatar}>
				<Avatar size={50} avatar={avatar} status='online' showStatus={true} />
			</Grid>
			<Grid item xs={9}>
				<Box className={classes.infor__name}>
					<Box className={classes.infor__boxname}>
						<Typography className={classes.infor__name__fullname}>
							{displayName}
						</Typography>
						{valueDefault && selectedUserOfChat.id !== id ? (
							<Typography className={classes.infor__unsent}>
								Chưa gửi
							</Typography>
						) : (
							<Typography className={classes.infor__name__time}>
								{time}
							</Typography>
						)}
					</Box>
					{lastNewMessage ? (
						<Box className={classes.infor__boxmesssage}>
							<Typography className={classes.infor__name__message}>
								{lastNewMessage}
							</Typography>
							{numberNoti && <MessageNoti numberNoti={numberNoti} />}
						</Box>
					) : valueDefault && selectedUserOfChat.id !== id ? (
						<Box className={classes.infor__boxmesssage}>
							<Typography className={classes.infor__boxmesssage__messagedraf}>
								[Nháp]:
							</Typography>

							<ShowRichText
								readOnly
								valueDefault={[JSON.parse(valueDefault.message)[0]]}
								textOverflow={JSON.parse(valueDefault.message).length > 1}
								editableStyle={{
									paddingLeft: 4,
									maxWidth: '100%',
									width: 'fit-content',
									whiteSpace: 'nowrap !important',
								}}
							/>
						</Box>
					) : (
						''
					)}
				</Box>
			</Grid>
		</Box>
	)
}

export default FriendTag

FriendTag.propTypes = {
	displayName: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	lastNewMessage: PropTypes.string,
	time: PropTypes.string,
}

FriendTag.defaultProps = {
	displayName: '',
	avatar: '',
	lastNewMessage: '',
	time: 'vài giây',
}
