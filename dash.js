// 1. READ THE LOGGED-IN USER FROM BROWSER STORAGE
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// 2. AUTHENTICATION GUARD (If no user is logged in, redirect them to login page)
if (!currentUser) {
  alert('You must log in to access the Legend - Converse dashboard!');
  window.location.href = 'login.html';
} else {
  // 3. FIND THE USER-ACTIONS CONTAINER IN THE NAVBAR
  const userActionsDiv = document.querySelector('.user-actions');

  if (userActionsDiv) {
    // 4. DYNAMICALLY REPLACE ITS CONTENTS WITH USER DETAILS & LOGOUT BUTTON
    userActionsDiv.innerHTML = `
      <span style="color: #38bdf8; font-weight: 600; margin-right: 15px;">
        👤 ${currentUser.fullName} <small style="color: #94a3b8; font-size: 0.85rem;">(${currentUser.fieldCategory})</small>
      </span>
      <button id="logout-btn" style="background-color: #ef4444; padding: 0.4rem 0.8rem; margin: 0;">Logout</button>
    `;

    // 5. ATTACH EVENT LISTENER TO LOGOUT BUTTON
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function () {
      // Clear active user session from memory
      localStorage.removeItem('currentUser');
      alert('You have logged out.');
      // Redirect back to login page
      window.location.href = 'login.html';
    });
  }
}


// 1. SELECT HTML ELEMENTS USING THEIR IDs
const questionForm = document.getElementById('question-form');
const questionInput = document.getElementById('question-input');
const categorySelect = document.getElementById('category');
const feedContainer = document.getElementById('feed-container');

// load Saved the posts from local storage
let savedPosts = JSON.parse(localStorage.getItem('legendPosts')) || [];
//to render anew post to the DOm
function renderPost(post) {
  const newPost = document.createElement('article');
  newPost.classList.add('feed-item');

  newPost.innerHTML = `
  <header>
    <h4>Asked by: ${post.auther} | Category: ${post.category}</h4>
  </header>
  <p>"${post.text}"</p>
  <button type="button">Be the first to answer</button>
  `;

  feedContainer.prepend(newPost);
}


// Display all existing saved posts when the page loads
savedPosts.forEach(function (post) {
  renderPost(post);
});

// 3. HANDLE FORM SUBMISSION
questionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const textValue = questionInput.value.trim();
  const categoryValue = categorySelect.value;

  if (textValue === '') {
    alert('Please enter a question before posting.');
    return;
  }

  // Create a post object
  const newPostData = {
    author: 'You (Logged-in User)',
    category: categoryValue,
    text: textValue,
    id: Date.now() // Unique timestamp ID
  };

  // Add new post object to our local array
  savedPosts.push(newPostData);

  // Save updated array to localStorage
  localStorage.setItem('legendPosts', JSON.stringify(savedPosts));

  // Render the post to the feed UI
  renderPost(newPostData);

  // Clear input field
  questionInput.value = '';
});
//  ATTACH AN EVENT LISTENER TO THE FORM
questionForm.addEventListener('submit', function (event) {
  // Prevent browser reload
  event.preventDefault();

  // Extract input values
  const textValue = questionInput.value.trim();
  const categoryValue = categorySelect.value;

  // Simple validation safeguard
  if (textValue === '') {
    alert('Please enter a question before posting.');
    return;
  }

  // 3. CREATE A NEW ARTICLE ELEMENT
  const newPost = document.createElement('article');
  newPost.classList.add('feed-item');

  // 4. INJECT HTML INTO THE NEW ELEMENT
  newPost.innerHTML = `
    <header>
      <h4>Asked by: You (Logged-in User) | Category: ${categoryValue}</h4>
    </header>
    <p>"${textValue}"</p>
    <button type="button">Answer Question</button>
  `;

  // 5. ATTACH NEW POST TO THE TOP OF THE FEED
  feedContainer.prepend(newPost);

  // 6. CLEAR INPUT FIELD
  questionInput.value = '';
});