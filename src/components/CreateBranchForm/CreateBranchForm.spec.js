import React from 'react';
import { shallow } from 'enzyme';
import CreateBranchForm from './CreateBranchForm';

describe('CreateBranchForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateBranchForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
