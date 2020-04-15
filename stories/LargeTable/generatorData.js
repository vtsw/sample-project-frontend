import Faker from 'faker'

export default (numArr = 1) => {
	return new Array(numArr).fill(1).map(() => ({
		email: Faker.internet.email(),
		name: Faker.internet.userName(),
		id: Faker.random.uuid(),
	}))
}
