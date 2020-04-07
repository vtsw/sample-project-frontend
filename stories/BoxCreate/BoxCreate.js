import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import ActionInputBox from '../../src/views/components/ActionInputBox'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))

const BoxCreate = props => {
	const {
		type = 'create',
		placeholder = '',
		defaultValue = '',
		width = 328,
		onSubmit,
		onChange = () => {},
	} = props

	const classes = useStyles()
	return (
		<Grid container alignItems='stretch' className={classes.root}>
			<ActionInputBox
				type={type}
				placeholder={placeholder}
				defaultValue={defaultValue}
				width={width}
				onSubmit={onSubmit}
				onChange={onChange}
			/>
		</Grid>
	)
}
export default BoxCreate

BoxCreate.propTypes = {
	handleCreate: PropTypes.func.isRequired,
	defaultValue: PropTypes.string,
}
BoxCreate.defaultProps = {
	defaultValue: '',
}
