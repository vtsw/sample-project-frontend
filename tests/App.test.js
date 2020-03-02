import React from 'react'

import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from '../src/App'

describe('<App/>', () => {
	it('should render without crashing', () => {
		const wrapper = shallow(<App />)

		expect(toJson(wrapper)).toMatchSnapshot()
	})
})
