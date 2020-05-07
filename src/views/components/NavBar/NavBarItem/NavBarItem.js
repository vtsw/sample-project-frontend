import React from 'react'
import { MessageNoti } from '@views_components'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root__boxmesssage: { position: 'absolute', top: 10, right: 0 },

	tab: {
		position: 'relative',
		fontSize: theme.typography.htmlFontSize,
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.common.white,
		cursor: 'pointer',
		padding: theme.spacing(3, 1.5),
		textAlign: 'center',
		transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
		'&:last-child': {
			position: 'absolute',
			bottom: 0,
		},
	},
	active: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
	},
}))

const NavBarItem = props => {
	const { currentPage, page, pathname, handleOnChangePage, numberNoti } = props
	const classes = useStyles()
	return (
		<li
			data-cy={`${page}-page`}
			className={`${classes.tab} ${currentPage === pathname && classes.active}`}
			onClick={() => handleOnChangePage(pathname)}
		>
			{page}
			{!!numberNoti && page === 'chat' && (
				<Box className={classes.root__boxmesssage}>
					<MessageNoti numberNoti={numberNoti} />
				</Box>
			)}
		</li>
	)
}

export default NavBarItem
