const eTimelineInitialSettings = {
	target: null,
	timeline: null,
	options: {
		theme: 'dark',
		navigationPosition: 'bottom',
		opener: {
			enabled: true,
			date: {
				animationDuration: '1s',
				animationIn: 'zoom-out',
				animationOut: 'zoom-out'
			}
		}
	}
}

class eTimeline {
	constructor(parameters) {
		const initialSettings = this.deepObjectMerge(eTimelineInitialSettings, parameters);
		this.options = initialSettings.options;
		this.timeline = initialSettings.timeline;
		this.uiElements = {};
		this.uiElements.target = document.getElementById(initialSettings.target);
		this.currentPeriod = 0;
		this.init();
		console.log(this);
	}

	buildTimeline() {
		this.uiElements.target.classList.add('etl-wrapper');
		this.uiElements.target.classList.add(`etl-theme-${this.options.theme}`);
		this.uiElements.target.classList.add(`etl-navigation-position-${this.options.navigationPosition}`);

		this.uiElements.navigationWrapper = document.createElement('div');
		this.uiElements.navigationWrapper.classList.add('etl-navigation-wrapper');
		this.uiElements.target.appendChild(this.uiElements.navigationWrapper);

		this.uiElements.timelineWrapper = document.createElement('div');
		this.uiElements.timelineWrapper.classList.add('etl-timeline-wrapper');
		this.uiElements.target.appendChild(this.uiElements.timelineWrapper);

		this.timeline.forEach((period) => {
			const timelineNavigationItem = document.createElement('div');
			timelineNavigationItem.classList.add('etl-navigation-item');

			const span = document.createElement('span');
			timelineNavigationItem.appendChild(span);

			this.uiElements.navigationWrapper.appendChild(timelineNavigationItem);

			const timelinePeriod = document.createElement('div');
			timelinePeriod.classList.add('etl-timeline-period');
			this.uiElements.timelineWrapper.appendChild(timelinePeriod);

			if(period.image) {
				const timelinePeriodAside = document.createElement('div');
				timelinePeriodAside.classList.add('etl-timeline-aside');
				timelinePeriod.appendChild(timelinePeriodAside);

				const timelinePeriodImage = document.createElement('img');
				timelinePeriodImage.classList.add('etl-timeline-image');
				timelinePeriodImage.src = period.image;
				timelinePeriodAside.appendChild(timelinePeriodImage);
			}

			const timelinePeriodBody = document.createElement('div');
			timelinePeriodBody.classList.add('etl-timeline-body');
			timelinePeriod.appendChild(timelinePeriodBody);

			const timelinePeriodDate = document.createElement('div');
			timelinePeriodDate.classList.add('etl-timeline-date');
			timelinePeriodDate.innerHTML = period.date;
			timelinePeriodBody.appendChild(timelinePeriodDate);

			if(period.heading) {
				const timelinePeriodHeading = document.createElement('div');
				timelinePeriodHeading.classList.add('etl-timeline-heading');
				timelinePeriodHeading.innerHTML = period.heading;
				timelinePeriodBody.appendChild(timelinePeriodHeading);
			}

			if(period.content) {
				const timelinePeriodContent = document.createElement('div');
				timelinePeriodContent.classList.add('etl-timeline-content');
				timelinePeriodContent.innerHTML = period.content;
				timelinePeriodBody.appendChild(timelinePeriodContent);
			}

			if(period.link) {
				const timelinePeriodLink = document.createElement('a');
				timelinePeriodLink.classList.add('etl-timeline-link');
				timelinePeriodLink.innerHTML = period.link.text;
				timelinePeriodLink.href = period.link.source;
				timelinePeriod.target = '_blank';
				timelinePeriodBody.appendChild(timelinePeriodLink);
			}

			if(this.options.opener.enabled) {
				const timelinePeriodOpennerWrapper = document.createElement('div');
				timelinePeriodOpennerWrapper.classList.add('etl-timeline-period-opener-wrapper');
				timelinePeriodOpennerWrapper.style.setProperty('--animation-duration', this.options.opener.date.animationDuration);
				timelinePeriod.appendChild(timelinePeriodOpennerWrapper);

				const timelinePeriodOpennerDate = document.createElement('div');
				timelinePeriodOpennerDate.classList.add('etl-timeline-period-opener-date');
				timelinePeriodOpennerWrapper.appendChild(timelinePeriodOpennerDate);

				for(var i = 0; i < period.date.length; i++) {
					const dateChar = document.createElement('span');
					dateChar.classList.add('etl-timeline-period-opener-date-char');
					dateChar.innerHTML = period.date[i];
					dateChar.style.setProperty('--char-animation-delay', `${i * 25}ms`);
					dateChar.style.setProperty('--char-random-value', this.getRandomInteger(1, 10));
					timelinePeriodOpennerDate.appendChild(dateChar);
				}
			}
		});

		this.uiElements.navigationItems = this.uiElements.navigationWrapper.querySelectorAll('.etl-navigation-item');
		this.uiElements.timelinePeriods = this.uiElements.timelineWrapper.querySelectorAll('.etl-timeline-period');
	}


	addEventListeners() {
		this.uiElements.navigationItems.forEach((item, index) => {
			item.addEventListener('click', this.goToPeriod.bind(this, index))
		});
	}

	goToPeriod(period) {
		this.uiElements.navigationItems.forEach((item, index) => {
			if(period === index) {
				item.classList.add('current');
			} else {
				item.classList.remove('current');
			}
		});

		this.uiElements.timelinePeriods.forEach((item, index) => {
			if(index === period) {
				this.removeAllClassesExcept(item, ['etl-timeline-period', 'current', `etl-opener-animation-in-${this.options.opener.date.animationIn}`]);
			} else {
				this.removeAllClassesExcept(item, ['etl-timeline-period']);
			}
		});

		this.currentPeriod = period;
	}

	init() {
		this.buildTimeline();
		this.addEventListeners();
		this.goToPeriod(0);
	}

	/* UTILS */

	deepObjectMerge(sourceObject, targetObject) {
		return Object.entries(sourceObject).reduce((mergedObject, [key, sourceValue]) => {
			if (!(key in targetObject)) {
				mergedObject[key] = sourceValue;
			} else if (typeof sourceValue === "object" && sourceValue !== null) {
				mergedObject[key] = this.deepObjectMerge(sourceValue, targetObject[key]);
			} else {
				mergedObject[key] = targetObject[key];
			}
	
			return mergedObject;
		}, {})
	}

	removeAllClassesExcept(element, classesToKeep = []) {
		element.className = '';
		classesToKeep.forEach(cls => element.classList.add(cls));
	}

	getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}


const DATA = [
	{
		date: '7 january 2025',
		heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		content: 'Nam eros metus, molestie id ullamcorper et, auctor sed nunc. Proin semper non velit sit amet venenatis. Mauris egestas purus at erat imperdiet ullamcorper. In tincidunt hendrerit commodo. Nulla facilisi. Vestibulum convallis venenatis ex, non venenatis sem pulvinar ut. Quisque posuere aliquam enim ac eleifend. Cras efficitur tincidunt venenatis. Ut a malesuada odio. Nunc vel mi quis sapien auctor pretium eu ut mi. Fusce eget nisi congue, ultrices elit sed, semper libero. Integer dapibus orci in mauris tempor, non iaculis nulla fermentum. Nulla venenatis aliquam orci eget dapibus.',
		link: {
			text: 'Read more',
			source: '#'
		}
	},
	{
		date: '7 january 2025',
		heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		content: 'Nam eros metus, molestie id ullamcorper et, auctor sed nunc. Proin semper non velit sit amet venenatis. Mauris egestas purus at erat imperdiet ullamcorper. In tincidunt hendrerit commodo. Nulla facilisi. Vestibulum convallis venenatis ex, non venenatis sem pulvinar ut. Quisque posuere aliquam enim ac eleifend. Cras efficitur tincidunt venenatis. Ut a malesuada odio. Nunc vel mi quis sapien auctor pretium eu ut mi. Fusce eget nisi congue, ultrices elit sed, semper libero. Integer dapibus orci in mauris tempor, non iaculis nulla fermentum. Nulla venenatis aliquam orci eget dapibus.',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/1280px-Wolfgang-amadeus-mozart_1.jpg',
		link: {
			text: 'Read more',
			source: '#'
		}
	},
	{
		date: '7 january 2025',
		heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		content: 'Nam eros metus, molestie id ullamcorper et, auctor sed nunc. Proin semper non velit sit amet venenatis. Mauris egestas purus at erat imperdiet ullamcorper. In tincidunt hendrerit commodo. Nulla facilisi. Vestibulum convallis venenatis ex, non venenatis sem pulvinar ut. Quisque posuere aliquam enim ac eleifend. Cras efficitur tincidunt venenatis. Ut a malesuada odio. Nunc vel mi quis sapien auctor pretium eu ut mi. Fusce eget nisi congue, ultrices elit sed, semper libero. Integer dapibus orci in mauris tempor, non iaculis nulla fermentum. Nulla venenatis aliquam orci eget dapibus.',
	}
];

new eTimeline({
	target: 'test',
	timeline: DATA,
	options: {
		theme: 'dark',
		navigationPosition: 'bottom',
		opener: {
			enabled: true,
			date: {
				animationDuration: '1s',
				animationIn: 'zoom-out-letter-rotate',
				animationOut: 'zoom-out'
			}
		}
	}
});



const col = document.querySelectorAll('.col');

col.forEach((item, index) => {
	const timelinePeriodOpennerWrapper = document.createElement('div');
	timelinePeriodOpennerWrapper.classList.add('etl-timeline-period-opener-wrapper');
	timelinePeriodOpennerWrapper.style.setProperty('--animation-duration', '1s');
	item.appendChild(timelinePeriodOpennerWrapper);

	const timelinePeriodOpennerDate = document.createElement('div');
	timelinePeriodOpennerDate.classList.add('etl-timeline-period-opener-date');
	timelinePeriodOpennerWrapper.appendChild(timelinePeriodOpennerDate);

	for(var i = 0; i < DATA[0].date.length; i++) {
		const dateChar = document.createElement('span');
		dateChar.classList.add('etl-timeline-period-opener-date-char');
		dateChar.innerHTML = DATA[0].date[i];
		dateChar.style.setProperty('--char-index', i);
		dateChar.style.setProperty('--char-random-value', getRandomInteger(1, 10));
		timelinePeriodOpennerDate.appendChild(dateChar);
	}
});

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}