/* ==========================================================================
   Sakthi's Senior Portfolio - Application Logic & Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Active Navigation Scroll Effect
  const header = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     Typewriter Animation
     ========================================================================== */
  const typedTextSpan = document.getElementById('typed-text');
  const words = ["BCA Student", "Web Developer", "AI Practitioner", "Data Scientist", "System Hacker"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newWordDelay = 2000;
  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < words[wordIndex].length) {
      typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed + 50);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     Interactive Terminal Shell Simulator
     ========================================================================== */
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');
  
  // Matrix rain canvas references
  const canvas = document.getElementById('matrix-canvas');
  let matrixInterval = null;
  let matrixActive = false;

  const commandHistory = [];
  let historyIndex = -1;

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim();
        terminalInput.value = '';
        if (cmd) {
          commandHistory.push(cmd);
          historyIndex = commandHistory.length;
          executeCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
        e.preventDefault();
      }
    });

    // Auto-scroll terminal body to bottom on clicks
    terminalBody.addEventListener('click', () => {
      if (matrixActive) {
        stopMatrixRain();
      } else {
        terminalInput.focus();
      }
    });
  }

  function printLine(text, className = '') {
    const log = document.createElement('div');
    log.className = `terminal-log ${className}`;
    log.textContent = text;
    terminalOutput.appendChild(log);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(commandStr) {
    const parts = commandStr.toLowerCase().split(' ');
    const cmd = parts[0];

    // Print command input
    printLine(`sakthi-guest ~/portfolio > ${commandStr}`, 'input-cmd');

    if (matrixActive) {
      stopMatrixRain();
    }

    switch (cmd) {
      case 'help':
        printLine('Available commands:', 'success');
        printLine('  help      - Print this guidance index.');
        printLine('  about     - Learn about Sakthi\'s identity.');
        printLine('  education - View college information and major.');
        printLine('  skills    - List developer skill proficiencies.');
        printLine('  clear     - Cleanse the console terminal window.');
        printLine('  matrix    - Load matrix falling characters simulation.');
        printLine('  hack      - Trigger senior-grade mock decryption script.');
        break;

      case 'about':
        printLine('Identity: Sakthi');
        printLine('Role: 2nd-Year BCA (Bachelor of Computer Applications) Student');
        printLine('Location: Porayar, Tamil Nadu, India');
        printLine('Profile: I operate in full-stack web architectures, core programming, artificial intelligence model configurations, and data science scripting.');
        break;

      case 'education':
        printLine('College: TBML College, Porayar', 'success');
        printLine('Degree: Bachelor of Computer Applications (BCA)');
        printLine('Period: 2024 - Present (Currently in Year 2)');
        printLine('Focus: Software development principles, database management, mathematics, and logic structures.');
        break;

      case 'skills':
        printLine('Core Competencies & Technologies:', 'success');
        printLine('  - Languages: HTML5, CSS3, JavaScript (ES6+), Python, SQL');
        printLine('  - Web Dev: Custom styling frameworks, responsive grids, APIs, JSON parsing');
        printLine('  - AI & DS: Machine learning pipelines, regression models, datasets analytics');
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      case 'matrix':
        startMatrixRain();
        break;

      case 'hack':
        triggerMockHacking();
        break;

      default:
        printLine(`Command not found: '${cmd}'. Type 'help' for options.`, 'error');
    }
  }

  /* --- Hacker Mode Mock Hacking Script --- */
  function triggerMockHacking() {
    terminalInput.disabled = true;
    let step = 0;
    const hackSteps = [
      { text: '[INIT]: Resolving remote host tbmlcollege.edu...', color: 'system', delay: 400 },
      { text: '[PORT]: Socket established on port 8080.', color: 'system', delay: 400 },
      { text: '[BYPASS]: Bypassing firewall protocols... Injecting SQL injection vectors...', color: 'success', delay: 600 },
      { text: '[ALERT]: Security handshake failed. Retrying with credential bypass...', color: 'error', delay: 400 },
      { text: '[BYPASS]: Success. Security token compromised.', color: 'success', delay: 600 },
      { text: '[DECRYPT]: Reading server database trees...', color: 'system', delay: 500 },
      { text: '[DUMP]: Extracting academic registry files...', color: 'system', delay: 700 },
      { text: '---------------------------------------------------------', color: 'success', delay: 200 },
      { text: '  RECORD EXTRACTED:', color: 'success', delay: 100 },
      { text: '    Name: Sakthi', color: 'success', delay: 100 },
      { text: '    Class: 2-BCA, TBML College, Porayar', color: 'success', delay: 100 },
      { text: '    Competencies: Web Systems, AI Models, Data Science', color: 'success', delay: 100 },
      { text: '    Status: EXCELLENT DEVELOPER', color: 'success', delay: 100 },
      { text: '---------------------------------------------------------', color: 'success', delay: 200 },
      { text: '[CLEAN]: Erasing terminal logs. Port closed safely.', color: 'system', delay: 400 },
      { text: '[STATUS]: System compromised. Hacking simulated successfully.', color: 'success', delay: 200 }
    ];

    function runStep() {
      if (step < hackSteps.length) {
        const current = hackSteps[step];
        printLine(current.text, current.color);
        step++;
        setTimeout(runStep, current.delay);
      } else {
        terminalInput.disabled = false;
        terminalInput.focus();
      }
    }
    runStep();
  }

  /* --- Matrix Rain Animation Logic --- */
  function startMatrixRain() {
    if (matrixActive) return;
    matrixActive = true;
    canvas.style.display = 'block';
    
    // Fit canvas to terminal container
    canvas.width = terminalBody.clientWidth;
    canvas.height = terminalBody.clientHeight;

    const ctx = canvas.getContext('2d');
    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(3, 3, 12, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }

    matrixInterval = setInterval(draw, 30);
    printLine('Entering Matrix View. Click inside terminal screen or type to exit.', 'success');
  }

  function stopMatrixRain() {
    if (!matrixActive) return;
    matrixActive = false;
    clearInterval(matrixInterval);
    canvas.style.display = 'none';
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    printLine('Matrix simulation stopped.', 'system');
  }

  /* ==========================================================================
     AI & Data Science Playground (Model Trainer Simulator)
     ========================================================================== */
  const btnTrain = document.getElementById('btn-train');
  const btnReset = document.getElementById('btn-reset');
  const lossPath = document.getElementById('loss-path');
  const accPath = document.getElementById('acc-path');
  const metricEpoch = document.getElementById('metric-epoch');
  const metricLoss = document.getElementById('metric-loss');
  const metricAcc = document.getElementById('metric-acc');
  const modelSelect = document.getElementById('model-select');
  const lrSlider = document.getElementById('lr-slider');
  const lrVal = document.getElementById('lr-val');
  const speedSelect = document.getElementById('speed-select');
  const sandboxConsole = document.getElementById('sandbox-console');

  let epoch = 0;
  let loss = 1.0;
  let accuracy = 0.0;
  let trainingInterval = null;
  let isTraining = false;
  
  // Track coordinate arrays for graphing (width=400, height=200)
  // X range: 0 -> 400 (corresponds to epoch 0 -> 100)
  // Y range: 180 (loss=1.0, acc=0.0) -> 20 (loss=0.0, acc=1.0)
  let lossHistory = [];
  let accHistory = [];

  // Slide display listener
  if (lrSlider) {
    lrSlider.addEventListener('input', () => {
      lrVal.textContent = lrSlider.value;
    });
  }

  if (btnTrain) {
    btnTrain.addEventListener('click', () => {
      if (isTraining) {
        pauseTraining();
      } else {
        startTraining();
      }
    });

    btnReset.addEventListener('click', () => {
      resetTraining();
    });
  }

  function writeSandboxLog(text) {
    sandboxConsole.innerHTML += `<br>[SYSTEM]: ${text}`;
    sandboxConsole.scrollTop = sandboxConsole.scrollHeight;
  }

  function updateSVGPaths() {
    if (lossHistory.length === 0) return;

    let lossD = `M 0 ${180 - (1.0 - lossHistory[0]) * 160}`;
    let accD = `M 0 ${180 - accHistory[0] * 160}`;

    for (let i = 1; i < lossHistory.length; i++) {
      const x = (i / 100) * 400;
      const yLoss = 180 - (1.0 - lossHistory[i]) * 160;
      const yAcc = 180 - accHistory[i] * 160;
      
      lossD += ` L ${x} ${yLoss}`;
      accD += ` L ${x} ${yAcc}`;
    }

    lossPath.setAttribute('d', lossD);
    accPath.setAttribute('d', accD);
  }

  function trainStep() {
    if (epoch >= 100) {
      finishTraining();
      return;
    }

    epoch++;
    const lr = parseFloat(lrSlider.value);
    const model = modelSelect.value;
    
    // Simulate training progress mathematically based on params
    let stepLossDecay, stepAccGain;
    if (model === 'nn') {
      // Neural Net is powerful but can be noisy
      stepLossDecay = lr * 0.9 * (1 + Math.random() * 0.4 - 0.1);
      stepAccGain = lr * 0.92 * (1 + Math.random() * 0.3 - 0.1);
    } else if (model === 'dt') {
      // Decision tree fits fast but caps accuracy
      stepLossDecay = lr * 1.2 * (0.8 + Math.random() * 0.1);
      stepAccGain = lr * 1.1 * (0.8 + Math.random() * 0.1);
    } else {
      // Linear regression is simple and smooth
      stepLossDecay = lr * 0.6;
      stepAccGain = lr * 0.55;
    }

    // Apply adjustments
    loss = Math.max(0.015, loss - stepLossDecay);
    accuracy = Math.min(0.992, accuracy + stepAccGain);

    // Caps and bounds adjustments based on models
    if (model === 'dt' && epoch > 60) {
      // Overfitting simulation
      loss = Math.max(0.08, loss + (Math.random() * 0.01 - 0.004));
      accuracy = Math.min(0.85, accuracy + (Math.random() * 0.005 - 0.002));
    }

    if (model === 'lr') {
      accuracy = Math.min(0.72, accuracy);
      loss = Math.max(0.28, loss);
    }

    lossHistory.push(loss);
    accHistory.push(accuracy);

    // Update labels
    metricEpoch.textContent = `${epoch}/100`;
    metricLoss.textContent = loss.toFixed(4);
    metricAcc.textContent = `${(accuracy * 100).toFixed(2)}%`;

    // Render paths
    updateSVGPaths();

    // Log epoch events periodically
    if (epoch % 10 === 0) {
      writeSandboxLog(`Epoch ${epoch}/100: loss = ${loss.toFixed(4)}, accuracy = ${(accuracy*100).toFixed(2)}%`);
    }
  }

  function startTraining() {
    isTraining = true;
    btnTrain.innerHTML = '<i data-lucide="pause" style="width: 14px; height: 14px;"></i> Pause';
    lucide.createIcons();

    if (epoch === 0) {
      const modelName = modelSelect.options[modelSelect.selectedIndex].text;
      writeSandboxLog(`Initializing training pipeline for ${modelName}...`);
      writeSandboxLog(`Parameters: Learning Rate = ${lrSlider.value}`);
      lossHistory = [loss];
      accHistory = [accuracy];
    } else {
      writeSandboxLog('Resuming simulator run loop...');
    }

    const fps = speedSelect.value === 'fast' ? 60 : speedSelect.value === 'slow' ? 5 : 30;
    const intervalMs = 1000 / fps;

    trainingInterval = setInterval(trainStep, intervalMs);
  }

  function pauseTraining() {
    isTraining = false;
    btnTrain.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> Resume';
    lucide.createIcons();
    clearInterval(trainingInterval);
    writeSandboxLog('Training loop paused by host command.');
  }

  function finishTraining() {
    isTraining = false;
    btnTrain.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> Start';
    btnTrain.disabled = true;
    lucide.createIcons();
    clearInterval(trainingInterval);
    writeSandboxLog('------------------------------------------------');
    writeSandboxLog(`[SUCCESS]: Model training complete in 100 epochs.`);
    writeSandboxLog(`Final loss: ${loss.toFixed(4)} | Final accuracy: ${(accuracy * 100).toFixed(2)}%`);
  }

  function resetTraining() {
    isTraining = false;
    clearInterval(trainingInterval);
    epoch = 0;
    loss = 1.0;
    accuracy = 0.0;
    lossHistory = [];
    accHistory = [];
    
    metricEpoch.textContent = '0/100';
    metricLoss.textContent = '1.0000';
    metricAcc.textContent = '0.00%';
    
    lossPath.setAttribute('d', 'M 0 180');
    accPath.setAttribute('d', 'M 0 180');
    btnTrain.disabled = false;
    btnTrain.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> Start';
    lucide.createIcons();
    
    sandboxConsole.innerHTML = '[SYSTEM]: Simulator idle. Select architecture and click Start.';
  }

  /* ==========================================================================
     Project Cards Category Filtering System
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset active button class
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.classList.add('secondary');
      });
      btn.classList.add('active');
      btn.classList.remove('secondary');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     Contact Form Mock Secure Message Transmit
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const btnSubmitContact = document.getElementById('btn-submit-contact');

  if (contactForm && btnSubmitContact) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) return;

      // Disable button and show loader text
      btnSubmitContact.disabled = true;
      btnSubmitContact.textContent = 'Transmitting data packet...';

      // Simulate a network transmission lag of 1.5 seconds
      setTimeout(() => {
        btnSubmitContact.textContent = 'Transmission Succeeded!';
        btnSubmitContact.style.backgroundColor = 'var(--color-emerald)';
        btnSubmitContact.style.borderColor = 'var(--color-emerald)';
        btnSubmitContact.style.color = '#000000';
        btnSubmitContact.style.boxShadow = 'var(--glow-emerald)';

        // Clean form entries
        contactForm.reset();

        // Revert styling after 3 seconds
        setTimeout(() => {
          btnSubmitContact.disabled = false;
          btnSubmitContact.textContent = 'Transmit Message';
          btnSubmitContact.style.backgroundColor = '';
          btnSubmitContact.style.borderColor = '';
          btnSubmitContact.style.color = '';
          btnSubmitContact.style.boxShadow = '';
        }, 3000);
      }, 1500);
    });
  }
});
