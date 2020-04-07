import React from 'react'
import LoadingScreen from './LoadingScreen'

export default {
	title: 'Component Api|LoadingScreen',
	includeStories: [],
}

export const basic = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ position: 'relative', width: '100px', height: '100px' }}>
				<LoadingScreen open={true} msg='...Loaing' />
			</div>
		</div>
	)
}
