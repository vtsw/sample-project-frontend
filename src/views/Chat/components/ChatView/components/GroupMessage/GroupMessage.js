import React from 'react'
import { GroupedMessages, GroupBreak } from './components'

const GroupMessage = props => {
	const { items, listPureMessage, type, timestamp, meId, endOfGroup } = props

	if (type !== 'line') {
		return <GroupedMessages items={items} meId={meId} endOfGroup={endOfGroup} />
	} else {
		return <GroupBreak timestamp={timestamp} />
	}
}

export default GroupMessage
