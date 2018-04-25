/* REDUX INTEGRATION TEST
   Framework: Mocha + Expect
*/

import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function() {
  it('should handle creating courses', function() {
    // Given
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    // When (Can dispatch multiple actions here and assert on result)
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // Then
    const actual = store.getState().courses[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  });
});
