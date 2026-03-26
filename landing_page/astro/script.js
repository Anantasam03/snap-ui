// Set the date we're counting down to (1 month from now)
const countDownDate = new Date();
countDownDate.setMonth(countDownDate.getMonth() + 1);

// Update the countdown every 1 second
const countdownFunction = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the countdown date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the results
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

// Add astronaut floating animation elements
document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero-section");

  // Create floating astronauts
  const astronaut1 = document.createElement("div");
  astronaut1.className = "astronaut-float astronaut-1";
  astronaut1.innerHTML = "👨‍🚀";
  heroSection.appendChild(astronaut1);

  const astronaut2 = document.createElement("div");
  astronaut2.className = "astronaut-float astronaut-2";
  astronaut2.innerHTML = "👩‍🚀";
  heroSection.appendChild(astronaut2);

  // Add pulse animation to countdown numbers
  const countdownNumbers = document.querySelectorAll(".countdown-number");
  countdownNumbers.forEach((number) => {
    number.classList.add("pulse");
  });

  // Form submission handler
  const notifyButton = document.querySelector(".btn-astro");
  const emailInput = document.querySelector('input[type="email"]');

  notifyButton.addEventListener("click", function () {
    if (emailInput.value && emailInput.value.includes("@")) {
      alert("Thank you! We'll notify you when Astro Project launches.");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

  // Allow submission with Enter key
  emailInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      notifyButton.click();
    }
  });
});
