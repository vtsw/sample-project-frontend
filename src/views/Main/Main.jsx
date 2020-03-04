import React, { useState } from 'react'
import {
	Box,
	Grid,
	makeStyles,
	Typography,
	TextField,
	Button,
} from '@material-ui/core'
import ListUsers from './components/ListUsers'
import SearchIcon from '@material-ui/icons/Search'
import { ListDetailUsers } from './components'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
	},
	div: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'black',
		height: '100%',
	},
	container: {
		height: '100%',
		padding: '16px',
	},
	column1: {
		paddingRight: '16px',
	},
	column11: {
		border: `1px solid ${theme.palette.common.gray}`,

		height: '100%',
	},
	search: {
		padding: '16px',
	},
	button: {
		color: 'white',
		marginLeft: '8px',
		background: theme.palette.common.gray,
		'&:hover': {
			background: theme.palette.common.gray,
		},
	},
}))
const Main = () => {
	const classes = useStyle()
	const [itemChosen, setitemChosen] = useState('')
	return (
		<Box className={classes.root}>
			<Grid
				container
				alignItems='stretch'
				className={classes.container}
				// spacing="3"
			>
				<Grid item xs={4} className={classes.column1}>
					<Grid
						direction='column'
						container
						alignItems='stretch'
						className={classes.column11}
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
						<ListUsers itemChosen={itemChosen} setitemChosen={setitemChosen} />
					</Grid>
				</Grid>
				<Grid item xs={8}>
					{itemChosen ? (
						<ListDetailUsers />
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
