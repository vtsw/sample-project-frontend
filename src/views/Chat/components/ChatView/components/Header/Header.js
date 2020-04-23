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

export default function Header() {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Grid items xs={8} className={classes.root__infor}>
				<Grid item className={classes.root__infor__avatar}>
					<Avatar
						size={50}
						imgUrl='http://s120-ava-talk.zadn.vn/3/e/5/2/2/120/c181045e8a31aa07c65e25d88bd249e6.jpg'
						status='online'
						showStatus={true}
					/>
				</Grid>
				<Grid item xs={9}>
					<Typography className={classes.root__infor__name}>
						Nguyễn Văn Đại
					</Typography>
				</Grid>
			</Grid>
			<Grid items xs={4} />
		</Box>
	)
}
