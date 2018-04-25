/* TESTING REACT PRESENTATION COMPONENTS
   Framework: Mocha + Expect
   Helper Library: React Test Utils
   How: In-memory DOM via Node (jsdom)
*/

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  // Define props and mock onSave and onChange functions
  let props = {
    allAuthors: [],
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  // Create instance of react test utils renderer, in order to render component to test
  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    // Get reference to output of rendering the component under test
    const { output } = setup();
    let h1 = output.props.children[0]; // Reference child element

    // assertions
    expect(output.type).toBe('form');
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[5];

    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[5];

    expect(submitButton.props.value).toBe('Saving...');
  });
});
