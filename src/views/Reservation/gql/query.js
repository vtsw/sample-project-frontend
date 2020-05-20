import gql from 'graphql-tag'

const GET_RESERVATION_QUEUE = gql`
	query {
		reservationQueue @client {
			items {
				id
				type
				patient
				doctor
				time
				unixTime
			}
		}
	}
`

const GET_RESERVATION_LIST = gql`
	query GetReservationList($query: ReservationRequestListInput!) {
		reservationRequestList(query: $query) {
			items {
				id
				payload {
					patient
					bookingOptions {
						doctor
						time
					}
				}
			}
			hasNext
			total
		}
	}
`

export { GET_RESERVATION_QUEUE, GET_RESERVATION_LIST }
