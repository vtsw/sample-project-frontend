import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FormEditor from '@components/FormEditor'
import SearchBox from '@components/SearchBox'
import CVTable from '@components/CVTable'
import { WelcomeDialog } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	full_screen_height: {
		height: '100vh',
	},
	full_height: {
		height: '100%',
	},
	container: {
		padding: theme.spacing(3),
	},
	sign_up__container: {
		display: 'flex',
		alignItems: 'center',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: 12,
		position: 'relative',
	},
	user_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: 12,
		overflow: 'hidden',
	},
	searchbox: {
		width: '100%',
		padding: theme.spacing(3),
	},
	searchbox__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
}))

const User = () => {
	const classes = useStyles()
	const [dialogVisible, setDialogVisible] = useState(true)
	const [selectedItem, setSelectedItem] = useState('')

	return (
		<Box className={classes.root}>
			<Grid
				container
				className={clsx(classes.full_screen_height, classes.container)}
			>
				<Grid item xs={4}>
					<Box
						className={clsx(classes.sign_up__container, classes.full_height)}
					>
						{dialogVisible ? (
							<WelcomeDialog setDialogVisible={setDialogVisible} />
						) : null}
						<FormEditor selectedItem={selectedItem} />
					</Box>
				</Grid>
				<Grid item xs={8}>
					<Box
						className={clsx(classes.user_list__container, classes.full_height)}
					>
						<Box className={classes.searchbox}>
							<Typography variant='h5' className={classes.searchbox__title}>
								User List
							</Typography>
							<SearchBox width={400} />
						</Box>
						<CVTable
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

User.propsTypes = {}

export default User
