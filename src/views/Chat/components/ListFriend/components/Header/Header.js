import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import GroupAddIcon from '@material-ui/icons/GroupAdd'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '82px',
		borderBottom: '1px solid #e5e5e9',
		justifyContent: 'center',
		padding: '0 16px',
	},
	tool: {
		marginTop: 4,
		display: 'flex',
	},
	name: {
		fontSize: 20,
		fontWeight: '500',
	},
	tool__groupicon: {
		fontSize: 25,
		color: '#4a4a4a',
		margin: '0px 4px',
		cursor: 'pointer',
	},
	tool__boxinput: {
		flex: 1,
		paddingRight: 4,
	},
	tool__input: {
		width: '100%',
		border: 'none',
		background: '#ededed',
		padding: '4px 8px',
		borderRadius: ' 10px',
	},
}))

const Header = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Typography className={classes.name}>Zalo - User Name</Typography>
			<Box className={classes.tool}>
				<Box className={classes.tool__boxinput}>
					<input
						placeholder='Tìm bạn bè, nhóm và tin nhắn'
						className={classes.tool__input}
					/>
				</Box>
				<PersonAddIcon className={classes.tool__groupicon} />
				<GroupAddIcon className={classes.tool__groupicon} />
			</Box>
		</Box>
	)
}
export default Header
