const addPostHandler = () => {
  document.querySelector('#addPostContainer').style.display = 'block';
  document.querySelector('#blogpostContainer').style.display = 'none';
  document.querySelector('#addpost').style.display = 'none';
};

const postFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-post').value.trim();
  const description = document.querySelector('#description-post').value.trim();
  //const id = window.location.href.split('/').pop();

  if (title && description) {
    const response = await fetch('/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to post');
    }
  }
};

document.querySelector('#addPostContainer').style.display = 'none';
document.querySelector('#blogpostContainer').style.display = 'block';
document.querySelector('#addpost').style.display = 'block';

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);

document.querySelector('#addpost').addEventListener('click', addPostHandler);
