import React from 'react';
import { shallow } from 'enzyme';
import PracticePreview from './PracticePreview';

describe('PracticePreview', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<PracticePreview />);
    expect(wrapper).toMatchSnapshot();
  });
});
