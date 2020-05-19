import React from 'react'

import GroupBreak from './GroupBreak'
import GroupedMessages from './GroupedMessages'

const GroupMessage = props => {
	const { items, listPureMessage, type, timestamp, meId, endOfGroup } = props

	if (type !== 'line') {
		return <GroupedMessages items={items} meId={meId} endOfGroup={endOfGroup} />
	} else {
		return <GroupBreak timestamp={timestamp} />
	}
}

export default GroupMessage
