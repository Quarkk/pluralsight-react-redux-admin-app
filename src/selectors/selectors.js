/* USE FOR: Complicated data selection or manipulation code
   TIP: Consider using 'reselect library' to memoize these functions
*/

// Transform data from the author api call result into desired format for the form
export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
