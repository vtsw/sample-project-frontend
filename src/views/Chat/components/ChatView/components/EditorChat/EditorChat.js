import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { RichText } from '@views_components'
import { GET_DRAFT_LIST } from '../../../../gql/query'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_ZALO_MESSAGE } from '../../../../gql/mutation'

EditorChat.propTypes = {}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		borderTop: '1px solid #e5e5e9',
		background: '#f9f9fd',
	},

	root__tool: {
		height: 40,
		width: '100%',
		borderBottom: '1px solid #e5e5e9',
	},
	root__areainput: {
		display: 'flex',
		alignItems: 'center',
	},

	root__areainput__send: {
		margin: theme.spacing(0, 2, 0, 1),
		cursor: 'pointer',
		color: '#00897b',
	},
}))
export default function EditorChat({ idUser }) {
	const classes = useStyles()

	const {
		data: {
			draftList: { items },
		},
	} = useQuery(GET_DRAFT_LIST)

	const valueDefault =
		items.find(item => item.toInterestId === idUser) &&
		JSON.parse(items.find(item => item.toInterestId === idUser).message)

	const [createZaloMessage] = useMutation(CREATE_ZALO_MESSAGE)

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

	return (
		<Box className={classes.root}>
			<Box className={classes.root__tool}></Box>
			<Box className={classes.root__areainput}>
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
