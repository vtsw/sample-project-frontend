import React, { useState, useEffect } from 'react'

import { getToken } from '@src/shares/utils'

const FetchImage = props => {
	const { alt, src, styles } = props
	const [imageUrl, setImageUrl] = useState('')

	const fetchAuthImage = async () => {
		const token = getToken()
		const res = await fetch(src, {
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		})
		const blob = await res.blob()
		const url = URL.createObjectURL(blob)

		setImageUrl(url)
	}

	useEffect(() => {
		fetchAuthImage()
	}, [])

	return (
		<React.Fragment>
			<img src={imageUrl} alt={alt} className={styles} />
		</React.Fragment>
	)
}

export default FetchImage
