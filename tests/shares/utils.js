import React from 'react'
import * as ReactDOM from 'react-dom'

import { render } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const mockUser = {
	email: 'stevevo@gmail.com',
	name: 'stevevo',
	password: '111',
	confirmPassword: '111',
}

const mockUserList = [
	{
		id: '5e68995fb6d0bc05829b6e79',
		name: '90412',
		email: 'steve@example.com',
	},
	{
		id: '5e68b5c3dd814dd832cda79d',
		name: 'asdasdasd',
		email: 'nvdai2355@gmail.com',
	},
	{
		id: '5e68b792dd814d8efacda7ad',
		name: 'nvdai235556',
		email: 'nvdai235556@gmail.com',
	},
	{
		id: '5e68b7addd814d76adcda7ae',
		name: 'nvdai1235',
		email: 'nvdai1235@gmail.com',
	},
	{
		id: '5e68b9e6dd814db72fcda7af',
		name: 'ncdai24055',
		email: 'ncdai24055@gmail.com',
	},
	{
		id: '5e68ba40dd814d21bacda7b0',
		name: 'shit',
		email: 'holyshit@gmail.com',
	},
	{
		id: '5e68bb09dd814dfd87cda7b2',
		name: 'boysexytapthehinh',
		email: 'boysexytapthehinh@phonggym.com',
	},
	{
		id: '5e68bb45dd814d3710cda7b3',
		name: 'michaelsexytapthehinh',
		email: 'michaelsexytapthehinh@phonggym.com',
	},
	{
		id: '5e69c898da2ad4daa7d8cc96',
		name: 'daikkkkkk',
		email: 'daikkkkkk@gmail.com',
	},
	{
		id: '5e69c954da2ad405a8d8cc99',
		name: 'daikkkkkk1234',
		email: 'daikkkkkk1234@gmail.com',
	},
	{
		id: '5e69c9a5da2ad469eed8cc9a',
		name: 'qqqqqqqqqqqqqqq',
		email: 'qqqqqqqqqqqqqqq@gmail.com',
	},
	{
		id: '5e69ce2eda2ad42283d8cca5',
		name: 'daikkkkkk1234',
		email: 'daikkkkkk12345@gmail.com',
	},
	{
		id: '5e69cf90da2ad424b3d8cca6',
		name: 'useLazyQuery',
		email: 'uselazyquery@gmail.com',
	},
	{
		id: '5e69d01bda2ad42acfd8cca7',
		name: 'loadGreeting',
		email: 'loadgreeting1233@gmail.com',
	},
	{
		id: '5e69d038da2ad46496d8cca8',
		name: 'ad12345678',
		email: 'ad12345678@gmail.com',
	},
	{
		id: '5e69d0a4da2ad42de5d8cca9',
		name: 'ad1234567812',
		email: 'ad1234567812@gmail.com',
	},
	{
		id: '5e69d16eda2ad47121d8ccaa',
		name: 'ad1234567812asd',
		email: 'ad1234567812asd@gmail.com',
	},
	{
		id: '5e69d232da2ad43d3fd8ccac',
		name: 'ad1234567812123',
		email: 'ad1234567812123@gmail.com',
	},
	{
		id: '5e69d265da2ad44d77d8ccad',
		name: 'ad123456776',
		email: 'ad123456776@gmail.com',
	},
	{
		id: '5e69d28ada2ad46853d8ccae',
		name: 'qwqwer',
		email: 'qwqwer@gmail.com',
	},
	{
		id: '5e69d2e3da2ad44e1dd8ccaf',
		name: 'adghjkl',
		email: 'adghjkl@gmail.com',
	},
	{
		id: '5e69d368da2ad43e15d8ccb0',
		name: 'addaik',
		email: 'addaik@gmail.com',
	},
	{
		id: '5e69d3bada2ad4ae93d8ccb1',
		name: 'addaik',
		email: 'addaik12@gmail.com',
	},
	{
		id: '5e69d3cfda2ad4103fd8ccb2',
		name: 'addaik123213',
		email: 'addaik123213@gmail.com',
	},
	{
		id: '5e69d755da2ad411b8d8ccb3',
		name: 'useApolloClient',
		email: 'useapolloclient@gmail.com',
	},
	{
		id: '5e69d917da2ad4d52cd8ccb4',
		name: 'useApolloClient',
		email: 'useapolloclient1212@gmail.com',
	},
	{
		id: '5e69dba2da2ad43380d8ccb5',
		name: 'sam2323dad12',
		email: 'sam2323dad12@gmail.com',
	},
	{
		id: '5e69dc16da2ad4129cd8ccb6',
		name: 'sam2323dad11',
		email: 'sam2323dad11@gmail.com',
	},
	{
		id: '5e69dcd9da2ad45884d8ccb7',
		name: 'sam2323dad11121',
		email: 'sam2323dad11121@gmail.com',
	},
	{
		id: '5e69dd2dda2ad4d983d8ccb8',
		name: 'adadadada',
		email: 'adadadada@gmail.com',
	},
]

const mockUserTableHeader = [
	{ headerLabel: 'EMAIL', xs: 5, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 7, headerVariable: 'name' },
]
const mockMessageTableHeader = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

const renderWithApolloClient = (component, mockClient) => {
	return render(
		<ApolloProvider client={mockClient}>{component}</ApolloProvider>
	)
}

const renderWithRouter = (
	ui,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
) => {
	const Wrapper = ({ children }) => (
		<Router history={history}>{children}</Router>
	)
	return {
		...render(ui, { wrapper: Wrapper }),
		history,
	}
}

/**
 * Helper method for testing components that may use Portal and thus require cleanup.
 * This helper method renders components to a transient node that is destroyed after the test completes.
 * Note that rendering twice within the same test method will update the same element (rather than recreate it).
 */
const renderDOMNode = markup => {
	if (!renderDOMNode._mountNode) {
		renderDOMNode._mountNode = document.createElement('div')

		// Unless we attach the mount-node to body, getBoundingClientRect() won't work
		document.body.appendChild(renderDOMNode._mountNode)

		afterEach(renderDOMNode.unmount)
	}

	return ReactDOM.render(markup, renderDOMNode._mountNode)
}

/**
 * The render() method auto-unmounts components after each test has completed.
 * Use this method manually to test the componentWillUnmount() lifecycle method.
 */
renderDOMNode.unmount = function() {
	if (renderDOMNode._mountNode) {
		ReactDOM.unmountComponentAtNode(renderDOMNode._mountNode)

		document.body.removeChild(renderDOMNode._mountNode)

		renderDOMNode._mountNode = null
	}
}

const mockOffsetSize = (width, height) => {
	Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
		configurable: true,
		value: height,
	})
	Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
		configurable: true,
		value: width,
	})
}

const getMarkup = component => {
	mockOffsetSize(200, 700)

	return <div style={{ width: '300px', height: '700px' }}>{component}</div>
}

export {
	mockUser,
	mockUserList,
	mockUserTableHeader,
	mockMessageTableHeader,
	renderWithApolloClient,
	renderWithRouter,
	renderDOMNode,
	getMarkup,
	mockOffsetSize,
}
