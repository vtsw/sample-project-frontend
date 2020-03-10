import React, { useState } from 'react'
import clsx from 'clsx'
import {
	Box,
	Grid,
	makeStyles,
	Typography,
	TextField,
	Button,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { CVTable, DeleteDialog, ModifyDialog } from '@views_components'
// import { ListDetailUsers } from './components'
import { TABLE_TYPES } from '@src/shares/types'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
	},
	div: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
	},
	container: {
		height: '100%',
		padding: '16px',
	},
	search_box: {
		paddingRight: '16px',
	},
	search_box__input: {
		border: `1px solid ${theme.palette.common.border}`,

		height: '100%',
	},
	search: {
		padding: '16px',
	},
	icon: {
		fontSize: '40px',
	},
	button: {
		color: theme.palette.common.white,
		marginLeft: '8px',
		width: '56px',
		boxShadow: 'none',
		background: theme.palette.common.gray,
		'&:hover': {
			background: theme.palette.common.gray,
		},
	},
	typography: {
		fontWeight: 700,
	},
	typography_email: {
		padding: '16px',
	},
	user_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: 12,
		overflow: 'hidden',
		height: '100%',
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
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

	const onSelectAMessage = id => {
		setSelectedMessage(id)
		setModifyDialogVisible(true)
	}
	return (
		<Box className={classes.root}>
			<Grid
				container
				alignItems='stretch'
				className={classes.container}
				// spacing="3"
			>
				<Grid item xs={4} className={classes.search_box}>
					<Grid
						direction='column'
						container
						alignItems='stretch'
						className={classes.search_box__input}
					>
						<Grid container alignItems='stretch' className={classes.search}>
							<TextField
								variant='outlined'
								label='Search'
								placeholder='search...'
								type='search'
							/>
							<Button variant='contained' className={classes.button}>
								<SearchIcon className={classes.icon} />
							</Button>
						</Grid>
						<CVTable
							type={TABLE_TYPES.USER_INFO}
							tableData={user}
							tableHeight='calc(100vh - 170px)'
							selectedItem={selectedUser}
							setSelectedItem={setSelectedUser}
						/>
					</Grid>
				</Grid>
				<Grid item xs={8}>
					{selectedUser ? (
						<Box
							className={clsx(
								classes.user_list__container,
								classes.full_height
							)}
						>
							<Box className={classes.searchbox}>
								<Typography
									variant='h5'
									className={clsx(classes.typography, classes.typography_email)}
								>
									Total {message.length}
								</Typography>
							</Box>
							<CVTable
								type={TABLE_TYPES.MESSAGE}
								tableData={message}
								tableHeight='calc(100vh - 148px)'
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
						<div className={classes.div}>
							<Typography variant='subtitle2' color='primary' gutterBottom>
								Select an item on the left.
							</Typography>
						</div>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}
export default Main
