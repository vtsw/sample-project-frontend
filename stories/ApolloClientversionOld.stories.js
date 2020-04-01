// import React from 'react'
// import { Query, useQuery } from 'react-apollo'
// import gql from 'graphql-tag'
// import { storiesOf } from '@storybook/react'
// import apolloStorybookDecorator from 'apollo-storybook-react'

// const typeDefs = `
//   type Query {
// 		helloWorld: String
// 		name: String
// 		getUser: User
// 	}

// 	type User {
// 		name: String
// 		age: Int
// 	}

//   schema {
//     query: Query,
//   }
// `

// const mocks = {
// 	Query: () => {
// 		return {
// 			helloWorld: () => 'Hello from Apollo!!',
// 			name: () => 'hieullllllllll',
// 			getUser: () => ({ name: 'hieu', age: 24 }),
// 		}
// 	},
// }

// function HelloWorld() {
// 	const { data: helloData, loading, error } = useQuery(gql`
// 		query helloWorld {
// 			helloWorld
// 		}
// 	`)

// 	const { data, loading: loadingName } = useQuery(gql`
// 		query {
// 			name
// 		}
// 	`)

// 	const { data: dataUser, loading: loadingUser } = useQuery(gql`
// 		query {
// 			getUser {
// 				name
// 				age
// 			}
// 		}
// 	`)

// 	if (loading || loadingName || loadingUser) return false
// 	console.log('object', helloData.helloWorld, data, dataUser)

// 	return (
// 		<>
// 			<h1>{helloData.helloWorld}</h1>
// 			<h1>{data.name}</h1>
// 			<h1>{dataUser.getUser.name}</h1>
// 		</>
// 	)
// }

// storiesOf('COMPONENT API|Apollo Storybook Decorator Old', module)
// 	.addDecorator(
// 		apolloStorybookDecorator({
// 			typeDefs,
// 			mocks,
// 		})
// 	)
// 	.add('Hello World Test', () => {
// 		return <HelloWorld />
// 	})
