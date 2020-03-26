import gql from 'graphql-tag'

const GET_FILE = gql`
	query GetFile {
		file @client {
			filename
			link
		}
	}
`

const UPLOAD_FILE = gql`
	mutation UploadFile($file: Upload!) {
		uploadImage(file: $file) {
			filename
			link
		}
	}
`

const SET_UPLOADED_FILE = gql`
	mutation SetUploadedFile($file: Upload!) {
		setUploadedFile(file: $file) @client {
			file
		}
	}
`

export { GET_FILE, UPLOAD_FILE, SET_UPLOADED_FILE }
