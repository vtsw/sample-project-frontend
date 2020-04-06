import React, { useState, useEffect } from 'react'

import { getToken } from '@src/shares/utils'

const FetchImage = props => {
	const { fileName, fileLink, styles } = props
	const [imageUrl, setImageUrl] = useState('')

	useEffect(() => {
		const fetchAuthImage = async () => {
			const token = getToken()
			const res = await fetch(fileLink, {
				headers: {
					authorization: token ? `Bearer ${token}` : '',
				},
			})
			const blob = await res.blob()
			const url = URL.createObjectURL(blob)

			setImageUrl(url)
		}
		fetchAuthImage()
	}, [fileLink])

	return (
		<React.Fragment>
			<img src={imageUrl} alt={fileName} className={styles} />
		</React.Fragment>
	)
}

export default FetchImage
