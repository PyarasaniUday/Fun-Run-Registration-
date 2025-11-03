function registerFunRun(event) {
  event.preventDefault();

  // Collect all input values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const distance = document.getElementById("distance").value;
  const pace = parseFloat(document.getElementById("estimatedPace").value);
  const size = document.getElementById("tShirtSize").value;
  const isStudent = document.getElementById("isStudent").checked;
  const resultDiv = document.getElementById("result");

  // Clear previous errors & results
  const errorIds = [
    "err-fullName",
    "err-email",
    "err-phone",
    "err-age",
    "err-distance",
    "err-pace",
    "err-shirt",
  ];

  errorIds.forEach((id) => (document.getElementById(id).textContent = ""));
  resultDiv.innerHTML = "";

  let hasError = false;

  // --- VALIDATIONS ---
  if (fullName.length < 3) {
    document.getElementById("err-fullName").textContent =
      "Full name must be at least 3 characters";
    hasError = true;
  }

  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("err-email").textContent = "Enter valid email";
    hasError = true;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    document.getElementById("err-phone").textContent = "Phone must be 10 digits";
    hasError = true;
  }

  if (isNaN(age) || age < 12) {
    document.getElementById("err-age").textContent = "Age must be at least 12";
    hasError = true;
  }

  if (!distance) {
    document.getElementById("err-distance").textContent = "Select distance";
    hasError = true;
  }

  if (isNaN(pace) || pace < 3 || pace > 20) {
    document.getElementById("err-pace").textContent =
      "Pace must be between 3 and 20";
    hasError = true;
  }

  if (!size) {
    document.getElementById("err-shirt").textContent = "Select T-shirt size";
    hasError = true;
  }

  if (hasError) return; // Stop if any validation fails

  // --- FEE CALCULATION ---
  let fee = distance === "5K" ? 300 : 500;

  if (age >= 60) {
    fee *= 0.8; // 20% off senior discount
  } else if (isStudent && age >= 18) {
    fee *= 0.7; // 30% off student discount
  }

  // --- WAVE CLASSIFICATION ---
  let wave;
  if (pace <= 5) wave = "Elite Wave";
  else if (pace <= 7) wave = "Fast Wave";
  else if (pace <= 10) wave = "Regular Wave";
  else wave = "Walking Wave";

  // --- CONFIRMATION CODE ---
  const today =new Date();
  const yy = today.getFullYear().toString().slice(-2);
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const code = `FR-${distance}-${yy}${mm}${dd}-${randomPart}`;

  // --- DISPLAY SUMMARY ---
  const summaryHTML = `
    <div class="summary">
      <strong>Registered:</strong> ${fullName}<br>
      Distance: ${distance}<br>
      Wave: ${wave}<br>
      Fee: ₹${fee.toFixed(0)}<br>
      Confirmation Code: <strong>${code}</strong>
    </div>
  `;

  resultDiv.innerHTML = summaryHTML;
}
