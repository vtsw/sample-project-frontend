import React, { useState, useEffect } from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'
import { ListMessage, BoxCreate, BoxSearch } from './components'
import { MESSAGE_LIST, MESSAGE_LIST_WITHOUT_FILTER } from './query'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from './mutation'
import Loading from '../components/Loading'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
		padding: theme.spacing(3),
		position: 'relative',
	},
	container: {
		border: `1px solid #979797`,
	},
	div: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
	},
}))

const Message = () => {
	const classes = useStyle()
	const client = useApolloClient()
	const [contents, setContents] = useState({})

	const [createMsg] = useMutation(CREATE_MESSAGE, {
		onCompleted: data => {
			const update = {
				...contents,
				items: [data.createMessage, ...contents.items],
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const [deleteMsg] = useMutation(DELETE_MESSAGE, {
		onCompleted: data => {
			const update = {
				...contents,
				items: contents.items.filter(item => item.id !== data.deleteMessage.id),
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const [updateMsg] = useMutation(UPDATE_MESSAGE, {
		onCompleted: ({ updateMessage }) => {
			const update = {
				...contents,
				items: contents.items.map(item => {
					if (item.id === updateMessage.id)
						return { ...item, content: updateMessage.content }
					return item
				}),
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const handleSearch = async value => {
		const result = await client.query({
			query: MESSAGE_LIST,
			variables: { query: { searchText: value, limit: 100 } },
		})
		setContents(result.data.messageList)
	}

	const handleDeleteMessage = id => {
		deleteMsg({ variables: { id } })
	}

	const handleUpdateMessage = (id, value) => {
		updateMsg({
			variables: { message: { id, content: value } },
		})
	}

	const handleCreateMessage = createVal => {
		createMsg({
			variables: { message: { content: createVal } },
		})
	}

	const { loading, error, data } = useQuery(MESSAGE_LIST_WITHOUT_FILTER, {
		fetchPolicy: 'network-only',
	})
	useEffect(() => {
		if (data && data.messageList) {
			setContents(data.messageList)
		}
	}, [data])

	if (error) return <p>Error :(</p>

	return (
		<Box className={classes.root}>
			<Loading open={loading} msg={'Loading...'} />
			<Grid container direction='column' className={classes.container}>
				<Grid item xs>
					<BoxCreate handleCreate={handleCreateMessage} />
				</Grid>
				<Grid item xs>
					<BoxSearch handleSearch={handleSearch} />
				</Grid>
				{contents && contents.items && (
					<Grid item xs>
						<ListMessage
							messageList={contents}
							handleDeleteMessage={handleDeleteMessage}
							handleUpdateMessage={handleUpdateMessage}
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default Message
