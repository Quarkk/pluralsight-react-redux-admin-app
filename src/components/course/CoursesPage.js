/* Container Component, knows about redux and calls presentation components with props */

import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as courseActions from '../../actions/courseActions'; // Required actions
import CourseList from './CourseList'; // Presentation (child) component

// Initialise state and call the bind functions
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  // Calls a presentation/child component, whcih has desired view HTML
  // Passes the required data as props to the presentation component
  render() {
    const {courses} = this.props; // instead of saying 'this.props.courses' in CourseList
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>

        <CourseList courses={courses}/>
      </div>
    );
  }
}

// Validate component Proptypes
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

/* Redux Functions */

// map a state field to a component property
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

// map an action call to a component property
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
