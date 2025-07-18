const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  function sig()
  {
    sigup.html
    
  }
  // Get user input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve user data from local storage
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    if (email === user.email && password === user.password) {
      // Login successful
      alert('Login successful!');
    } else {
      // Invalid credentials
      alert('Invalid email or password!');
    }
  } else {
    // User data not found
    alert('User not found. Please sign up!');
  }
});
