// ---- HAMBURGER ----
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobileMenu() { mobileMenu.classList.remove('open'); }

// ---- TIME & CALENDAR ----
let currentCalendarDate = new Date();

function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    const tzEl = document.getElementById('timezone');
    const dayEl = document.getElementById('day-of-year');
    const weekEl = document.getElementById('week-number');

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${h}:${m}:${s}`;

    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    dayEl.textContent = Math.floor(diff / 86400000);

    const onejan = new Date(now.getFullYear(), 0, 1);
    weekEl.textContent = Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function generateCalendar(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendar-month-year').textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const today = new Date();

    const container = document.getElementById('calendar-days');
    container.innerHTML = '';

    for (let i = firstDay - 1; i >= 0; i--) {
        const d = document.createElement('div');
        d.textContent = daysInPrevMonth - i;
        d.classList.add('other-month');
        container.appendChild(d);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const d = document.createElement('div');
        d.textContent = i;
        if (i === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            d.classList.add('today');
        }
        container.appendChild(d);
    }

    const total = firstDay + daysInMonth;
    const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let i = 1; i <= remaining; i++) {
        const d = document.createElement('div');
        d.textContent = i;
        d.classList.add('other-month');
        container.appendChild(d);
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    generateCalendar(currentCalendarDate);
});
document.getElementById('next-month').addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    generateCalendar(currentCalendarDate);
});

// ---- INIT DATE INPUTS ----
function initializeDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
    document.getElementById('base-date').value = today;
    document.getElementById('birth-date').max = today;
    document.getElementById('age-at-date').max = today;
}

// ---- DATE DIFFERENCE ----
document.getElementById('calculate-date-diff').addEventListener('click', () => {
    const s = new Date(document.getElementById('start-date').value);
    const e = new Date(document.getElementById('end-date').value);
    const unit = document.getElementById('date-unit').value;
    if (!document.getElementById('start-date').value || !document.getElementById('end-date').value) return alert('Please select both dates');
    const ms = Math.abs(e - s);
    const days = Math.round(ms / 86400000);
    let result, label;
    if (unit === 'days') { result = days; label = 'days'; }
    else if (unit === 'weeks') { result = (days / 7).toFixed(2); label = 'weeks'; }
    else if (unit === 'months') { result = (days / 30.44).toFixed(2); label = 'months'; }
    else { result = (days / 365.25).toFixed(2); label = 'years'; }
    document.getElementById('date-result-value').textContent = `${result} ${label}`;
    document.getElementById('date-detail').textContent = `From ${s.toDateString()} to ${e.toDateString()}`;
    const box = document.getElementById('date-result');
    box.style.display = 'block';
    box.style.animation = 'none'; void box.offsetHeight; box.style.animation = '';
});

// ---- DATE ADD/SUBTRACT ----
document.getElementById('calculate-date-add').addEventListener('click', () => {
    const base = new Date(document.getElementById('base-date').value);
    const count = parseInt(document.getElementById('date-count').value);
    const unit = document.getElementById('add-unit').value;
    const isAdd = document.getElementById('add').checked;
    if (!document.getElementById('base-date').value || isNaN(count)) return alert('Please fill in all fields');
    const mult = isAdd ? 1 : -1;
    let result = new Date(base);
    if (unit === 'days') result.setDate(result.getDate() + count * mult);
    else if (unit === 'weeks') result.setDate(result.getDate() + count * 7 * mult);
    else if (unit === 'months') result.setMonth(result.getMonth() + count * mult);
    else result.setFullYear(result.getFullYear() + count * mult);
    document.getElementById('add-date-result-value').textContent = result.toDateString();
    document.getElementById('add-date-detail').textContent = `${isAdd ? '+' : '-'} ${count} ${unit} from ${base.toDateString()}`;
    const box = document.getElementById('add-date-result');
    box.style.display = 'block';
    box.style.animation = 'none'; void box.offsetHeight; box.style.animation = '';
});

// ---- PERCENTAGE OF NUMBER ----
document.getElementById('calculate-percent-of').addEventListener('click', () => {
    const x = parseFloat(document.getElementById('percent-x').value);
    const y = parseFloat(document.getElementById('number-y').value);
    if (isNaN(x) || isNaN(y)) return alert('Please enter valid numbers');
    const r = (x / 100) * y;
    document.getElementById('percent-of-result-value').textContent = r.toFixed(2);
    document.getElementById('percent-of-detail').textContent = `${x}% of ${y} = ${r.toFixed(2)}`;
    showResult('percent-of-result');
});

// ---- PERCENTAGE CHANGE ----
document.getElementById('calculate-percent-change').addEventListener('click', () => {
    const orig = parseFloat(document.getElementById('original-value').value);
    const nv = parseFloat(document.getElementById('new-value').value);
    if (isNaN(orig) || isNaN(nv)) return alert('Please enter valid numbers');
    const change = ((nv - orig) / Math.abs(orig)) * 100;
    const direction = change >= 0 ? '▲ Increase' : '▼ Decrease';
    document.getElementById('percent-change-result-value').textContent = `${change.toFixed(2)}%`;
    document.getElementById('percent-change-detail').textContent = `${direction} from ${orig} to ${nv}`;
    showResult('percent-change-result');
});

// ---- WHAT PERCENT ----
document.getElementById('calculate-what-percent').addEventListener('click', () => {
    const partial = parseFloat(document.getElementById('partial-value').value);
    const total = parseFloat(document.getElementById('total-value').value);
    if (isNaN(partial) || isNaN(total) || total === 0) return alert('Please enter valid numbers');
    const pct = (partial / total) * 100;
    document.getElementById('what-percent-result-value').textContent = `${pct.toFixed(2)}%`;
    document.getElementById('what-percent-detail').textContent = `${partial} is ${pct.toFixed(2)}% of ${total}`;
    showResult('what-percent-result');
});

// ---- AGE CALCULATOR ----
document.getElementById('calculate-age').addEventListener('click', () => {
    const birthDate = new Date(document.getElementById('birth-date').value);
    let target = document.getElementById('age-at-date').value ? new Date(document.getElementById('age-at-date').value) : new Date();
    if (!document.getElementById('birth-date').value) return alert('Please enter your date of birth');

    let years = target.getFullYear() - birthDate.getFullYear();
    let months = target.getMonth() - birthDate.getMonth();
    let days = target.getDate() - birthDate.getDate();

    if (days < 0) { months--; days += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const diffMs = target - birthDate;
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / 3600000);

    const nextBD = new Date(target.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBD < target) nextBD.setFullYear(nextBD.getFullYear() + 1);
    const daysToBD = Math.ceil((nextBD - target) / 86400000);

    document.getElementById('age-years').textContent = years;
    document.getElementById('age-months').textContent = months;
    document.getElementById('age-days').textContent = days;
    document.getElementById('age-hours').textContent = totalHours.toLocaleString();
    document.getElementById('total-days').textContent = totalDays.toLocaleString();
    document.getElementById('total-weeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('next-birthday').textContent = daysToBD;

    showResult('age-result');
});

// ---- BMI ----
document.getElementById('calculate-bmi').addEventListener('click', () => {
    const height = parseFloat(document.getElementById('height-cm').value) / 100;
    const weight = parseFloat(document.getElementById('weight-kg').value);
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) return alert('Please enter valid values');
    const bmi = weight / (height * height);
    let cat, color;
    if (bmi < 18.5) { cat = '🔵 Underweight'; color = '#47d4ff'; }
    else if (bmi < 25) { cat = '🟢 Normal Weight'; color = '#47ff9e'; }
    else if (bmi < 30) { cat = '🟡 Overweight'; color = '#ffdc47'; }
    else { cat = '🔴 Obese'; color = '#ff6047'; }
    document.getElementById('bmi-result-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-category-text').textContent = cat;
    document.getElementById('bmi-category-text').style.color = color;
    document.getElementById('bmi-detail').textContent = `Height: ${document.getElementById('height-cm').value}cm · Weight: ${weight}kg`;
    showResult('bmi-result');
});

// ---- SIMPLE INTEREST ----
document.getElementById('calculate-interest').addEventListener('click', () => {
    const p = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('interest-rate').value);
    const t = parseFloat(document.getElementById('time-period').value);
    if (isNaN(p) || isNaN(r) || isNaN(t)) return alert('Please enter valid numbers');
    const si = (p * r * t) / 100;
    const total = p + si;
    document.getElementById('simple-interest').textContent = si.toFixed(2);
    document.getElementById('total-amount').textContent = total.toFixed(2);
    document.getElementById('interest-detail').textContent = `Principal: ${p} · Rate: ${r}% · Time: ${t} years`;
    showResult('interest-result');
});

// ---- CONTACT FORM ----
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const n = document.getElementById('contact-name').value;
    const em = document.getElementById('contact-email').value;
    const s = document.getElementById('contact-subject').value;
    const msg = document.getElementById('contact-message').value;
    if (!n || !em || !s || !msg) return alert('Please fill in all fields');
    const success = document.getElementById('contact-success');
    success.style.display = 'block';
    success.style.animation = 'none'; void success.offsetHeight; success.style.animation = '';
    document.getElementById('contact-form').reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
});

// ---- HELPER ----
function showResult(id) {
    const box = document.getElementById(id);
    box.style.display = 'block';
    box.style.animation = 'none';
    void box.offsetHeight;
    box.style.animation = 'resultPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both';
}

// ---- INIT ----
updateTime();
setInterval(updateTime, 1000);
generateCalendar(currentCalendarDate);
initializeDateInputs();