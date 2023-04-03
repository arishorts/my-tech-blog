const addCommentHandler = () => {
  document.querySelector('#newCommentContainer').style.display = 'block';
  document.querySelector('#addCommentButton').style.display = 'none';
};

const cancelCommentHandler = () => {
  document.querySelector('#newCommentContainer').style.display = 'none';
  document.querySelector('#addCommentButton').style.display = 'block';
};

const submitCommentHandler = async (event) => {
  event.preventDefault();
  const description = document
    .querySelector('#description-comment')
    .value.trim();
  const blogpost_id = window.location.href.split('/').pop();
  if (description) {
    const response = await fetch(`/post/${blogpost_id}`, {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to comment');
    }
  }
};

document
  .querySelector('#addComment')
  .addEventListener('click', addCommentHandler);

document
  .querySelector('#cancel-comment')
  .addEventListener('click', cancelCommentHandler);

document
  .querySelector('#submit-comment')
  .addEventListener('click', submitCommentHandler);
