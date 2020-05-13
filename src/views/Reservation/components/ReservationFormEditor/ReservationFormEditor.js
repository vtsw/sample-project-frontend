import 'date-fns'
import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
	Box,
	Grid,
	Button,
	Typography,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Checkbox,
	FormControlLabel,
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
		width: '90%',
		margin: '20px auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	formtitle: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	container__doctor__patient: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing(1),
	},
	container__reservationtype: {
		flexDirection: 'row',
		marginTop: theme.spacing(2),
	},
	formitem: {
		width: '48%',
	},
	container__buttons: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
	},
	item__button: {
		width: '48%',
		marginTop: theme.spacing(2),
		color: theme.palette.common.white,
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const ReservationFormEditor = props => {
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
			<Typography variant='h5' className={classes.formtitle}>
				Reservation
			</Typography>
			<Grid container direction='column'>
				<FormControl component='fieldset'>
					<RadioGroup
						aria-label='reservation-type'
						name='reservation type'
						value={reservationType}
						className={classes.container__reservationtype}
						onChange={handleRadioChange}
					>
						<FormControlLabel
							value='examination'
							control={<Checkbox color='primary' />}
							label='Examination'
						/>
						<FormControlLabel
							value='treatment'
							control={<Checkbox color='primary' />}
							label='Treatment'
						/>
					</RadioGroup>
				</FormControl>
				<Grid className={classes.container__doctor__patient}>
					<FormControl variant='outlined' className={classes.formitem}>
						<InputLabel id='doctor-input-label'>Doctor</InputLabel>
						<Select
							labelId='doctor-input-label'
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
					<FormControl variant='outlined' className={classes.formitem}>
						<InputLabel id='patient-input-label'>Patient</InputLabel>
						<Select
							labelId='patient-input-label'
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
				</Grid>
				<Grid className={classes.container__doctor__patient}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='dd/MM/yyyy'
							margin='normal'
							label='Reservation date'
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							className={classes.formitem}
						/>
						<KeyboardTimePicker
							margin='normal'
							id='time-picker'
							label='Reservation time'
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change time',
							}}
							className={classes.formitem}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			</Grid>
			<Box className={classes.container__buttons}>
				<Button
					data-testid='formeditor-submit-button'
					color='primary'
					variant='contained'
					size='small'
					fullWidth
					className={classes.item__button}
					onClick={handleOnSubmit}
				>
					Submit
				</Button>
				<Button
					data-testid='formeditor-cancel-button'
					variant='contained'
					size='small'
					fullWidth
					className={classes.item__button}
					onClick={handleOnCancel}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	)
}

export default ReservationFormEditor
