/* TESTING REACT PRESENTATION COMPONENTS
   Framework: Mocha + Expect
   Helper Library: Enzyme
   How: In-memory DOM via Node (jsdom)
*/

import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  // Define props and mock onSave and onChange functions
  const props = {
    allAuthors: [],
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  // Shallow render of the component to test
  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    // Get wrapper component from setup call
    const wrapper = setup(false);

    // assertions
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);

    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);

    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
