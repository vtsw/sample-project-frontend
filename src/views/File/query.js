import gql from 'graphql-tag'

const UPLOAD_FILE = gql`
	mutation UploadFile($file: Upload!) {
		uploadAvatar(file: $file) {
			etag
		}
	}
`

export { UPLOAD_FILE }
