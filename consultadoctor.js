document.addEventListener('DOMContentLoaded', function () {
  const connectionForm = document.querySelector('.connect-form');
  const resultDiv = document.getElementById('result');
  const connectButton = document.getElementById('connect-button');

  connectButton.addEventListener('click', function () {
      const patientName = document.getElementById('patient-name').value;
      const patientAge = document.getElementById('patient-age').value;
      const patientGender = document.querySelector('input[name="patient-gender"]:checked').value;
      const communicationMethod = document.querySelector('input[name="communication"]:checked').value;
      const doctorSpecialty = document.getElementById('doctor-specialty').value;

      // You can use the collected information to perform further actions, e.g., initiate a chat or video call.
      let message = `Connected with a ${doctorSpecialty} doctor for ${communicationMethod} consultation.`;
      message += `<br>Name: ${patientName}, Age: ${patientAge}, Gender: ${patientGender}`;

      // Display the message
      resultDiv.innerHTML = message;

      // Clear the form fields
      document.getElementById('patient-name').value = '';
      document.getElementById('patient-age').value = '';
      document.querySelector('input[name="patient-gender"]').checked = false;
      document.querySelector('input[name="communication"]').checked = false;
      document.getElementById('doctor-specialty').value = '';

      // Show the result div for a few seconds (you can add more styling/animations)
      resultDiv.classList.remove('hidden');
      setTimeout(() => {
          resultDiv.classList.add('hidden');
      }, 5000); // Hide after 5 seconds
  });
});
