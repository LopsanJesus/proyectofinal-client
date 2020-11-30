import React from 'react';
import { shallow } from 'enzyme';
import CreateTreeButton from './CreateTreeButton';

describe('CreateTreeButton', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateTreeButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
