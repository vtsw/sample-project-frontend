import React from 'react'

import { Button } from '@material-ui/core'

const NavBarItem = props => {
	const { styles, page, pathname, handleOnChangePage } = props

	return (
		<Button
			color='primary'
			data-cy={`${page}-page`}
			className={styles}
			onClick={() => handleOnChangePage(pathname)}
		>
			{page}
		</Button>
	)
}

export default NavBarItem
