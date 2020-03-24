import React from 'react'

const NavBarItem = ({ handleOnChangePage, styles, page, pathname }) => {
	return (
		<li className={styles} onClick={() => handleOnChangePage(pathname)}>
			{page}
		</li>
	)
}

export default NavBarItem
