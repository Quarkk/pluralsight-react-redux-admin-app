// Actions take in data and returns an object with a tpye field and the data field
// Called by dispatch in container component
import AuthorApi from '../api/mockAuthorApi'; // Just change this import to point to a real API for production
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

// Actions
// Suffix 'success' helps clarify that the async request was successful
export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// Thunk: Handles making async calls in redux
// A thunk always returns a fucntion that accepts a dispatch
// Doesn't fire until all authors have been successfully returned by the api call
export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall()); // Dispatch the action to display the loading dots
    // Api call
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      // Error Handling
      throw(error);
    });
  };
}
