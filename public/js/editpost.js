const updatePost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-post').value.trim();
  const description = document.querySelector('#description-post').value.trim();
  const id = window.location.href.split('/').pop();
  const user_id = window.location.href.split('/')[4];

  if (title && description) {
    const response = await fetch(`/dashboard/${user_id}/editpost/${id}`, {
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
  const id = window.location.href.split('/').pop();
  const user_id = window.location.href.split('/')[2];

  const response = await fetch(`/dashboard/${user_id}/editpost/${id}`, {
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
