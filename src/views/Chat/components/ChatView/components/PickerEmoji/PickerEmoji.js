import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, ClickAwayListener } from '@material-ui/core'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
	},
	areainput__icon: {
		fontSize: 20,
		margin: theme.spacing(0, 1, 0, 2),
		cursor: 'pointer',
	},
}))

const stylePicker = { position: 'absolute', bottom: '30px', right: '10px' }

const PickerEmoji = ({ handleAddEmoji }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const handleSelect = value => {
		handleAddEmoji(value)
	}

	const handleClickAway = () => {
		setOpen(false)
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box className={classes.root}>
				<InsertEmoticonIcon
					className={classes.areainput__icon}
					onClick={() => setOpen(!open)}
				/>
				{open && (
					<Picker
						set='facebook'
						style={stylePicker}
						onSelect={handleSelect}
						title='Pick your emoji…'
						emoji='point_up'
						emojiSize={24}
					/>
				)}
			</Box>
		</ClickAwayListener>
	)
}

export default PickerEmoji

PickerEmoji.propTypes = {
	handleAddEmoji: PropTypes.func,
}

PickerEmoji.defaultProps = {
	handleAddEmoji: () => {},
}
