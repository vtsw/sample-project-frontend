import React, { useEffect } from 'react'
import { format } from 'date-fns/esm'

import { useQuery } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable, Loading } from '@views_components'

import { GET_RESERVATION_LIST } from '@views/Reservation/gql/query'
import { ON_RESERVATION_CONFIRMED } from '@views/Reservation/gql/subscription'
import { PAGE_LIMIT, NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '49%',
		border: `1px solid ${theme.palette.common.border}`,
	},
	listtitle: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100% - 80px)',
	},
}))

const tableHeaders = [
	{ headerLabel: 'PATIENT', xs: 4, headerVariable: 'patient' },
	{ headerLabel: 'DOCTOR', xs: 4, headerVariable: 'doctor' },
	{ headerLabel: 'TIME', xs: 4, headerVariable: 'time' },
]

const ConfirmedReservationList = () => {
	const classes = useStyles()

	const {
		loading,
		error,
		data,
		fetchMore,
		subscribeToMore,
		networkStatus,
	} = useQuery(GET_RESERVATION_LIST, {
		variables: {
			query: {
				limit: PAGE_LIMIT,
			},
		},
		notifyOnNetworkStatusChange: true,
		onError: err => {
			alert(err)
		},
	})

	useEffect(() => {
		subscribeToMore({
			document: ON_RESERVATION_CONFIRMED,
			shouldResubscribe: true,
			updateQuery: (prev, { subscriptionData }) => {
				let reservation = subscriptionData.data.onReservationConfirmed
				return Object.assign({}, prev, {
					reservationList: {
						...prev.reservationList,
						items:
							prev.reservationList.items.filter(
								item => item.id === reservation.id
							).length === 0
								? [reservation, ...prev.reservationList.items]
								: prev.reservationList.items,
					},
				})
			},
		})
	}, [subscribeToMore])

	const convertReservationList = reservationList => {
		return reservationList.map(item => ({
			id: item.id,
			patient: item.patient.displayName,
			doctor: item.doctor.name,
			time: format(
				new Date(parseInt(item.reservationTime)),
				'HH:mm - dd/MM/yyyy'
			),
		}))
	}

	const loadNextReservationPage = () => {
		try {
			fetchMore({
				variables: {
					query: {
						limit: PAGE_LIMIT,
						skip: data.reservationList.items.length,
					},
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
						ConfirmedReservationList Total {data.reservationList.items.length}
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

export default ConfirmedReservationList
