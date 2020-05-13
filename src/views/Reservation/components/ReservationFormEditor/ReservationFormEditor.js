import 'date-fns'
import React, { useReducer } from 'react'
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
	Radio,
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
	container__patient__doctor: {
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

const initialState = {
	type: 'examination',
	patient: '',
	doctor: '',
	time: new Date('2020-01-01T00:00:00'),
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_TYPE':
			return { ...state, type: action.payload }
		case 'SET_PATIENT':
			return { ...state, patient: action.payload }
		case 'SET_DOCTOR':
			return { ...state, doctor: action.payload }
		case 'SET_DATE_TIME':
			return { ...state, time: action.payload }
		case 'RESET_STATE':
			return initialState
		default:
			return state
	}
}

const ReservationFormEditor = props => {
	const classes = useStyles()
	const { patients, doctors, handleOnCreateReservation } = props
	const [state, dispatch] = useReducer(reducer, initialState)

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
						value={state.type}
						className={classes.container__reservationtype}
						onChange={e =>
							dispatch({ type: 'SET_TYPE', payload: e.target.value })
						}
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
				<Grid className={classes.container__patient__doctor}>
					<FormControl variant='outlined' className={classes.formitem}>
						<InputLabel id='patient-input-label'>Patient</InputLabel>
						<Select
							label='Patient'
							labelId='patient-input-label'
							value={state.patient}
							onChange={e =>
								dispatch({ type: 'SET_PATIENT', payload: e.target.value })
							}
						>
							{patients.map(({ id, value, label }) => (
								<MenuItem key={id} value={value}>
									{label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl variant='outlined' className={classes.formitem}>
						<InputLabel id='doctor-input-label'>Doctor</InputLabel>
						<Select
							label='Doctor'
							labelId='doctor-input-label'
							value={state.doctor}
							onChange={e =>
								dispatch({ type: 'SET_DOCTOR', payload: e.target.value })
							}
						>
							{doctors.map(({ id, value, label }) => (
								<MenuItem key={id} value={value}>
									{label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid className={classes.container__patient__doctor}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='dd/MM/yyyy'
							margin='normal'
							label='Reservation date'
							value={state.time}
							onChange={date =>
								dispatch({ type: 'SET_DATE_TIME', payload: date })
							}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							className={classes.formitem}
						/>
						<KeyboardTimePicker
							margin='normal'
							id='time-picker'
							label='Reservation time'
							value={state.time}
							onChange={time =>
								dispatch({ type: 'SET_DATE_TIME', payload: time })
							}
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
					color='primary'
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={() => handleOnCreateReservation(state)}
				>
					Create
				</Button>
				<Button
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={() => dispatch({ type: 'RESET_STATE' })}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	)
}

export default ReservationFormEditor
