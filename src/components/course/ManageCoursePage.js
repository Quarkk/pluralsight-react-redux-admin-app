// Container component, knows about redux and calls presentation components with props
// Handles rhe adding and deletion of data in the coursesPage

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr'; // UI Notifications

// Export so you can test just the plainm unconnected 'ManageCoursePage' component later
export class ManageCoursePage extends React.Component {
  // Initialise state and call the bind functions
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  /* Child Functions called by render */

  // Create a field in course object with name and value equaling what's typed into the form
  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  // Set a boolean to keep track of if form is valid
  // Keep track of all errors and store the list of errors withing the local state
  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  // Dispatch saveCourse actions upon save event
  saveCourse(event) {
    event.preventDefault();

    // Validation for courseform entries, if not exit the savecourse function
    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
      // .then() means 'redirect()'
      // won't be called until savecourse promise/call has been resolved
  }

  // Redirect to the '/courses' page
  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved.');// Notify user of save completion
    this.context.router.push('/courses');
  }

  // Calls a presentation/child component, whcih has desired view HTML
  // Passes the required dats as props to the presentation component
  render() {
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        saving={this.state.saving}
      />
    );
  }
}

// Validate component propTypes
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

/* Redux Functions */

// map a state field to a component property
function mapStateToProps(state, ownProps) {
  //debugger;
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  // If the url has course id extension in it, a course must have been clicked from the courses table
  // so set the course to equal the course that was clicked on from courses table
  // and populate courses form with that data instead
  // To enable editting/updating
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

// map an action call to a component property
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
