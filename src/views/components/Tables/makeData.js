const range = len => {
	const arr = []
	for (let i = 0; i < len; i++) {
		arr.push(i)
	}
	return arr
}

const newPerson = () => {
	return {
		propsName: 'propsName',
		propsType: 'propsType',
		defaultValue: 'defaultValue',
		description: 'description',
	}
}

export default function makeData(...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth]
		return range(len).map(d => {
			return newPerson()
		})
	}

	return makeDataLevel()
}
