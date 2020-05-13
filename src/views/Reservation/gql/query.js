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

export { GET_RESERVATION_QUEUE }
