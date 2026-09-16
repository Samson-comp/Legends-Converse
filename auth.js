// ==========================================
// 1. SIGN-UP LOGIC
// ==========================================
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop page refresh

    // Read values from signup inputs
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const fieldCategory = document.getElementById('field-category').value;
    const password = document.getElementById('password').value;

    // Get existing list of users or initialize empty array
    let usersList = JSON.parse(localStorage.getItem('legendUsers')) || [];

    // Check if user already registered
    const userExists = usersList.some(user => user.email === email);
    if (userExists) {
      alert('An account with this email already exists! Please log in.');
      return;
    }

    // Create user object
    const newUser = {
      fullName: fullName,
      email: email,
      fieldCategory: fieldCategory,
      password: password
    };

    // Save to array and update localStorage
    usersList.push(newUser);
    localStorage.setItem('legendUsers', JSON.stringify(usersList));

    console.log('Successfully saved user:', newUser);
    alert('Account created successfully! Redirecting to login page...');
    window.location.href = 'index.html';
  });
}

// ==========================================
// 2. LOG-IN LOGIC
// ==========================================
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop page refresh

    // Read values typed into login inputs
    const typedCredential = document.getElementById('login-email').value.trim();
    const typedPassword = document.getElementById('login-password').value;

    // Fetch registered users array from localStorage
    let registeredUsers = JSON.parse(localStorage.getItem('legendUsers')) || [];

    console.log('Current stored users in localStorage:', registeredUsers);
    console.log('Trying to login with:', typedCredential);

    // Look for matching user (checks both Email OR Full Name)
    const matchedUser = registeredUsers.find(function (user) {
      const matchesName = user.fullName && user.fullName.toLowerCase() === typedCredential.toLowerCase();
      const matchesEmail = user.email && user.email.toLowerCase() === typedCredential.toLowerCase();
      const matchesPassword = user.password === typedPassword;

      return (matchesName || matchesEmail) && matchesPassword;
    });

    if (matchedUser) {
      // Save active session
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert(`Welcome back, ${matchedUser.fullName}!`);
      window.location.href = 'dashboard.html';
    } else {
      alert('Account not found or password incorrect. Please try again!');
    }
  });
}
