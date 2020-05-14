const convertBreakingLine = (arr, limitTime = 6000000) => {
	return arr.reduce((acc, cur, index) => {
		if (index === 0) {
			acc.push({
				type: 'line',
				timestamp: arr[index].timestamp,
				id: arr[index].timestamp + 'id',
				content: arr[index].content,
				first: 'first',
			})
		}
		acc.push(cur)

		if (
			index !== arr.length - 1 &&
			Math.abs(cur.timestamp - arr[index + 1].timestamp) > limitTime
		) {
			acc.push({
				type: 'line',
				timestamp: arr[index + 1].timestamp,
				id: arr[index + 1].timestamp + 'id',
				content: arr[index + 1].content,
			})
		}
		return acc
	}, [])
}

const convertData = (items, key, convertTimeLimit = 6000000) => {
	let tempIU = []
	let tempOA = []
	const arr = convertBreakingLine([].concat(items).reverse(), convertTimeLimit)
	return arr.reduce((acc, cur, index) => {
		if (cur.type === 'line') {
			if (tempIU.length > 0) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })

				tempIU = []
			}
			if (tempOA.length > 0) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })

				tempOA = []
			}
			acc.push(cur)
		} else if (cur.from.id === key) {
			tempIU.push(cur)
			if (tempOA.length > 0) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })
				tempOA = []
			}
			if (index === arr.length - 1) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })
			}
		} else {
			tempOA.push(cur)
			if (tempIU.length) {
				acc.push({ items: tempIU, id: tempIU[0].timestamp })
				tempIU = []
			}
			if (index === arr.length - 1) {
				acc.push({ items: tempOA, id: tempOA[0].timestamp })
			}
		}

		return acc
	}, [])
}

export { convertData }
