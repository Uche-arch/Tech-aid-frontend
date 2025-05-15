const problemInput = document.getElementById("problem");
const submitBtn = document.getElementById("submitBtn");
const otherRadio = document.getElementById("otherRadio");
const otherSectorInput = document.getElementById("otherSectorInput");
const form = document.getElementById("problemForm");
const modal = document.getElementById("modal");

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

  // Send to backend
  try {
    await fetch("https://tech-aid-backend.onrender.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    form.reset();
    submitBtn.disabled = true;
    modal.style.display = "flex";
  } catch (err) {
    alert("Error submitting problem. Please try again.");
  }
});

function closeModal() {
  modal.style.display = "none";
}
