import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
