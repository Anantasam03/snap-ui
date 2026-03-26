// Time & Calendar
const currentTimeElement = document.getElementById("current-time");
const currentDateElement = document.getElementById("current-date");
const timezoneElement = document.getElementById("timezone");
const dayOfYearElement = document.getElementById("day-of-year");
const weekNumberElement = document.getElementById("week-number");
const calendarMonthYearElement = document.getElementById("calendar-month-year");
const calendarDaysElement = document.getElementById("calendar-days");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

// Date Calculator
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const dateUnitSelect = document.getElementById("date-unit");
const calculateDateDiffButton = document.getElementById("calculate-date-diff");
const dateResultBox = document.getElementById("date-result");
const dateResultValue = document.getElementById("date-result-value");
const dateDetailElement = document.getElementById("date-detail");

const baseDateInput = document.getElementById("base-date");
const dateCountInput = document.getElementById("date-count");
const addUnitSelect = document.getElementById("add-unit");
const calculateDateAddButton = document.getElementById("calculate-date-add");
const addDateResultBox = document.getElementById("add-date-result");
const addDateResultValue = document.getElementById("add-date-result-value");
const addDateDetailElement = document.getElementById("add-date-detail");

// Percentage Calculator
const percentXInput = document.getElementById("percent-x");
const numberYInput = document.getElementById("number-y");
const calculatePercentOfButton = document.getElementById(
  "calculate-percent-of",
);
const percentOfResultBox = document.getElementById("percent-of-result");
const percentOfResultValue = document.getElementById("percent-of-result-value");
const percentOfDetailElement = document.getElementById("percent-of-detail");

const originalValueInput = document.getElementById("original-value");
const newValueInput = document.getElementById("new-value");
const calculatePercentChangeButton = document.getElementById(
  "calculate-percent-change",
);
const percentChangeResultBox = document.getElementById("percent-change-result");
const percentChangeResultValue = document.getElementById(
  "percent-change-result-value",
);
const percentChangeDetailElement = document.getElementById(
  "percent-change-detail",
);

const partialValueInput = document.getElementById("partial-value");
const totalValueInput = document.getElementById("total-value");
const calculateWhatPercentButton = document.getElementById(
  "calculate-what-percent",
);
const whatPercentResultBox = document.getElementById("what-percent-result");
const whatPercentResultValue = document.getElementById(
  "what-percent-result-value",
);
const whatPercentDetailElement = document.getElementById("what-percent-detail");

// Age Calculator
const birthDateInput = document.getElementById("birth-date");
const ageAtDateInput = document.getElementById("age-at-date");
const calculateAgeButton = document.getElementById("calculate-age");
const ageResultBox = document.getElementById("age-result");
const ageYearsElement = document.getElementById("age-years");
const ageMonthsElement = document.getElementById("age-months");
const ageDaysElement = document.getElementById("age-days");
const ageHoursElement = document.getElementById("age-hours");
const totalDaysElement = document.getElementById("total-days");
const totalWeeksElement = document.getElementById("total-weeks");
const nextBirthdayElement = document.getElementById("next-birthday");

// Other Calculators
const heightCmInput = document.getElementById("height-cm");
const weightKgInput = document.getElementById("weight-kg");
const calculateBmiButton = document.getElementById("calculate-bmi");
const bmiResultBox = document.getElementById("bmi-result");
const bmiResultValue = document.getElementById("bmi-result-value");
const bmiCategoryElement = document.getElementById("bmi-category-text");
const bmiDetailElement = document.getElementById("bmi-detail");

const principalInput = document.getElementById("principal");
const interestRateInput = document.getElementById("interest-rate");
const timePeriodInput = document.getElementById("time-period");
const calculateInterestButton = document.getElementById("calculate-interest");
const interestResultBox = document.getElementById("interest-result");
const simpleInterestElement = document.getElementById("simple-interest");
const totalAmountElement = document.getElementById("total-amount");
const interestDetailElement = document.getElementById("interest-detail");

// Contact Form
const contactForm = document.getElementById("contact-form");
const contactSuccessElement = document.getElementById("contact-success");

// ==================== Global Variables ====================
let currentCalendarDate = new Date();

// ==================== Initialize Date Inputs ====================
function initializeDateInputs() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Set max date for birth date to today
  birthDateInput.max = todayStr;

  // Set default values for date inputs
  startDateInput.value = todayStr;
  endDateInput.value = todayStr;
  baseDateInput.value = todayStr;
  ageAtDateInput.value = todayStr;

  // Set birth date to 30 years ago as example
  const thirtyYearsAgo = new Date();
  thirtyYearsAgo.setFullYear(today.getFullYear() - 30);
  birthDateInput.value = thirtyYearsAgo.toISOString().split("T")[0];
}

// ==================== Time & Calendar Functions ====================
function updateTime() {
  const now = new Date();

  // Update time
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: false,
  });
  currentTimeElement.textContent = timeString;

  // Update date
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", dateOptions);
  currentDateElement.textContent = dateString;

  // Update timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timezoneElement.textContent = timezone.split("/")[1] || timezone;

  // Update day of year
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  dayOfYearElement.textContent = dayOfYear;

  // Update week number
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
  const weekNumber = Math.ceil(
    (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7,
  );
  weekNumberElement.textContent = weekNumber;
}

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Update calendar header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  calendarMonthYearElement.textContent = `${monthNames[month]} ${year}`;

  // Get first day of month and total days in month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();

  // Get previous month's last days
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  // Clear calendar days
  calendarDaysElement.innerHTML = "";

  // Previous month days
  for (let i = firstDayIndex; i > 0; i--) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("other-month");
    dayElement.textContent = prevMonthLastDay - i + 1;
    calendarDaysElement.appendChild(dayElement);
  }

  // Current month days
  const today = new Date();
  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = i;

    // Highlight today
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    calendarDaysElement.appendChild(dayElement);
  }

  // Next month days
  const totalCells = 42; // 6 weeks * 7 days
  const nextDays = totalCells - (firstDayIndex + totalDays);
  for (let i = 1; i <= nextDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("other-month");
    dayElement.textContent = i;
    calendarDaysElement.appendChild(dayElement);
  }
}

// ==================== Date Calculator Functions ====================
function calculateDateDifference() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const unit = dateUnitSelect.value;

  if (!startDateInput.value || !endDateInput.value) {
    alert("Please select both start and end dates");
    return;
  }

  // Calculate difference in milliseconds
  const diffMs = endDate - startDate;

  let result = 0;
  let detail = "";

  switch (unit) {
    case "days":
      result = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      detail = `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      break;
    case "weeks":
      result = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
      detail = `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      break;
    case "months":
      const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
      const monthsDiff = endDate.getMonth() - startDate.getMonth();
      result = yearsDiff * 12 + monthsDiff;
      detail = `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      break;
    case "years":
      result = endDate.getFullYear() - startDate.getFullYear();
      detail = `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      break;
  }

  // Display result
  dateResultValue.textContent = `${Math.abs(result)} ${unit}`;
  dateDetailElement.textContent = detail;
  dateResultBox.style.display = "block";
}

function calculateDateAddSubtract() {
  const baseDate = new Date(baseDateInput.value);
  const count = parseInt(dateCountInput.value);
  const unit = addUnitSelect.value;
  const operation = document.querySelector(
    'input[name="operation"]:checked',
  ).id;

  if (!baseDateInput.value || isNaN(count)) {
    alert("Please enter a valid date and count");
    return;
  }

  const resultDate = new Date(baseDate);

  switch (unit) {
    case "days":
      operation === "add"
        ? resultDate.setDate(resultDate.getDate() + count)
        : resultDate.setDate(resultDate.getDate() - count);
      break;
    case "weeks":
      operation === "add"
        ? resultDate.setDate(resultDate.getDate() + count * 7)
        : resultDate.setDate(resultDate.getDate() - count * 7);
      break;
    case "months":
      operation === "add"
        ? resultDate.setMonth(resultDate.getMonth() + count)
        : resultDate.setMonth(resultDate.getMonth() - count);
      break;
    case "years":
      operation === "add"
        ? resultDate.setFullYear(resultDate.getFullYear() + count)
        : resultDate.setFullYear(resultDate.getFullYear() - count);
      break;
  }

  // Display result
  const operationText = operation === "add" ? "after" : "before";
  addDateResultValue.textContent = resultDate.toDateString();
  addDateDetailElement.textContent = `${count} ${unit} ${operationText} ${baseDate.toDateString()}`;
  addDateResultBox.style.display = "block";
}

// ==================== Percentage Calculator Functions ====================
function calculatePercentOf() {
  const percent = parseFloat(percentXInput.value);
  const number = parseFloat(numberYInput.value);

  if (isNaN(percent) || isNaN(number)) {
    alert("Please enter valid numbers");
    return;
  }

  const result = (percent / 100) * number;

  percentOfResultValue.textContent = result.toFixed(2);
  percentOfDetailElement.textContent = `${percent}% of ${number} is ${result.toFixed(2)}`;
  percentOfResultBox.style.display = "block";
}

function calculatePercentChange() {
  const original = parseFloat(originalValueInput.value);
  const newVal = parseFloat(newValueInput.value);

  if (isNaN(original) || isNaN(newVal)) {
    alert("Please enter valid numbers");
    return;
  }

  const change = newVal - original;
  const percentChange = (change / original) * 100;

  percentChangeResultValue.textContent = `${percentChange.toFixed(2)}%`;
  percentChangeDetailElement.textContent = `From ${original} to ${newVal} is a ${change > 0 ? "increase" : "decrease"} of ${Math.abs(percentChange).toFixed(2)}%`;
  percentChangeResultBox.style.display = "block";
}

function calculateWhatPercent() {
  const partial = parseFloat(partialValueInput.value);
  const total = parseFloat(totalValueInput.value);

  if (isNaN(partial) || isNaN(total) || total === 0) {
    alert("Please enter valid numbers (total cannot be zero)");
    return;
  }

  const percent = (partial / total) * 100;

  whatPercentResultValue.textContent = `${percent.toFixed(2)}%`;
  whatPercentDetailElement.textContent = `${partial} is ${percent.toFixed(2)}% of ${total}`;
  whatPercentResultBox.style.display = "block";
}

// ==================== Age Calculator Functions ====================
function calculateAge() {
  const birthDate = new Date(birthDateInput.value);
  let targetDate = new Date(ageAtDateInput.value);

  if (!birthDateInput.value) {
    alert("Please enter your date of birth");
    return;
  }

  // If no target date is provided, use today
  if (!ageAtDateInput.value) {
    targetDate = new Date();
  }

  // Calculate age
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  // Adjust for negative days/months
  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      0,
    );
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days
  const diffMs = targetDate - birthDate;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

  // Calculate next birthday
  const nextBirthday = new Date(
    targetDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );
  if (nextBirthday < targetDate) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysToBirthday = Math.ceil(
    (nextBirthday - targetDate) / (1000 * 60 * 60 * 24),
  );

  // Update UI
  ageYearsElement.textContent = years;
  ageMonthsElement.textContent = months;
  ageDaysElement.textContent = days;
  ageHoursElement.textContent = totalHours;
  totalDaysElement.textContent = totalDays;
  totalWeeksElement.textContent = totalWeeks;
  nextBirthdayElement.textContent = daysToBirthday;

  ageResultBox.style.display = "block";
}

// ==================== Other Calculator Functions ====================
function calculateBMI() {
  const height = parseFloat(heightCmInput.value) / 100; // Convert cm to meters
  const weight = parseFloat(weightKgInput.value);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight values");
    return;
  }

  const bmi = weight / (height * height);
  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#17a2b8"; // Teal
  } else if (bmi < 25) {
    category = "Normal weight";
    color = "#28a745"; // Green
  } else if (bmi < 30) {
    category = "Overweight";
    color = "#ffc107"; // Yellow
  } else {
    category = "Obese";
    color = "#dc3545"; // Red
  }

  bmiResultValue.textContent = bmi.toFixed(1);
  bmiCategoryElement.textContent = category;
  bmiCategoryElement.parentElement.style.backgroundColor = color + "20"; // Add opacity
  bmiCategoryElement.parentElement.style.borderLeft = `5px solid ${color}`;
  bmiDetailElement.textContent = `For a height of ${heightCmInput.value}cm and weight of ${weight}kg`;
  bmiResultBox.style.display = "block";
}

function calculateSimpleInterest() {
  const principal = parseFloat(principalInput.value);
  const rate = parseFloat(interestRateInput.value);
  const time = parseFloat(timePeriodInput.value);

  if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
    alert("Please enter valid numbers for all fields");
    return;
  }

  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  simpleInterestElement.textContent = interest.toFixed(2);
  totalAmountElement.textContent = total.toFixed(2);
  interestDetailElement.textContent = `On a principal of $${principal} at ${rate}% for ${time} years`;
  interestResultBox.style.display = "block";
}

// ==================== Contact Form Functions ====================
function handleContactFormSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-message").value;

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // In a real application, you would send this data to a server
  // For this demo, we'll just show a success message
  contactSuccessElement.style.display = "block";

  // Reset form
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    contactSuccessElement.style.display = "none";
  }, 5000);
}

// ==================== Event Listeners ====================
// Time & Calendar
prevMonthButton.addEventListener("click", () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
  generateCalendar(currentCalendarDate);
});

nextMonthButton.addEventListener("click", () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
  generateCalendar(currentCalendarDate);
});

// Date Calculator
calculateDateDiffButton.addEventListener("click", calculateDateDifference);
calculateDateAddButton.addEventListener("click", calculateDateAddSubtract);

// Percentage Calculator
calculatePercentOfButton.addEventListener("click", calculatePercentOf);
calculatePercentChangeButton.addEventListener("click", calculatePercentChange);
calculateWhatPercentButton.addEventListener("click", calculateWhatPercent);

// Age Calculator
calculateAgeButton.addEventListener("click", calculateAge);

// Other Calculators
calculateBmiButton.addEventListener("click", calculateBMI);
calculateInterestButton.addEventListener("click", calculateSimpleInterest);

// Contact Form
contactForm.addEventListener("submit", handleContactFormSubmit);

// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Update active nav link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// ==================== Initialize Application ====================
function initApp() {
  // Initialize date inputs
  initializeDateInputs();

  // Initialize time and update every second
  updateTime();
  setInterval(updateTime, 1000);

  // Initialize calendar
  generateCalendar(currentCalendarDate);

  // Set today's date in calendar
  const today = new Date();
  currentCalendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
  generateCalendar(currentCalendarDate);
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
