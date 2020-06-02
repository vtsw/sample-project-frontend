import gql from 'graphql-tag'

const CREATE_RESERVATION_REQUEST = gql`
	mutation CreateReservationRequest($reservation: ReservationRequestInput!) {
		createReservationRequest(reservation: $reservation) {
			id
			patient {
				id
				avatar
				displayName
			}
			doctors {
				id
				name
				time
			}
		}
	}
`

const CREATE_RESERVATION = gql`
	mutation CreateReservation($reservation: ReservationInput!) {
		createReservation(reservation: $reservation) @client
	}
`

const RESET_RESERVATION_QUEUE = gql`
	mutation {
		resetReservationQueue @client
	}
`

export {
	CREATE_RESERVATION_REQUEST,
	CREATE_RESERVATION,
	RESET_RESERVATION_QUEUE,
}
