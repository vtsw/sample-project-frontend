import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
	SET_SELECTED_USER_OF_CHAT,
	SET_STATUS_READED_MESSAGE,
} from '../../../../gql/mutation'
import {
	GET_SELECTED_USER_OF_CHAT,
	GET_DRAFT_LIST,
} from '../../../../gql/query'
import { MessageNoti, ShowRichText } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: ({ isUserSelected }) => ({
		display: 'flex',
		width: '100%',
		height: 72,
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		backgroundColor: isUserSelected && '#00897b80',
		'&:hover': {
			backgroundColor: '#00897b80',
		},
	}),

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
	root__infor__unsent: {
		fontSize: 12,
		color: 'red',
	},
	root__infor__name__message: {
		fontSize: 12,
		color: '#7a869a',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		width: '100%',
		whiteSpace: 'nowrap',
	},
	root__infor__boxmesssage__messagedraf: {
		fontSize: 12,
		color: '#7a869a',
	},
	root__infor__boxname: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	root__infor__boxmesssage: {
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

export default function FriendTag(props) {
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
			<Grid item className={classes.root__infor__avatar}>
				<Avatar size={50} avatar={avatar} status='online' showStatus={true} />
			</Grid>
			<Grid item xs={9}>
				<Box className={classes.root__infor__name}>
					<Box className={classes.root__infor__boxname}>
						<Typography className={classes.root__infor__name__fullname}>
							{displayName}
						</Typography>
						{valueDefault && selectedUserOfChat.id !== id ? (
							<Typography className={classes.root__infor__unsent}>
								Chưa gửi
							</Typography>
						) : (
							<Typography className={classes.root__infor__name__time}>
								{time}
							</Typography>
						)}
					</Box>
					{lastNewMessage ? (
						<Box className={classes.root__infor__boxmesssage}>
							<Typography className={classes.root__infor__name__message}>
								{lastNewMessage}
							</Typography>
							{numberNoti && <MessageNoti numberNoti={numberNoti} />}
						</Box>
					) : valueDefault && selectedUserOfChat.id !== id ? (
						<Box className={classes.root__infor__boxmesssage}>
							<Typography
								className={classes.root__infor__boxmesssage__messagedraf}
							>
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
