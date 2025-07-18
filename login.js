const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get user input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create user object
  const user = {
    name: name,
    email: email,
    password: password
  };

  // Save user data to local storage
  localStorage.setItem('user', JSON.stringify(user));

  // Display success message or redirect to another page
  alert('Sign up successful!');
});
