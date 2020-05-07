import React from 'react'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { Avatar } from '@views_components'

Header.propTypes = {}

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
	root__infor__name: {
		fontSize: 24,
	},
	root__infor__avatar: {
		display: 'flex',
		justifyContent: 'center',
		width: 72,
	},
	root__infor: {
		display: 'flex',
		alignItems: 'center',
	},
}))

export default function Header(props) {
	const classes = useStyles()
	const {
		selectedUserOfChat: { displayName, id, avatar },
	} = props

	return (
		<Box className={classes.root}>
			<Grid item xs={1} className={classes.root__infor__avatar}>
				<Avatar size={50} avatar={avatar} status='online' showStatus={true} />
			</Grid>
			<Grid item xs={11}>
				<Typography className={classes.root__infor__name}>
					{displayName}
				</Typography>
			</Grid>
		</Box>
	)
}
