import React from 'react'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: 82,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottom: '1px solid #e5e5e9',
	},
	infor__name: {
		fontSize: 24,
	},
	infor__avatar: {
		display: 'flex',
		justifyContent: 'center',
		width: 72,
	},
	infor: {
		display: 'flex',
		alignItems: 'center',
	},
}))

const Header = props => {
	const classes = useStyles()
	const {
		selectedUserOfChat: { displayName, id, avatar },
	} = props

	return (
		<Box className={classes.root}>
			<Grid item xs={1} className={classes.infor__avatar}>
				<Avatar size={50} avatar={avatar} status='online' showStatus={true} />
			</Grid>
			<Grid item xs={11}>
				<Typography className={classes.infor__name}>{displayName}</Typography>
			</Grid>
		</Box>
	)
}
export default Header
