import React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { act, fireEvent, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

const mockUser = {
	email: 'steve@example.com',
	name: 'steve',
	password: '1234',
	confirmPassword: '1234',
	token: 'mock_token',
}

const mockUserList = [
	{
		id: '5e68995fb6d0bc05829b6e79',
		name: 'steve',
		email: 'steve@example.com',
	},
	{
		id: '5e68b5c3dd814dd832cda79d',
		name: 'asd',
		email: 'nvdai2355s56se@gmail.com',
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
		name: 'cycycycycycycyqqqqqqqqqqqqqqq',
		email: 'cycycycycycycycycyqqqqqqqqqqqqqqq@gmail.com',
	},
	{
		id: '5e69ce2eda2ad42283d8cca5',
		name: 'cydaikkkkkk1234',
		email: 'cydaikkkkkk12345@gmail.com',
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
	{
		id: '5e69dee8da2ad42744d8ccc7',
		name: 'samdad',
		email: 'samdad@gmail.com',
	},
	{
		id: '5e69df0ada2ad45bacd8cccc',
		name: 'samdad',
		email: 'samdad1@gmail.com',
	},
	{
		id: '5e69df83da2ad4ac61d8ccd7',
		name: 'samdad123',
		email: 'samdad123@gmail.com',
	},
	{
		id: '5e69dfb5da2ad47687d8cce0',
		name: 'samdad12345',
		email: 'samdad12345@gmail.com',
	},
]

const mockMessageList = [
	{
		id: '5e902a09035ac411cd04d22b',
		content: '1212',
		lastModified: '2020-04-10T08:10:49+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0780',
		content: '13s123x232s sadaa',
		lastModified: '2020-04-10T08:10:47+00:00',
	},
	{
		id: '5e8a886b71b355002f81c196',
		content: '1212312',
		lastModified: '2020-04-06T01:39:55+00:00',
	},
	{
		id: '5e87088cf2439c004b4b9ee5',
		content: '123123123',
		lastModified: '2020-04-03T09:57:32+00:00',
	},
	{
		id: '5e86f39d50e9e0045eadc459',
		content: '1212',
		lastModified: '2020-04-03T08:28:13+00:00',
	},
	{
		id: '5e86e348f93af80040f2fdd7',
		content: 'asdf',
		lastModified: '2020-04-03T07:18:32+00:00',
	},
	{
		id: '5e8436a72092ca00358c5acd',
		content: 'sdfsdfsdfsdf',
		lastModified: '2020-04-01T06:37:27+00:00',
	},
	{
		id: '5e8436852092ca00358c5acb',
		content: 'sdfsdfsdfsdfsdf',
		lastModified: '2020-04-01T06:36:53+00:00',
	},
	{
		id: '5e8435e92092ca00358c5ac7',
		content: '`11231',
		lastModified: '2020-04-01T06:34:17+00:00',
	},
	{
		id: '5e8435e22092ca00358c5ac5',
		content: 'sdfsdfsdfdsfsd',
		lastModified: '2020-04-01T06:34:10+00:00',
	},
	{
		id: '5e8434db2092ca00358c5ac3',
		content: 'sdfsdfsdf',
		lastModified: '2020-04-01T06:29:47+00:00',
	},
	{
		id: '5e8434b72092ca00358c5ac1',
		content: 'asdfasdfasdfasf',
		lastModified: '2020-04-01T06:29:11+00:00',
	},
	{
		id: '5e8434992092ca00358c5abf',
		content: 'sdfsdfdsf',
		lastModified: '2020-04-01T06:28:41+00:00',
	},
	{
		id: '5e8434892092ca00358c5abd',
		content: 'cxcvcxv',
		lastModified: '2020-04-01T06:28:25+00:00',
	},
	{
		id: '5e8434572092ca00358c5abb',
		content: 'sfsd',
		lastModified: '2020-04-01T06:27:35+00:00',
	},
	{
		id: '5e83ff4b2092ca00358c5ab9',
		content: 'sdfsdfsdfsd',
		lastModified: '2020-04-01T02:41:15+00:00',
	},
	{
		id: '5e83ff432092ca00358c5ab7',
		content: 'sdfsdfsdf',
		lastModified: '2020-04-01T02:41:07+00:00',
	},
	{
		id: '5e83feb92092ca00358c5ab5',
		content: 'sdfsddfdf',
		lastModified: '2020-04-01T02:38:49+00:00',
	},
	{
		id: '5e83f7e12092ca00358c5ab3',
		content: 'abc',
		lastModified: '2020-04-01T02:09:37+00:00',
	},
	{
		id: '5e83f7932092ca00358c5ab1',
		content: 'abc',
		lastModified: '2020-04-01T02:08:19+00:00',
	},
	{
		id: '5e831238ed7075003575d025',
		content: 'sdfsdfsd',
		lastModified: '2020-03-31T09:49:44+00:00',
	},
	{
		id: '5e83118ded7075003575d023',
		content: 'asdasdasd',
		lastModified: '2020-03-31T09:46:53+00:00',
	},
	{
		id: '5e831109ed7075003575d021',
		content: 'jhfgh',
		lastModified: '2020-03-31T09:44:41+00:00',
	},
	{
		id: '5e8310e0ed7075003575d01f',
		content: 'dfgdfgdfgertret',
		lastModified: '2020-03-31T09:44:00+00:00',
	},
	{
		id: '5e831054ed7075003575d01d',
		content: 'dfgdfgdfg',
		lastModified: '2020-03-31T09:41:40+00:00',
	},
	{
		id: '5e831014ed7075003575d01b',
		content: 'tyrtyrtyrtrtyrtyrtyrtyrtyrtytrytryrtyrt',
		lastModified: '2020-03-31T09:40:36+00:00',
	},
	{
		id: '5e830f47ed7075003575d019',
		content: 'weqwqe',
		lastModified: '2020-03-31T09:37:11+00:00',
	},
	{
		id: '5e830edeed7075003575d017',
		content: 'sdfsdfsdf',
		lastModified: '2020-03-31T09:35:26+00:00',
	},
	{
		id: '5e830eb2ed7075003575d015',
		content: 'dfgdfwerew',
		lastModified: '2020-03-31T09:34:42+00:00',
	},
	{
		id: '5e830e99ed7075003575d013',
		content: 'dfgdf',
		lastModified: '2020-03-31T09:34:17+00:00',
	},
]

const mockMessageListOfUser = [
	{
		id: '5e6b34a80f14940526bb077d',
		content: 'Voluptas eveniet molestias sint adipisci libero cum veniam.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb077e',
		content:
			'Illo harum fugiat asperiores eveniet nisi nobis eos dolore dolorem.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0781',
		content:
			'Id voluptate soluta sit sit et.\nDistinctio nisi maxime alias.\nPossimus aliquid commodi.\nUt amet illum.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0782',
		content: 'Ut quia qui dolorem molestiae quos ducimus dolorem sit.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0783',
		content:
			'Velit tenetur ipsa atque itaque ipsum aspernatur.\nNemo aliquid et error officia facilis reiciendis fugiat.\nSed et temporibus quae.\nVoluptates ratione dolorem et.\nMaiores commodi doloremque magnam cum accusantium maxime.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0784',
		content:
			'Est aut aut rerum neque sint eos quia animi. A non magnam. Qui alias delectus. Possimus consectetur assumenda vel et modi. Quia rerum non illum ex et maxime itaque eos. Ullam molestiae nostrum voluptatibus velit quisquam ab enim est.\n \rMinima consequatur assumenda ut sit est eum repudiandae sed ut. Officia veritatis sit quo delectus placeat minus similique. Ab optio sunt laborum rem velit sequi. Architecto cumque quia et minus facere vitae.\n \rCupiditate ex quia. Omnis quo sed sit qui et itaque est nulla. Doloribus officia voluptatem aut placeat commodi unde asperiores soluta ducimus.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0785',
		content: 'commodi minima enim',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0786',
		content: 'Cupiditate corporis aliquam delectus.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0787',
		content: 'ut',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0788',
		content:
			'Est eum necessitatibus repellendus deserunt ducimus ipsam molestiae quibusdam. Aliquid delectus qui dolorem aut voluptatum. Id ratione aperiam mollitia possimus et. Libero repudiandae voluptatem molestias et rerum.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0789',
		content:
			'Quisquam ut qui dolor iure ut quia recusandae est. Inventore vel magnam. Ullam provident reiciendis culpa voluptatem consequatur iusto quis.\n \rQuos quasi soluta quis dolorem est id consequatur quis quasi. Pariatur accusantium dolorum eaque deserunt soluta voluptatem non. Et nostrum numquam quibusdam nihil assumenda et. Sit optio natus quia cupiditate dolor sunt repudiandae. Enim officiis omnis reprehenderit quo repellat eum.\n \rUllam autem quidem aut earum animi error. Consectetur et qui. Delectus temporibus sit non saepe excepturi. Molestiae omnis inventore beatae adipisci. Sunt in a consequatur harum error qui. Aut mollitia sunt labore unde iste.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078a',
		content:
			'Labore nisi dolor dolore deserunt voluptatem. Dolore ut adipisci neque voluptates impedit maiores.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078b',
		content: 'Vel ut aliquam.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078c',
		content:
			'Natus excepturi molestiae pariatur ullam et. Consequatur corrupti ullam quae perspiciatis minus. Quo et asperiores rem molestias. Quibusdam quos eum delectus sit corrupti impedit. Id et qui ipsam eveniet quae provident et.\n \rAutem soluta blanditiis numquam est non eligendi. Illum nisi tempora est nemo in aliquam non. Aliquam ex eos alias quae voluptatem modi ipsa. Sunt ut ut quaerat provident.\n \rUt quia pariatur. Occaecati voluptatibus consequuntur voluptatem. Mollitia fugiat quidem magni atque dolor est nobis sit dolorem. Voluptatem voluptate sed ut autem sit dolorem vero possimus odio. Praesentium ratione autem aut non et doloribus et. Quas aut repellendus.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078d',
		content: 'Minus corporis eum adipisci veniam.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078e',
		content: 'omnis',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb078f',
		content: 'aliquam',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0790',
		content:
			'Quis dignissimos distinctio possimus non quos quidem.\nEt quis illum reiciendis nihil rerum accusantium.\nQuis sit et sed illum.\nVoluptatum qui voluptatem neque odio modi quidem perferendis dolorem.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0791',
		content: 'soluta nemo et',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0792',
		content: 'consequatur',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0793',
		content: 'Sunt molestiae suscipit est a et laborum.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0794',
		content:
			'Ea deserunt vitae omnis eligendi. Quia provident totam quo eveniet id. Veniam molestiae officiis debitis et autem facilis.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0795',
		content:
			'Qui et et assumenda. Eligendi corporis ad ipsum ut et et cumque unde. Ut velit commodi est ipsum. Alias quis sed. Quidem aut deserunt iusto reprehenderit doloribus. Laborum atque fuga autem laboriosam quasi tempore.\n \rDignissimos reiciendis aliquam quia iste. Minus sed voluptates corporis optio maiores et ea totam saepe. Praesentium quod eos. Tempora commodi aut et quia nulla.\n \rRepellat possimus qui impedit a qui blanditiis nostrum consequatur. A est dolores qui omnis. Facilis est dolor ab molestias quibusdam rerum. Quasi culpa dolores fugit tempora. Aut sint quidem ea repudiandae accusamus quia praesentium excepturi et.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0796',
		content:
			'Veritatis ipsum pariatur et recusandae voluptatum. Qui dolorum qui. Modi sed dolores a possimus maxime architecto.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0797',
		content: 'Pariatur nam voluptatum id esse enim doloribus amet iure.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0798',
		content: 'maxime',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb0799',
		content: 'quidem maiores ut',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb079a',
		content:
			'Dignissimos dicta eos. Cumque ipsa saepe placeat ut et similique voluptatem debitis. Velit quo nihil ex.\n \rPraesentium eligendi non. Illum quisquam aut recusandae consequuntur distinctio. Nihil ut adipisci. Quia suscipit expedita odio. Saepe earum vel et.\n \rEnim voluptas sint officiis sed et. Delectus sed velit neque reiciendis dicta. Et expedita quia aut corrupti laudantium nesciunt aut deserunt nulla. Suscipit eum distinctio porro qui.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb079b',
		content: 'et',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
	{
		id: '5e6b34a80f14940526bb079c',
		content:
			'Deserunt aspernatur consectetur. Velit omnis sunt enim et odio ut ipsum. Dolore vel odio inventore neque aut. Maiores consequatur aut reprehenderit quia numquam illum in. At voluptatem rem eum eos maiores.',
		lastModified: '2020-03-13T07:22:16+00:00',
	},
]

const mockSearchedUser = {
	id: '5e68995fb6d0bc058sew6e79',
	email: 'mocksearcheduser@gmail.com',
	name: 'mock searched user',
}

const mockSearchedMessage = {
	id: '5e902a09035ac411c123422b',
	content: 'mock search message',
	lastModified: '2020-04-10T08:10:49+00:00',
}

const mockServer = 'http://mockserver.com'

const mockUserTableHeader = [
	{ headerLabel: 'EMAIL', xs: 5, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 7, headerVariable: 'name' },
]
const mockMessageTableHeader = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

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

const openModifyDialog = async rendered => {
	const row = rendered.querySelectorAll(
		`[data-testid=row-${mockMessageList[0].id}]`
	)[0]

	await act(async () => {
		fireEvent.click(row)
	})

	const modifyDialogTitle = document.querySelectorAll(
		`[data-testid=modifydialog-title]`
	)[0]

	expect(modifyDialogTitle).toBeTruthy()
}

const openDeleteDialog = async rendered => {
	const closeIcon = rendered.querySelectorAll(
		`[data-testid=row-closeicon-${mockMessageList[0].id}]`
	)[0]

	await act(async () => {
		fireEvent.click(closeIcon)
	})

	const deleteDialogTitle = document.querySelectorAll(
		`[data-testid=deletedialog-title]`
	)[0]

	expect(deleteDialogTitle).toBeTruthy()
}

const modifyMessage = async message => {
	const input = document.querySelectorAll(`[placeholder=placeholder]`)[0]
	const agreeButton = document.querySelectorAll(
		'[data-testid=modifydialog-agreebutton]'
	)[0]

	await act(async () => {
		fireEvent.change(input, { target: { value: message } })
	})

	expect(input.value).toBe(message)

	await act(async () => {
		fireEvent.click(agreeButton)
	})
}

const findDOMNodeOfComponent = ({ mocks, resolvers, component }) => {
	return ReactDOM.findDOMNode(
		renderDOMNode(
			getMarkup(
				<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
					{component}
				</MockedProvider>
			)
		)
	)
}

const closeDialog = async () => {
	const MuiBackdrop = document.querySelectorAll(`.MuiBackdrop-root`)[0]

	await act(async () => {
		MuiBackdrop.click()
	})
}

export {
	mockUser,
	mockUserList,
	mockMessageList,
	mockMessageListOfUser,
	mockSearchedUser,
	mockSearchedMessage,
	mockServer,
	mockUserTableHeader,
	mockMessageTableHeader,
	renderWithRouter,
	renderDOMNode,
	getMarkup,
	mockOffsetSize,
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	closeDialog,
	findDOMNodeOfComponent,
}
