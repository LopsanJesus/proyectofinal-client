import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';

describe('UserList', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserList />);
    expect(wrapper).toMatchSnapshot();
  });
});
