import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

// Stateless Function/Presentation component
// Gets data from a parent container component and passes to child presentation component (CourseListRow)
// Displays a table with row data from CourseListRow
const CourseList = ({courses}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {courses.map(course =>
        <CourseListRow key={course.id} course={course}/>
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
