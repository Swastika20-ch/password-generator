const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");

const toast = document.getElementById("toast");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", copyPassword);

function generatePassword() {

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]<>?/";

    let chars = "";

    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {
        alert("Please select at least one option!");
        return;
    }

    let password = "";

    for (let i = 0; i < lengthSlider.value; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    passwordField.value = password;

    updateStrength(password);
}

function updateStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthFill.style.width = "33%";
        strengthFill.style.background = "#ef4444";
    }

    else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthFill.style.width = "66%";
        strengthFill.style.background = "#f59e0b";
    }

    else {
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
    }
}

function copyPassword() {

    if (passwordField.value === "") {
        return;
    }

    navigator.clipboard.writeText(passwordField.value);

    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2000);
}

generatePassword();