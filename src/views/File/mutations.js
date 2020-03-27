import gql from 'graphql-tag'
import { FILE } from './fragments'

const UPLOAD_FILE = gql`
	mutation UploadFile($file: Upload!) {
		uploadImage(file: $file) {
			...File
		}
	}
	${FILE}
`

const SET_UPLOADED_FILE = gql`
	mutation SetUploadedFile($file: Upload!) {
		setUploadedFile(file: $file) @client {
			...File
		}
	}
	${FILE}
`

export { UPLOAD_FILE, SET_UPLOADED_FILE }
