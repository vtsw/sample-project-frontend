import React from 'react'

import { IconButton } from '@material-ui/core'
import { Schedule } from '@material-ui/icons'

const SendReservationButton = props => {
	const { onClick } = props

	return (
		<IconButton aria-label='upload image' component='span' onClick={onClick}>
			<Schedule />
		</IconButton>
	)
}

export default SendReservationButton
