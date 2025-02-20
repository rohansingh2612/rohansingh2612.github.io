document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const htmlElement = document.documentElement;
  const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
  const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
  
  function setTheme(isDark) {
      htmlElement.classList.toggle('dark', isDark);
      sunIcon.classList.toggle('hidden', isDark);
      moonIcon.classList.toggle('hidden', !isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  setTheme(savedTheme === 'dark');
  
  themeToggle.addEventListener('click', () => {
      setTheme(!htmlElement.classList.contains('dark'));
  });

  // Typing effect
  const titles = ['Rohan Singh', 'Web Developer', 'AI Enthusiast', 'Coding Ninja'];
  const typingTitle = document.getElementById('typingTitle');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
      const currentWord = titles[titleIndex];
      if (isDeleting) {
          typingTitle.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
      } else {
          typingTitle.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => {
              isDeleting = true;
          }, 1000);
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
      }

      const typingSpeed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // Skills
  const skills = [
      { name: 'Web Development', progress: 80 },
      { name: 'Figma', progress: 75 },
      { name: 'Graphic Designing', progress: 70 },
      { name: 'UI/UX', progress: 65 },
      { name: 'Software Development', progress: 60 },
  ];

  const skillsContainer = document.getElementById('skillsContainer');

  function renderSkills() {
      skillsContainer.innerHTML = '';
      skills.forEach((skill) => {
          const skillElement = document.createElement('div');
          skillElement.className = 'w-full flex-shrink-0';
          skillElement.innerHTML = `
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-2 transition-colors duration-300">
                  <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-300">${skill.name}</h3>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 transition-colors duration-300">
                      <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" style="width: 0%"></div>
                  </div>
                  <p class="mt-2 text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">${skill.progress}%</p>
              </div>
          `;
          skillsContainer.appendChild(skillElement);
          
          // Animate progress bar
          setTimeout(() => {
              skillElement.querySelector('.bg-blue-600').style.width = `${skill.progress}%`;
          }, 100);
      });
  }

  renderSkills();

  // Projects
  const projects = [
      {
          title: 'Exam Result Calculator',
          description: 'A command-line tool in C for calculating exam results.',
          link: 'https://github.com/rohansingh2612/Exam-Result-Calculator',
      },
      {
          title: 'Income Tax Calculator',
          description: 'A simple command-line tool in C for calculating income tax based on annual income.',
          link: 'https://github.com/rohansingh2612/Income-tax-calculator',
      },
      {
          title: 'Guess the Number Game',
          description: 'A simple command-line number guessing game implemented in C.',
          link: 'https://github.com/rohansingh2612/guess-the-number-game',
      },
  ];

  const projectsContainer = document.getElementById('projectsContainer');

  function renderProjects() {
      projectsContainer.innerHTML = '';
      projects.forEach((project, index) => {
          const projectElement = document.createElement('div');
          projectElement.className = 'w-full flex-shrink-0';
          projectElement.innerHTML = `
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 m-2 transition-colors duration-300">
                  <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-300">${project.title}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">${project.description}</p>
                  <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300">View Project</a>
              </div>
          `;
          projectsContainer.appendChild(projectElement);
      });
  }

  renderProjects();

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const statusPopup = document.getElementById('statusPopup');
  const popupContent = document.getElementById('popupContent');
  const popupIcon = document.getElementById('popupIcon');
  const popupText = document.getElementById('popupText');
  const popupCloseButton = document.getElementById('popupCloseButton');

  // Initialize EmailJS
  emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID

  function showPopupMessage(message, success = true) {
      popupText.textContent = message;
      if (success) {
          popupIcon.innerHTML = '&#x2714;'; // Checkmark icon (✔)
          popupContent.className = "bg-green-500 text-white p-4 rounded-lg shadow-lg";
      } else {
          popupIcon.innerHTML = '&#x274C;'; // Cross icon (❌)
          popupContent.className = "bg-red-500 text-white p-4 rounded-lg shadow-lg";
      }
      statusPopup.classList.remove("hidden");
      setTimeout(() => statusPopup.classList.add("show"), 50);
      setTimeout(() => {
          statusPopup.classList.remove("show");
          setTimeout(() => statusPopup.classList.add("hidden"), 500);
      }, 5000);
  }

  popupCloseButton.addEventListener("click", () => {
      statusPopup.classList.remove("show");
      setTimeout(() => statusPopup.classList.add("hidden"), 500);
  });

  contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const templateParams = {
          name: name,
          email: email,
          message: message
      };

      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
          .then(function(response) {
              showPopupMessage("Your message has been sent successfully!", true);
              contactForm.reset();
          }, function(error) {
              showPopupMessage("Failed to send message. Please try again later.", false);
          });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Intersection Observer for fade-in animations
  const fadeElems = document.querySelectorAll('.fade-in');
  const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              return;
          } else {
              entry.target.classList.add('appear');
              appearOnScroll.unobserve(entry.target);
          }
      });
  }, appearOptions);

  fadeElems.forEach(elem => {
      appearOnScroll.observe(elem);
  });
});