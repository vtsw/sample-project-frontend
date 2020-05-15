import React from 'react'
import { MessageNoti } from '@views_components'
import { Box, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	boxmesssage: { position: 'absolute', top: 10, right: 0 },
}))

const NavBarItem = props => {
	const { styles, page, pathname, handleOnChangePage, numberNoti } = props
	const classes = useStyles()
	return (
		<Button
			data-testid={`navbaritem-${page}`}
			color='primary'
			className={styles}
			onClick={() => handleOnChangePage(pathname)}
		>
			{page}
			{!!numberNoti && page === 'chat' && (
				<Box className={classes.boxmesssage}>
					<MessageNoti numberNoti={numberNoti} />
				</Box>
			)}
		</Button>
	)
}

export default NavBarItem
