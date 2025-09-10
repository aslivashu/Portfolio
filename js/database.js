// Example of how to use the Netlify function from your frontend
async function fetchPosts() {
  try {
    const response = await fetch('/.netlify/functions/get-posts');
    const result = await response.json();
    
    if (result.success) {
      console.log('Posts:', result.data);
      // Display posts in your portfolio
      displayPosts(result.data);
    } else {
      console.error('Error fetching posts:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

function displayPosts(posts) {
  // Example: Display posts in your portfolio
  const postsContainer = document.getElementById('posts-container');
  if (postsContainer) {
    postsContainer.innerHTML = posts.map(post => `
      <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Created: ${new Date(post.created_at).toLocaleDateString()}</small>
      </div>
    `).join('');
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
});
