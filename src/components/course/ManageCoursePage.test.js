/* TESTING REACT CONTAINER COMPONENTS
   Framework: Mocha + expect
   Helper Library: Enzyme
   How: In-memory DOM via Node (jsdom)
*/

import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe ('Manage Course Page', () => {
  it('sets error message upon blur of empty title field', () => {
    // Define props and mock the savecourse function
    const props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    };

    // Using 'mount' to test component's interactions with it's child components
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last(); // Get the save button
    saveButton.simulate('click'); // Simulate a click event

    // Assertions
    expect(saveButton.prop('type')).toBe('submit'); //assure we found the submit.
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
