// Define the steps and corresponding menu items
const steps = [
    document.querySelector('.form-step-1'),
    document.querySelector('.form-step-2'),
    document.querySelector('.form-step-3')
];
  
  const stepMenus = [
    document.querySelector('.form-step-menu1'),
    document.querySelector('.form-step-menu2'),
    document.querySelector('.form-step-menu3')
  ];
  
  const nextBtn = document.querySelector('.form-btn');
  const backBtn = document.querySelector('.form-back-btn');
  const btn1 = document.querySelector('#form-step-menu1');
  const btn2 = document.querySelector('#form-step-menu2');
  const btn3 = document.querySelector('#form-step-menu3');
  const formConfirmButtons = document.querySelectorAll('.form-confirm-btn');
  let prevStep = 0;
  let currentStep = 0;
  
  // Update the UI based on the current step
  function updateSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle('prevactive', index === prevStep);
        setTimeout(() => {
            step.classList.remove('prevactive', index === prevStep);
            step.classList.toggle('active', index === currentStep);
        }, 450);
    });
    stepMenus.forEach((menu, index) => {
        menu.classList.toggle('active', index === currentStep);
    });
    backBtn.classList.toggle('active', currentStep > 0);
    nextBtn.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Next Step';
  }
  
  // Next button event
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      prevStep = currentStep;
      currentStep++;
      updateSteps();
    } else {
      document.querySelector('form').submit();
    }
  });
  
  // Back button event
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      prevStep = currentStep;
      currentStep--;
      updateSteps();
    }
  });

  btn1.addEventListener('click', (e) => {
    e.preventDefault();
    prevStep = currentStep;
    currentStep = 0;
    updateSteps();
  });

  btn2.addEventListener('click', (e) => {
    e.preventDefault();
    prevStep = currentStep;
    currentStep = 1;
    updateSteps();
  });

  btn3.addEventListener('click', (e) => {
    e.preventDefault();
    prevStep = currentStep;
    currentStep = 2;
    updateSteps();
  });


  formConfirmButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (!button.classList.contains('active')) {
        formConfirmButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });

  document.querySelector("form").onsubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/submit', {
        method: 'POST',
        body: new URLSearchParams(formData)
    });
    document.getElementById('response').innerText = await response.text();
};
