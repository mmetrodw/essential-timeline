const introDate = document.querySelector('.etl-timeline-intro-date');
const date = '9 січня 2025';
console.log(introDate);
for(var i = 0; i < date.length; i++) {
	const char = document.createElement('span');
	char.innerHTML = date[i];
	char.style.setProperty('--char-animation-delay', `${25 * i}ms`);
	introDate.appendChild(char);
}