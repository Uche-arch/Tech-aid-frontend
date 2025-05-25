// Dark mode toggle and persistence
const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    });
