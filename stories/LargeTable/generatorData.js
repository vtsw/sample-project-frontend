import Faker from 'faker'

export default (numArr = 1, ...args) => {
	return new Array(numArr).fill(_).map(_ => ({
		email: Faker.internet.email(),
		name: Faker.internet.userName(),
		id: Faker.random.uuid(),
	}))
}
