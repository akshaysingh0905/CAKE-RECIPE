document.addEventListener('DOMContentLoaded', () => {
    const toggleIngredientsBtn = document.getElementById('toggleIngredientsBtn');
    const ingredientsList = document.getElementById('ingredientsList');

    const toggleStepsBtn = document.getElementById('toggleStepsBtn');
    const stepsList = document.getElementById('stepsList');

    const cookingControls = document.getElementById('cookingControls');
    const startCookingBtn = document.getElementById('startCookingBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const progressBar = document.getElementById('progressBar');
    const timerDisplay = document.getElementById('timer');

    let currentStep = -1;
    const totalSteps = stepsList.children.length;

    let cookingStarted = false;
    let timerInterval;
    const preparationTimeSeconds = 45 * 60; // 45 minutes
    let remainingTime = preparationTimeSeconds;

    // ingredients visibility
    toggleIngredientsBtn.addEventListener('click', () => {
        if (ingredientsList.classList.contains('hidden')) {
            ingredientsList.classList.remove('hidden');
            toggleIngredientsBtn.textContent = 'Hide Ingredients';
        } else {
            ingredientsList.classList.add('hidden');
            toggleIngredientsBtn.textContent = 'Show Ingredients';
        }
    });

    //  steps visibility
    toggleStepsBtn.addEventListener('click', () => {
        if (stepsList.classList.contains('hidden')) {
            stepsList.classList.remove('hidden');
            toggleStepsBtn.textContent = 'Hide Steps';
            cookingControls.classList.remove('hidden');
        } else {
            stepsList.classList.add('hidden');
            toggleStepsBtn.textContent = 'Show Steps';
            cookingControls.classList.add('hidden');
            resetCooking();
        }
    });

    // Start cooking: highlight first step, enable Next button, start timer
    startCookingBtn.addEventListener('click', () => {
        if (!cookingStarted) {
            cookingStarted = true;
            currentStep = 0;
            highlightStep(currentStep);
            nextStepBtn.disabled = false;
            startCookingBtn.disabled = true;
            startTimer();
            updateProgressBar();
        }
    });

    // Next step button logic
    nextStepBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            unhighlightStep(currentStep);
            currentStep++;
            highlightStep(currentStep);
            updateProgressBar();
        } else {
            // Last step reached
            nextStepBtn.disabled = true;
            clearInterval(timerInterval);
            timerDisplay.textContent = "All steps completed!";
        }
    });

    function highlightStep(index) {
        stepsList.children[index].classList.add('active');
    }

    function unhighlightStep(index) {
        stepsList.children[index].classList.remove('active');
    }

    function updateProgressBar() {
        const progressPercent = ((currentStep + 1) / totalSteps) * 100;
        progressBar.style.width = progressPercent + '%';
    }

    function resetCooking() {
        // Reset all steps highlights and buttons
        for (let i = 0; i < totalSteps; i++) {
            unhighlightStep(i);
        }
        currentStep = -1;
        cookingStarted = false;
        nextStepBtn.disabled = true;
        startCookingBtn.disabled = false;
        progressBar.style.width = '0%';
        clearInterval(timerInterval);
        timerDisplay.textContent = '';
        remainingTime = preparationTimeSeconds;
    }

    // Timer functions
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
                nextStepBtn.disabled = true;
            } else {
                updateTimerDisplay();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
});
