// Initialize the planner data with default states if not already present
let plannerData = Array(21).fill(null).map((_, i) => ({
  plan: '',
  completed: false // Add a completed status for each day
}));

// Load the planner from local storage
function loadPlanner() {
  const storedData = localStorage.getItem('plannerData');
  if (storedData) {
    plannerData = JSON.parse(storedData);
    // Ensure the array has 21 days, filling new ones if expanded
    while (plannerData.length < 21) {
      plannerData.push({ plan: '', completed: false });
    }
    // Trim if it somehow got longer than 21 (unlikely with this logic)
    plannerData = plannerData.slice(0, 21);
  }
}

// Save the planner to local storage
function savePlanner() {
  localStorage.setItem('plannerData', JSON.stringify(plannerData));
}

// Create the planner UI
function createPlanner() {
  const plannerContainer = document.getElementById('planner-container');
  plannerContainer.innerHTML = ''; // Clear existing content

  for (let i = 0; i < 21; i++) {
    const day = i + 1;
    const dayDiv = document.createElement('div');
    // Bootstrap grid classes for responsiveness: full width on small, 2 per row on sm, 3 on md, 4 on lg
    dayDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

    const dayCard = document.createElement('div');
    dayCard.classList.add('day', 'h-100'); // Use 'h-100' to make cards equal height

    const checkboxId = `day-${i}-checkbox`;
    const label = document.createElement('label');
    label.setAttribute('for', checkboxId);
    label.innerHTML = `
      <input type="checkbox" id="${checkboxId}" ${plannerData[i].completed ? 'checked' : ''}>
      <span>Day ${day}</span>
    `;

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control'); // Bootstrap form control styling
    textarea.placeholder = 'Enter your plan for the day...';
    textarea.value = plannerData[i].plan; // Set initial value

    // Event listeners for updating data
    label.querySelector('input[type="checkbox"]').addEventListener('change', function() {
      plannerData[i].completed = this.checked;
      if (this.checked) {
          dayCard.classList.add('completed');
      } else {
          dayCard.classList.remove('completed');
      }
      savePlanner();
      updateTracker(); // Update tracker immediately on checkbox change
    });

    textarea.addEventListener('input', function() {
      plannerData[i].plan = this.value;
      savePlanner();
    });

    if (plannerData[i].completed) {
      dayCard.classList.add('completed');
    }

    dayCard.appendChild(label);
    dayCard.appendChild(textarea);
    dayDiv.appendChild(dayCard);
    plannerContainer.appendChild(dayDiv);
  }
}

// Update the progress tracker and score
function updateTracker() {
  const trackerContainer = document.getElementById('tracker-container');
  trackerContainer.innerHTML = ''; // Clear previous tracker boxes

  let completedDaysCount = 0;
  plannerData.forEach((day, index) => {
    const progressBox = document.createElement('div');
    progressBox.classList.add('progress-box');
    progressBox.textContent = index + 1; // Display day number

    if (day.completed) {
      progressBox.classList.add('completed-day');
      completedDaysCount++;
    }
    trackerContainer.appendChild(progressBox);
  });

  const scoreText = document.getElementById('score');
  // Calculate score: 100 points for each completed day
  scoreText.textContent = `${completedDaysCount * 100} points`;

  // Save the score (or just the completed count, which can derive score) to local storage
  localStorage.setItem('completedDaysCount', completedDaysCount);
}

// Load the score (or completed count) from local storage
function loadScore() {
  const storedCompletedDaysCount = localStorage.getItem('completedDaysCount');
  if (storedCompletedDaysCount !== null) {
    const scoreText = document.getElementById('score');
    scoreText.textContent = `${parseInt(storedCompletedDaysCount) * 100} points`;
  }
}

// Handle form submission to explicitly save all data
function handlePlannerFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    savePlanner();
    updateTracker();
    alert('Progress saved successfully!'); // Provide feedback to the user
}


// Load the planner and score when the page loads
window.addEventListener('load', function() {
  loadPlanner(); // Load data first
  createPlanner(); // Then create UI based on loaded data
  updateTracker(); // And update tracker/score
  // Attach event listener for the form submission
  const plannerForm = document.getElementById('plannerForm');
  if (plannerForm) {
      plannerForm.addEventListener('submit', handlePlannerFormSubmit);
  }
});