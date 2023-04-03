module.exports = {
  isCommentOwner: (commentUserId, loggedInUserId) => {
    return commentUserId === loggedInUserId;
  },
};
