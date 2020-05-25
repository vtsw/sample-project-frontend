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
	query ReservationList($query: ReservationListInput!) {
		reservationList(query: $query) {
			items {
				id
				type
				doctor {
					id
					name
				}
				patient {
					id
					displayName
				}
				reservationTime
			}
			hasNext
			total
		}
	}
`

export { GET_RESERVATION_QUEUE, GET_RESERVATION_LIST }
