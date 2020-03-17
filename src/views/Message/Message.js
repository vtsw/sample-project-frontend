import React, { useState, useEffect } from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'
import { BoxCreate, BoxSearch } from './components'
import { MESSAGE_LIST } from './query'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from './mutation'
import Loading from '../components/Loading'
import LargeTable from '../components/LargeTable/LargeTable'
import { DeleteDialog, ModifyDialog } from '@views_components'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
		height: '100vh',
		padding: theme.spacing(3),
		position: 'relative',
	},
	container: {
		border: `1px solid #979797`,
		height: '100%',
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

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [openConfirmModify, setOpenConfirmModify] = useState(false)

	const [selectedMessage, setSelectedMessage] = useState(false)

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
			variables: { query: { searchText: value, limit: 40 } },
			fetchPolicy: 'network-only',
		})
		setContents(result.data.messageList)
		setSelectedMessage(false)
	}

	const handleDeleteMessage = id => {
		deleteMsg({ variables: { id } })
	}

	const handleUpdateMessage = value => {
		updateMsg({
			variables: { message: { id: selectedMessage.id, content: value } },
		})
	}

	const handleCreateMessage = createVal => {
		createMsg({
			variables: { message: { content: createVal } },
		})
	}

	const { loading, error, data } = useQuery(MESSAGE_LIST, {
		fetchPolicy: 'network-only',
		variables: { query: { limit: 20 } },
	})

	const loadNextMesagePage = async () => {
		const result = await client.query({
			query: MESSAGE_LIST,
			variables: {
				query: {
					limit: 10,
					skip: contents.items.length,
				},
			},
		})
		setContents({
			...contents,
			total: contents.total + result.data.messageList.total,
			items: [...contents.items, ...result.data.messageList.items],
		})
	}

	useEffect(() => {
		if (data && data.messageList) {
			setContents(data.messageList)
		}
	}, [data])

	if (error) return <p>Error :(</p>

	const columns = [
		{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
		{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
	]

	return (
		<Box className={classes.root}>
			<Loading open={loading} msg={'Loading...'} />
			<Grid container direction='column' className={classes.container}>
				<Grid item>
					<BoxCreate handleCreate={handleCreateMessage} />
				</Grid>
				<Grid item>
					<BoxSearch handleSearch={handleSearch} />
				</Grid>

				{contents && contents.items && (
					<LargeTable
						items={contents.items}
						onClickRow={object => {
							setOpenConfirmModify(true)
							setSelectedMessage(object)
						}}
						handleDeleteRow={object => {
							setOpenConfirmDelete(true)
							setSelectedMessage(object)
						}}
						selectedRow={selectedMessage}
						columns={columns}
						isIconClose={true}
						loadNextPage={loadNextMesagePage}
						hasNextPage={contents.hasNext}
					/>
				)}
			</Grid>

			<DeleteDialog
				open={openConfirmDelete}
				onClose={() => {
					setOpenConfirmDelete(false)
				}}
				onAgree={() => {
					setOpenConfirmDelete(false)
					handleDeleteMessage(selectedMessage.id)
				}}
				onDisagree={() => {
					setOpenConfirmDelete(false)
				}}
			/>
			<ModifyDialog
				open={openConfirmModify}
				onClose={() => {
					setOpenConfirmModify(false)
				}}
				valueDefault={selectedMessage.content}
				onAgree={value => {
					setOpenConfirmModify(false)
					handleUpdateMessage(value)
				}}
				onDisagree={() => {
					setOpenConfirmModify(false)
				}}
			/>
		</Box>
	)
}

export default Message
