import React from 'react'

import { GroupMessageList, GroupBreak } from './components'

const GroupMessage = props => {
	const { items, type, timestamp, meId, endOfGroup } = props

	if (type !== 'line') {
		return (
			<GroupMessageList items={items} meId={meId} endOfGroup={endOfGroup} />
		)
	} else {
		return <GroupBreak timestamp={timestamp} />
	}
}

export default GroupMessage
