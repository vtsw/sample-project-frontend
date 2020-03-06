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
		border: `1px solid ${theme.palette.common.gray}`,
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

	search: {
		padding: '16px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
	},
	save: {
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

const Message = () => {
	const classes = useStyle()
	return (
		<Box className={classes.root}>
			<Grid container direction='column'>
				<Grid item>
					{' '}
					<Grid container alignItems='stretch' className={classes.save}>
						<TextField
							variant='outlined'
							label='Text'
							placeholder='text...'
							type='text'
						/>
						<Button variant='contained' className={classes.button}>
							<Typography variant='caption'>Save</Typography>
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					{' '}
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
				</Grid>
				<Grid item>
					<ListMessage />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Message
