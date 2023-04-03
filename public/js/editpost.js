const post_id = window.location.href.split('/').pop();
const user_id = window.location.href.split('/')[4];

const updatePost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-post').value.trim();
  const description = document.querySelector('#description-post').value.trim();

  if (title && description) {
    const response = await fetch(`/dashboard/${user_id}/editpost/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      alert('Failed to update');
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const response = await fetch(`/dashboard/${user_id}/editpost/${post_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard/${user_id}`);
  } else {
    alert('Failed to update');
  }
};

document.querySelector('#post-update').addEventListener('click', updatePost);

document.querySelector('#post-delete').addEventListener('click', deletePost);
