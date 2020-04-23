import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import FriendTag from '../FriendTag/FriendTag'
import Filter from '../Filter/Filter'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	root__listfriend: {
		width: '332px',
	},
	root__chatview: {
		display: 'flex',
		flex: 1,
	},
}))

const dataExample = [
	{ name: 'Nguyễn Văn Đại' },
	{ name: 'Đại Nguyễn Văn' },
	{ name: 'Trần Văn Văn' },
]

export default function ListFriendTag() {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Filter />
			{dataExample.map(item => (
				<FriendTag key={item.name} {...item} />
			))}
		</Box>
	)
}
