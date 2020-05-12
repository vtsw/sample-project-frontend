import 'date-fns'
import React, { useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
	Box,
	Button,
	TextField,
	Typography,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Checkbox,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
	root: {
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	formtitle: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	forminput: {
		width: '100%',
		marginTop: 18,
	},
	formcontent: {
		padding: 0,
		width: '100%',
	},
	formbuttons: {
		display: 'flex',
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: theme.spacing(2),
			marginLeft: 0,
			'&:not(:first-child)': {
				marginLeft: 8,
			},
		},
	},
	formbutton: {
		color: theme.palette.common.white,
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const ReservationFormEditor = props => {
	const {
		selectedUser = {
			id: '',
			email: '',
			name: '',
		},
		onSubmit,
		onCancel,
		onDelete,
	} = props
	const classes = useStyles()

	const [age, setAge] = React.useState('')
	const [reservationType, setReservationType] = useState('')

	const handleChange = event => {
		setAge(event.target.value)
	}

	const handleOnSubmit = () => {}

	const handleOnCancel = () => {}

	const [selectedDate, setSelectedDate] = React.useState(
		new Date('2014-08-18T21:11:54')
	)

	const handleDateChange = date => {
		setSelectedDate(date)
	}

	const handleRadioChange = e => {
		setReservationType(e.target.value)
	}

	return (
		<Box className={classes.root}>
			<Typography
				data-testid='formeditor-title'
				variant='h5'
				className={classes.formtitle}
			>
				Reservation
			</Typography>
			<div className={classes.formcontent}>
				<FormControl variant='outlined' className={classes.forminput}>
					<InputLabel id='demo-simple-select-outlined-label'>Doctor</InputLabel>
					<Select
						labelId='demo-simple-select-outlined-label'
						id='demo-simple-select-outlined'
						value={age}
						onChange={handleChange}
						label='Doctor'
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<FormControl variant='outlined' className={classes.forminput}>
					<InputLabel id='demo-simple-select-outlined-label'>
						Patient
					</InputLabel>
					<Select
						labelId='demo-simple-select-outlined-label'
						id='demo-simple-select-outlined'
						value={age}
						onChange={handleChange}
						label='Patient'
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant='inline'
						format='dd/MM/yyyy'
						margin='normal'
						id='date-picker-inline'
						label='Date picker inline'
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						className={classes.forminput}
					/>
					<KeyboardTimePicker
						margin='normal'
						id='time-picker'
						label='Time picker'
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change time',
						}}
						className={classes.forminput}
					/>
				</MuiPickersUtilsProvider>
				<FormControl component='fieldset' className={classes.formControl}>
					<RadioGroup
						aria-label='quiz'
						name='quiz'
						value={reservationType}
						onChange={handleRadioChange}
					>
						<FormControlLabel
							value='examination'
							control={<Radio color='primary' />}
							label='Examination'
						/>
						<FormControlLabel
							value='treatment'
							control={<Radio color='primary' />}
							label='Treatment'
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<div className={classes.formbuttons}>
				<Button
					data-testid='formeditor-submit-button'
					color='primary'
					variant='contained'
					size='small'
					fullWidth
					className={classes.formbutton}
					onClick={handleOnSubmit}
				>
					Submit
				</Button>
				<Button
					data-testid='formeditor-cancel-button'
					variant='contained'
					size='small'
					fullWidth
					className={classes.formbutton}
					onClick={handleOnCancel}
				>
					Cancel
				</Button>
			</div>
		</Box>
	)
}

export default ReservationFormEditor
