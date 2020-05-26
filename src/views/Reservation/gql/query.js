import gql from 'graphql-tag'

const GET_RESERVATION_QUEUE = gql`
	query {
		reservationQueue @client {
			items {
				id
				type
				patient
				patientId
				doctor
				doctorId
				time
				unixTime
			}
		}
	}
`

const GET_RESERVATION_LIST = gql`
	query ReservationList($query: DefaultPaginationInput!) {
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

const GET_RESERVATION_REQUEST_LIST = gql`
	query ReservationRequestList($query: ReservationRequestListInput!) {
		reservationRequestList(query: $query) {
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

const GET_ZALO_INTERESTED_USER_LIST = gql`
	query ZaloInterestedUserList($query: ZaloInterestedUserListInput!) {
		zaloInterestedUserList(query: $query) {
			items {
				id
				displayName
			}
			hasNext
			total
		}
	}
`

export {
	GET_RESERVATION_QUEUE,
	GET_RESERVATION_LIST,
	GET_RESERVATION_REQUEST_LIST,
	GET_ZALO_INTERESTED_USER_LIST,
}
