import React, { useState } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import {
	CVTable,
	DeleteDialog,
	ModifyDialog,
	SearchBox,
} from '@views_components'
import { TABLE_TYPES } from '@src/shares/types'

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	full_height: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(3),
	},
	overlay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
		marginLeft: theme.spacing(1.5),
	},
	user_list__container: {
		display: 'flex',
		flexDirection: 'column',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
	},
	message_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
	},
	search_box: {
		padding: theme.spacing(3),
	},
	message_list__title: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
}))

const user = [
	{ id: 1, email: 'test@test.com', name: 'test' },
	{ id: 2, email: 'test@test.com', name: 'test' },
	{ id: 3, email: 'test@test.com', name: 'test' },
	{ id: 4, email: 'test@test.com', name: 'test' },
	{ id: 5, email: 'test@test.com', name: 'test' },
	{ id: 6, email: 'test@test.com', name: 'test' },
	{ id: 21, email: 'test@test.com', name: 'test' },
	{ id: 31, email: 'test@test.com', name: 'test' },
	{ id: 41, email: 'test@test.com', name: 'test' },
	{ id: 51, email: 'test@test.com', name: 'test' },
	{ id: 61, email: 'test@test.com', name: 'test' },
	{ id: 22, email: 'test@test.com', name: 'test' },
	{ id: 32, email: 'test@test.com', name: 'test' },
	{ id: 42, email: 'test@test.com', name: 'test' },
	{ id: 52, email: 'test@test.com', name: 'test' },
	{ id: 62, email: 'test@test.com', name: 'test' },
	{ id: 23, email: 'test@test.com', name: 'test' },
	{ id: 33, email: 'test@test.com', name: 'test' },
	{ id: 43, email: 'test@test.com', name: 'test' },
	{ id: 53, email: 'test@test.com', name: 'test' },
	{ id: 63, email: 'test@test.com', name: 'test' },
	{ id: 24, email: 'test@test.com', name: 'test' },
	{ id: 34, email: 'test@test.com', name: 'test' },
	{ id: 44, email: 'test@test.com', name: 'test' },
	{ id: 54, email: 'test@test.com', name: 'test' },
	{ id: 64, email: 'test@test.com', name: 'test' },
	{ id: 25, email: 'test@test.com', name: 'test' },
	{ id: 35, email: 'test@test.com', name: 'test' },
	{ id: 45, email: 'test@test.com', name: 'test' },
	{ id: 55, email: 'test@test.com', name: 'test' },
	{ id: 65, email: 'test@test.com', name: 'test' },
	{ id: 26, email: 'test@test.com', name: 'test' },
	{ id: 36, email: 'test@test.com', name: 'test' },
	{ id: 46, email: 'test@test.com', name: 'test' },
	{ id: 56, email: 'test@test.com', name: 'test' },
	{ id: 66, email: 'test@test.com', name: 'test' },
]

const message = [
	{ id: 111, email: '2020/02/30', name: 'test' },
	{ id: 211, email: '2020/02/30', name: 'test' },
	{ id: 311, email: '2020/02/30', name: 'test' },
	{ id: 411, email: '2020/02/30', name: 'test' },
	{ id: 511, email: '2020/02/30', name: 'test' },
	{ id: 611, email: '2020/02/30', name: 'test' },
	{ id: 121, email: '2020/02/30', name: 'test' },
	{ id: 221, email: '2020/02/30', name: 'test' },
	{ id: 321, email: '2020/02/30', name: 'test' },
	{ id: 421, email: '2020/02/30', name: 'test' },
	{ id: 521, email: '2020/02/30', name: 'test' },
	{ id: 621, email: '2020/02/30', name: 'test' },
	{ id: 112, email: '2020/02/30', name: 'test' },
	{ id: 212, email: '2020/02/30', name: 'test' },
	{ id: 312, email: '2020/02/30', name: 'test' },
	{ id: 412, email: '2020/02/30', name: 'test' },
	{ id: 512, email: '2020/02/30', name: 'test' },
	{ id: 612, email: '2020/02/30', name: 'test' },
	{ id: 113, email: '2020/02/30', name: 'test' },
	{ id: 213, email: '2020/02/30', name: 'test' },
	{ id: 313, email: '2020/02/30', name: 'test' },
	{ id: 413, email: '2020/02/30', name: 'test' },
	{ id: 513, email: '2020/02/30', name: 'test' },
	{ id: 613, email: '2020/02/30', name: 'test' },
	{ id: 114, email: '2020/02/30', name: 'test' },
	{ id: 214, email: '2020/02/30', name: 'test' },
	{ id: 314, email: '2020/02/30', name: 'test' },
	{ id: 414, email: '2020/02/30', name: 'test' },
	{ id: 514, email: '2020/02/30', name: 'test' },
	{ id: 614, email: '2020/02/30', name: 'test' },
]

const Main = () => {
	const classes = useStyle()
	const [selectedUser, setSelectedUser] = useState('')
	const [selectedMessage, setSelectedMessage] = useState('')
	const [searchVal, setSearchVal] = useState('')
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

	const onSelectAMessage = id => {
		setSelectedMessage(id)
		setModifyDialogVisible(true)
	}
	return (
		<Box className={classes.root}>
			<Grid container className={clsx(classes.full_height, classes.container)}>
				<Grid item xs={4}>
					<Box
						className={clsx(classes.user_list__container, classes.full_height)}
					>
						<Box className={classes.search_box}>
							<SearchBox width={390} onSearch={setSearchVal} />
						</Box>
						<CVTable
							type={TABLE_TYPES.USER_INFO}
							tableData={user}
							tableHeight='calc(100vh - 210px)'
							selectedItem={selectedUser}
							setSelectedItem={setSelectedUser}
						/>
					</Box>
				</Grid>
				<Grid item xs={8}>
					{selectedUser ? (
						<Box
							className={clsx(
								classes.message_list__container,
								classes.full_height
							)}
						>
							<Typography variant='h5' className={classes.message_list__title}>
								Total {message.length}
							</Typography>

							<CVTable
								type={TABLE_TYPES.MESSAGE}
								tableData={message}
								tableHeight='calc(100vh - 185px)'
								selectedItem={selectedMessage}
								setSelectedItem={onSelectAMessage}
								setDeleteDialogVisible={setDeleteDialogVisible}
							/>
							<DeleteDialog
								open={deleteDialogVisible}
								onClose={() => {
									setDeleteDialogVisible(false)
								}}
								onAgree={() => {
									setDeleteDialogVisible(false)
								}}
								onDisagree={() => {
									setDeleteDialogVisible(false)
								}}
							/>
							<ModifyDialog
								open={modifyDialogVisible}
								onClose={() => {
									setModifyDialogVisible(false)
								}}
								onAgree={() => {
									setModifyDialogVisible(false)
								}}
								onDisagree={() => {
									setModifyDialogVisible(false)
								}}
							/>
						</Box>
					) : (
						<Box className={classes.overlay}>
							<Typography variant='subtitle2' color='primary' gutterBottom>
								Select an item on the left.
							</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}
export default Main
