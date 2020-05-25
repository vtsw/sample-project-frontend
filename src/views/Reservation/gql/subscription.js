import gql from 'graphql-tag'

const ON_RESERVATION_CONFIRMED = gql`
	subscription {
		onReservationConfirmed {
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
	}
`

export { ON_RESERVATION_CONFIRMED }
