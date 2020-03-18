import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'gray',
		opacity: 0.9,
		zIndex: 1000,
	},
})
export default function Loading({ open, msg }) {
	const classes = useStyles()
	return open && <div className={classes.root}>{msg}</div>
}
