/* Show Menu */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        // Simple toggle for burger icon animation
        navToggle.classList.toggle('active'); 
    });
}

/* Remove Menu Mobile */
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
    if (navToggle) {
        navToggle.classList.remove('active');
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/* Scroll Sections Active Link */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // Adjusted for header height
        let sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if(link){
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* Typing Animation & Copy to Clipboard */
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = ['Security Engineer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = displayText;

            let typeSpeed = 150;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing new role
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Copy to Clipboard
    const copyBtn = document.getElementById('copy-phone-btn');
    const phoneNum = document.getElementById('phone-number');

    if (copyBtn && phoneNum) {
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            const textToCopy = phoneNum.innerText;

            // Use the document.execCommand for better iFrame compatibility
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                
                // Visual feedback
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Copied!';
                copyBtn.style.color = 'var(--primary-color)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.style.color = 'var(--text-color-light)';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            document.body.removeChild(textArea);
        });
    }
});

// --- Terminal Feature Integration ---
document.addEventListener('DOMContentLoaded', function() {
  const terminalBtn = document.getElementById('terminalBtn');
  const terminalModal = document.getElementById('terminalModal');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalClose = document.getElementById('terminalClose');
  const terminalContent = document.getElementById('terminalContent');

  // --- Command and Fun Stuff ---
  const terminalCommands = [
    "help","about","sudo",
    "contact","blog","github","whoami","quote",
    "clear","close"
  ];
  const quotes = [
    "Security is not a product, but a process. – Bruce Schneier",
    "Hack the planet!",
    "Innovation distinguishes between a leader and a follower. – Steve Jobs",
    "Obstacles are those frightful things you see when you take your eyes off your goal. – Henry Ford",
    "Keep calm and patch it!"
  ];

  function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';
    inputLine.innerHTML = `
      <span class="prompt">atharva@portfolio $</span>
      <input type="text" class="command-input" id="terminalInput" autocomplete="off" autofocus />
    `;
    terminalContent.appendChild(inputLine);
    const inputField = inputLine.querySelector('.command-input');
    inputField.focus();

    inputField.addEventListener('keydown', function(e) {
      // Tab autocomplete
      if (e.key === 'Tab') {
        e.preventDefault();
        const val = inputField.value.trim().toLowerCase();
        const matches = terminalCommands.filter(cmd => cmd.startsWith(val));
        if (matches.length === 1) {
          inputField.value = matches[0];
        } else if (matches.length > 1) {
          showAutocomplete(matches);
        }
      }
      // Enter to execute
      if (e.key === 'Enter') {
        const cmd = inputField.value.trim().toLowerCase();
        addOutputLine("> " + cmd);
        processCommand(cmd);
        inputField.disabled = true;
        hideAutocomplete();
        setTimeout(createInputLine, 100);
      }
      // Hide autocomplete on esc/backspace
      if (["Escape", "Backspace"].includes(e.key)) hideAutocomplete();
    });

    inputField.addEventListener('input', function() {
      hideAutocomplete();
    });
  }

  // Autocomplete dropdown UI logic
  function showAutocomplete(options) {
    let acElem = document.getElementById('terminalAutocomplete');
    if (!acElem) {
      acElem = document.createElement('div');
      acElem.id = 'terminalAutocomplete';
      acElem.className = 'autocomplete show';
      terminalContent.appendChild(acElem);
    }
    acElem.innerHTML = options.map(opt => `<div class="autocomplete-item">${opt}</div>`).join('');
    Array.from(acElem.children).forEach(item => {
      item.onclick = () => {
        document.getElementById('terminalInput').value = item.textContent;
        hideAutocomplete();
        document.getElementById('terminalInput').focus();
      };
    });
  }
  function hideAutocomplete() {
    const acElem = document.getElementById('terminalAutocomplete');
    if (acElem) acElem.remove();
  }
  function addOutputLine(text, className = 'output result') {
    const respElem = document.createElement('div');
    respElem.className = className;
    respElem.textContent = text;
    terminalContent.appendChild(respElem);
  }

  // Command execution (fun included!)
  function processCommand(cmd) {
    switch (cmd) {
      case "help":
        addOutputLine("Available commands: " + terminalCommands.join(", "));
        break;
      case "about":
        addOutputLine("Atharva Shirude | Security Engineer | LLM Apps, Pentesting, AI & Cloud Security.");
        break;
      case "sudo":
        addOutputLine(
          "Permission denied. This incident will be reported."
        );
        break;
      case "contact":
        addOutputLine("Email: sec.atharvashirude@gmail.com | LinkedIn: linkedin.com/in/atharvashirude");
        break;
      case "blog":
        addOutputLine("Personal Blog: rootissh.in");
        break;
      case "pwd":
        addOutputLine("/home/atharva");
        break; 
      case "ls":
        addOutputLine(".");
        addOutputLine("..");
        break; 
      case "github":
        addOutputLine("GitHub: github.com/AtharvaShirude");
        break;
      case "whoami":
        addOutputLine("Atharva Shirude, Security Engineer, passionate about AI, application, and cloud security.");
        break;
      case "quote":
        addOutputLine(quotes[Math.floor(Math.random() * quotes.length)]);
        break;
      case "clear":
        terminalContent.innerHTML = '';
        break;
      case "close":
        terminalModal.classList.add('hidden');
        break;
      default:
        addOutputLine("Unknown command. Type 'help' for options.", 'output error');
    }
  }

  // Open terminal modal
  terminalBtn && terminalBtn.addEventListener('click', () => {
  // Show loading overlay
  const loading = document.getElementById('terminalLoading');
  if (loading) loading.style.display = 'flex';

  // Simulate loading (e.g., 1200ms), then hide loading & show terminal
  setTimeout(() => {
    if (loading) loading.style.display = 'none';
    terminalModal.classList.remove('hidden');
    terminalContent.innerHTML = `<pre>
Welcome to Atharva's Terminal!
Type 'help' to see available commands.
You can use tab completion.
    </pre>`;
    createInputLine();
  }, 1200); // 1.2s, adjust as desired
});
  // Overlay and close icon actions
  [terminalOverlay, terminalClose].forEach(el => {
    el && el.addEventListener('click', () => terminalModal.classList.add('hidden'));
  });
});


