const authDiv = document.getElementById("auth");
const panel = document.getElementById("adminPanel");
const list = document.getElementById("problemList");

let isAuthed = false;
const backendURL = "https://your-backend.onrender.com"; // ✅ Replace with your Render URL

async function authAdmin() {
  const entered = document.getElementById("adminPass").value;

  const res = await fetch(`${backendURL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: entered }),
  });

  const result = await res.json();

  if (result.success) {
    authDiv.style.display = "none";
    panel.style.display = "block";
    isAuthed = true;
    fetchProblems();
  } else {
    alert("Incorrect password!");
  }
}

async function fetchProblems() {
  try {
    const res = await fetch(`${backendURL}/api/problems`);
    const problems = await res.json();
    list.innerHTML = "";

    problems.reverse().forEach((p) => {
      const item = document.createElement("div");
      item.className = "problem-entry";
      item.innerHTML = `
        <p><strong>🧠 Problem:</strong> ${p.problem}</p>
        <p><strong>📍 Country:</strong> ${p.country || "N/A"}</p>
        <p><strong>🏢 Sector:</strong> ${p.sector || "N/A"}</p>
        <p><strong>💡 Suggestion:</strong> ${p.suggestion || "N/A"}</p>
        <p><strong>📧 Email:</strong> ${p.email || "N/A"}</p>
        <p><strong>🕒 Time:</strong> ${new Date(
          p.timestamp
        ).toLocaleString()}</p>
        <label>
          <input type="checkbox" ${
            p.solved ? "checked" : ""
          } onchange="toggleSolved('${p._id}', this.checked)">
          ✅ Solved
        </label>
        <button onclick="deleteProblem('${p._id}')">❌ Delete</button>
        <hr>
      `;
      list.appendChild(item);
    });
  } catch (err) {
    console.error(err);
  }
}

async function toggleSolved(id, solved) {
  try {
    await fetch(`${backendURL}/api/solved/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ solved }),
    });
  } catch (err) {
    console.error(err);
  }
}

async function deleteProblem(id) {
  if (!confirm("Are you sure you want to delete this problem?")) return;

  try {
    await fetch(`${backendURL}/api/delete/${id}`, {
      method: "DELETE",
    });
    fetchProblems(); // Refresh list
  } catch (err) {
    console.error(err);
  }
}
