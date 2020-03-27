import gql from 'graphql-tag'
import { FILE } from './fragments'

const GET_USER_INFO = gql`
	query GetUserInfo {
		me {
			image {
				...File
			}
		}
	}
	${FILE}
`

const GET_FILE = gql`
	query GetFile {
		file @client {
			...File
		}
	}
	${FILE}
`

export { GET_USER_INFO, GET_FILE }
