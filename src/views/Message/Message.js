import React from 'react'
import {
	Box,
	Grid,
	makeStyles,
	TextField,
	Button,
	Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { ListMessage } from './components'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
		margin: '16px',
		border: `1px solid #979797`,
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
	icon: {
		fontSize: '40px',
	},
	search: {
		padding: '16px',
		borderTop: `1px solid #979797`,
	},
	save: {
		padding: '16px',
	},
	buttonSearch: {
		color: theme.palette.common.white,
		marginLeft: '8px',
		width: '56px',
		boxShadow: 'none',
		background: theme.palette.common.gray,
		'&:hover': {
			background: theme.palette.common.gray,
		},
	},
	textField: {
		width: '328px',
	},
	buttonSave: {
		color: theme.palette.common.white,
		marginLeft: '8px',
		width: '56px',
		boxShadow: 'none',
		textTransform: 'none',
		background: theme.palette.common.green,
		'&:hover': {
			background: theme.palette.common.green,
		},
	},
}))

const Message = () => {
	const classes = useStyle()
	return (
		<Box className={classes.root}>
			<Grid container direction='column'>
				{/* Save Message */}
				<Grid item>
					{' '}
					<Grid container alignItems='stretch' className={classes.save}>
						<TextField
							variant='outlined'
							label='Text'
							placeholder='text...'
							type='text'
							className={classes.textField}
						/>
						<Button variant='contained' className={classes.buttonSave}>
							<Typography variant='caption'>Save</Typography>
						</Button>
					</Grid>
				</Grid>
				{/* Search Message */}
				<Grid item>
					{' '}
					<Grid container alignItems='stretch' className={classes.search}>
						<TextField
							variant='outlined'
							label='Search'
							placeholder='search...'
							type='search'
							className={classes.textField}
						/>
						<Button variant='contained' className={classes.buttonSearch}>
							<SearchIcon className={classes.icon} />
						</Button>
					</Grid>
				</Grid>
				{/* View ListMessage */}
				<Grid item>
					<ListMessage />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Message
