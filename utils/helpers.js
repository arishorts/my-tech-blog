module.exports = {
  //check if the user logged in is who commented on those post. if so, they can delete the comment
  isCommentOwner: (commentUserId, loggedInUserId) => {
    return commentUserId === loggedInUserId;
  },
  format_date: (date) => {
    const dateObj = new Date(date);
    // Format date as MM/DD/YYYY
    return dateObj.toLocaleDateString();
  },
};
