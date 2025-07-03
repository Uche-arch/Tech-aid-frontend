const problemInput = document.getElementById("problem");
const submitBtn = document.getElementById("submitBtn");
const otherRadio = document.getElementById("otherRadio");
const otherSectorInput = document.getElementById("otherSectorInput");
const form = document.getElementById("problemForm");

// Modals
const successModal = document.getElementById("modal");
const processingModal = document.getElementById("processingModal");
const processingText = document.getElementById("processingText"); // Make sure this exists in your HTML

// Enable submit button when problem field has text
problemInput.addEventListener("input", () => {
  submitBtn.disabled = problemInput.value.trim() === "";
});

// Show/hide "Other" sector input
otherRadio.addEventListener("change", () => {
  otherSectorInput.style.display = "inline-block";
});
document.querySelectorAll('input[name="sector"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.value !== "Other") {
      otherSectorInput.style.display = "none";
      otherSectorInput.value = "";
    }
  });
});

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    problem: problemInput.value.trim(),
    country: document.getElementById("country").value.trim(),
    sector:
      document.querySelector('input[name="sector"]:checked')?.value === "Other"
        ? otherSectorInput.value.trim()
        : document.querySelector('input[name="sector"]:checked')?.value,
    suggestion: document.getElementById("solution").value.trim(),
    email: document.getElementById("email").value.trim(),
    timestamp: new Date().toISOString(),
  };

  // Random processing messages
  const messages = [
    "Analyzing your submission...",
    "Routing your problem to our solution engine...",
    "Compiling potential solutions...",
    "Logging your idea into our system...",
    "Looking for tech that can help...",
    "You're helping spark innovation...",
    "Scanning the problem landscape...",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Show processing modal with random message
  if (processingText) processingText.textContent = randomMessage;
  processingModal.style.display = "flex";

  try {
    await fetch("https://tech-aid-backend.onrender.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Hide processing modal and show success modal
    processingModal.style.display = "none";
    successModal.style.display = "flex";

    // Auto-close success modal after 3 seconds
    setTimeout(() => {
      successModal.style.display = "none";
    }, 3000);

    form.reset();
    submitBtn.disabled = true;
    otherSectorInput.style.display = "none";
  } catch (err) {
    processingModal.style.display = "none";
    alert("Error submitting problem. Please try again.");
  }
});

function closeModal() {
  successModal.style.display = "none";
}
