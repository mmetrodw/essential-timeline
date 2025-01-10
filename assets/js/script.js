const introDate = document.querySelector('.etl-timeline-opener-date');
const date = '9 січня 2025';
console.log(introDate);
for(var i = 0; i < date.length; i++) {
	const char = document.createElement('span');
	char.innerHTML = date[i];
	char.style.setProperty('--char-animation-delay', `${25 * i}ms`);
	introDate.appendChild(char);
}

const eTimelineInitialSettings = {
	target: null,
	timeline: null,
	options: {
		theme: 'dark',
		navigationPosition: 'bottom'
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

			if(period.heading) {
				const timelinePeriodHeading = document.createElement('div');
				timelinePeriodHeading.classList.add('etl-timeline-heading');
				timelinePeriodHeading.innerHTML = period.heading;
				timelinePeriodBody.appendChild(timelinePeriodHeading);
			}

			if(period.content) {
				const timelinePeriodContent = document.createElement('div');
				timelinePeriodContent.classList.add('etl-timeline-contenr');
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

		});
	}

	init() {
		this.buildTimeline();
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
	}
];

new eTimeline({
	target: 'test',
	timeline: DATA,
	options: {
		theme: 'dark',
		navigationPosition: 'bottom'
	}
});