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
	query GetReservationList($query: ReservationListInput!) {
		reservationList(query: $query) {
			items {
				id
				timestamp
				type
				corId
				content {
					zaloPatientId
					zaloDoctorId
					reservationTime
				}
			}
			hasNext
			total
		}
	}
`

export { GET_RESERVATION_QUEUE, GET_RESERVATION_LIST }
