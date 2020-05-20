import React from 'react'
import { format } from 'date-fns/esm'

import { useQuery } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable, Loading } from '@views_components'

import { GET_RESERVATION_LIST } from '@views/Reservation/gql/query'
import { PAGE_LIMIT, NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		border: `1px solid ${theme.palette.common.border}`,
	},
	listtitle: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100vh - 130px)',
	},
}))

const tableHeaders = [
	{ headerLabel: 'PATIENT', xs: 4, headerVariable: 'patient' },
	{ headerLabel: 'DOCTOR', xs: 4, headerVariable: 'doctor' },
	{ headerLabel: 'TIME', xs: 4, headerVariable: 'time' },
]

const ReservationList = () => {
	const classes = useStyles()

	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		GET_RESERVATION_LIST,
		{
			variables: {
				query: {
					limit: PAGE_LIMIT,
				},
			},
			notifyOnNetworkStatusChange: true,
			onError: err => {
				alert(err)
			},
		}
	)

	const convertReservationList = reservationList => {
		return reservationList.map(({ id, content }) => ({
			id,
			patient: content.zaloPatientId,
			doctor: content.zaloDoctorId,
			time: format(
				new Date(parseInt(content.reservationTime)),
				'HH:mm - dd/MM/yyyy'
			),
		}))
	}

	const loadNextReservationPage = () => {
		try {
			fetchMore({
				variables: {
					query: { limit: PAGE_LIMIT, skip: data.reservationList.items.length },
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev
					const fetchedReservationList = fetchMoreResult.reservationList
					let cacheReservationList = prev.reservationList

					const items = [
						...cacheReservationList.items,
						...fetchedReservationList.items,
					]
					const hasNext = fetchedReservationList.hasNext
					const total =
						cacheReservationList.total + fetchedReservationList.total
					return {
						reservationList: {
							...cacheReservationList,
							items,
							hasNext,
							total,
						},
					}
				},
			})
		} catch (error) {
			alert(error.message)
		}
	}

	if (error) return <div>Error :(</div>

	return (
		<Box className={classes.root}>
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Loading open={true} msg={'Loading...'} />
			) : (
				<>
					<Typography variant='h5' className={classes.listtitle}>
						Total {data.reservationList.total}
					</Typography>
					<Box className={classes.reservationqueue__table}>
						<InfiniteTable
							items={convertReservationList(data.reservationList.items)}
							columns={tableHeaders}
							loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
							loadNextPage={loadNextReservationPage}
							hasNextPage={data.reservationList.hasNext}
						/>
					</Box>
				</>
			)}
		</Box>
	)
}

export default ReservationList
