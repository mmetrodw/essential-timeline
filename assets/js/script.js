const eTimelineInitialSettings = {
	target: null,
	timeline: null,
	options: {
		theme: 'dark',
		navigationPosition: 'bottom',
		opener: {
			enabled: true,
			date: {
				animationIn: 'zoom-out',
				animationInDuration: '1s',
				animationOut: 'zoom-out',
				animationOutDuration: 'zoom-out',
			}
		}
	}
}

function delayTime(char) {
	return char.length >= 4 ? 25 : 100;
};

function createShuffledArray(n) {
	let array = Array.from({ length: n + 1 }, (_, i) => i);

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	
	return array;
}

const zoomOutSlide = (date, char) => {
	date.style.overflow = 'hidden';
	return {
		targets: char,
		easing: 'cubicBezier(.5, 0, 0, 1)',
		begin: (anim) => {
			if(anim.began) {
				anime({
					targets: date,
					translateZ: [500, 0],
					easing: 'cubicBezier(1, 0, .5, 1)',
				});
			}
		},
		changeComplete: (anim) => date.style.overflow = 'visible'
	}
};

const animationPresetsIn = {
	zoomOut: (date, char) => {
		return {
			targets: date,
			translateZ: [1000, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(.5, 0, 0, 1)'
		}
	},
	zoomOutStep: (date, char) => {
		return {
			targets: char,
			translateZ: [1000, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char))
		}
	},
	zoomOutRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			targets: char,
			translateZ: [() => anime.random(500, 1000), 0],
			opacity: [0, 1],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		}
	},
	zoomOutSlideUp: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['100%', '0%']
		};
	},
	zoomOutSlideUpStep: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['100%', '0%'],
			delay: anime.stagger(delayTime(char)),
		}
	},
	zoomOutSlideUpStepCenter: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['100%', '0%'],
			delay: anime.stagger(delayTime(char), {from: 'center'}),
		}
	},
	zoomOutSlideUpRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			...zoomOutSlide(date, char),
			translateY: ['100%', '0%'],
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		}
	},
	zoomOutSlideDown: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['-100%', '0%']
		};
	},
	zoomOutSlideDownStep: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['-100%', '0%'],
			delay: anime.stagger(delayTime(char)),
		}
	},
	zoomOutSlideDownStepCenter: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			translateY: ['-100%', '0%'],
			delay: anime.stagger(delayTime(char), {from: 'center'}),
		}
	},
	zoomOutSlideDownRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			...zoomOutSlide(date, char),
			translateY: ['-100%', '0%'],
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		}
	},
	zoomOutRotate: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			rotateY: [90, 0],
			opacity: [0, 1]
		};
	},
	zoomOutRotateStep: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			rotateY: [90, 0],
			opacity: [0, 1],
			delay: anime.stagger(delayTime(char)),
		};
	},
	zoomOutRotateStepCenter: (date, char) => {
		return {
			...zoomOutSlide(date, char),
			rotateY: [90, 0],
			opacity: [0, 1],
			delay: anime.stagger(delayTime(char), {from: 'center'}),
		};
	},
	zoomOutRotateRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			...zoomOutSlide(date, char),
			rotateY: [90, 0],
			opacity: [0, 1],
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		};
	},
	zoomOutTracking: (date,char) => {
		return {
			targets: date,
			translateZ: [500, 0],
			letterSpacing: ['20px', '0px'],
			opacity: [0, 1],
			easing: 'cubicBezier(.5, 0, 0, 1)',
		};
	},
	zoomOutBlur: (date, char) => {
		return {
			targets: date,
			translateZ: [500, 0],
			opacity: [0, 1],
			filter: ['blur(50px)', 'blur(0px)'],
			easing: 'cubicBezier(.5, 0, 0, 1)'
		}
	},
	zoomOutBlurStep: (date, char) => {
		return {
			targets: char,
			translateZ: [500, 0],
			opacity: [0, 1],
			filter: ['blur(50px)', 'blur(0px)'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char))
		}
	},
	zoomOutBlurRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			targets: char,
			translateZ: [() => anime.random(500, 1000), 0],
			opacity: [0, 1],
			filter: ['blur(50px)', 'blur(0px)'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		}
	},
	slideUp: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideUpStep: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char)),
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideUpStepCenter: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char), {from: 'center'}),
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideUpRandom: (date, char) => {
		date.style.overflow = 'hidden';
		const shuffledArray = createShuffledArray(char.length);
		return {
			targets: char,
			translateY: ['100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			},
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideDown: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['-100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideDownStep: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['-100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char)),
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideDownStepCenter: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateY: ['-100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char), {from: 'center'}),
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideDownRandom: (date, char) => {
		date.style.overflow = 'hidden';
		const shuffledArray = createShuffledArray(char.length);
		return {
			targets: char,
			translateY: ['-100%', '0%'],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			},
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideLeft: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateX: [date.offsetWidth, 0],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideLeftStep: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateX: [date.offsetWidth, 0],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: anime.stagger(delayTime(char)),
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideRight: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateX: [-date.offsetWidth, 0],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	slideRightStep: (date, char) => {
		date.style.overflow = 'hidden';
		return {
			targets: char,
			translateX: [-date.offsetWidth, 0],
			easing: 'cubicBezier(.5, 0, 0, 1)',
			delay: (el, index, length) => {
				return length - index * delayTime(char);
			},
			changeComplete: (anim) => date.style.overflow = 'visible'
		}
	},
	rotate: (date, char) => {
		return {
			targets: char,
			rotateY: [90, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(1, 0, .5, 1)'
		}
	},
	rotateStep: (date, char) => {
		return {
			targets: char,
			rotateY: [90, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(1, 0, .5, 1)',
			delay: anime.stagger(delayTime(char))
		}
	},
	rotateStepCenter: (date, char) => {
		return {
			targets: char,
			rotateY: [90, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(1, 0, .5, 1)',
			delay: anime.stagger(delayTime(char), {from: 'center'})
		}
	},
	rotateRandom: (date, char) => {
		const shuffledArray = createShuffledArray(char.length);
		return {
			targets: char,
			rotateY: [90, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(1, 0, .5, 1)',
			delay: (el, index, length) => {
				return shuffledArray[index] * delayTime(char);
			}
		}
	},
	tracking: (date, char) => {
		return {
			targets: date,
			letterSpacing: ['25px', '0px'],
			opacity: [0, 1],
			easing: 'cubicBezier(1, 0, 0.5, 1)'
		}
	},
	zoomIn: (date, char) => {
		return {
			targets: date,
			translateZ: [-500, 0],
			opacity: [0, 1],
			easing: 'cubicBezier(0.5, 0, 0, 1)'
		}
	},
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
				timelinePeriod.appendChild(timelinePeriodOpennerWrapper);

				const timelinePeriodOpennerDate = document.createElement('div');
				timelinePeriodOpennerDate.classList.add('etl-timeline-period-opener-date');
				timelinePeriodOpennerDate.dataset.animationIn = this.options.opener.date.animationIn;
				timelinePeriodOpennerDate.dataset.animationInDuration = this.options.opener.date.animationInDuration;
				timelinePeriodOpennerDate.dataset.animationOut = this.options.opener.date.animationOut;
				timelinePeriodOpennerDate.dataset.animationOutDuration = this.options.opener.date.animationOutDuration;
				timelinePeriodOpennerWrapper.appendChild(timelinePeriodOpennerDate);

				for(var i = 0; i < period.date.length; i++) {
					const dateChar = document.createElement('div');
					dateChar.classList.add('etl-timeline-period-opener-date-char');
					dateChar.innerHTML = period.date[i];
					timelinePeriodOpennerDate.appendChild(dateChar);
				}
			}
		});

		this.uiElements.navigationItems = this.uiElements.navigationWrapper.querySelectorAll('.etl-navigation-item');
		this.uiElements.timelinePeriods = this.uiElements.timelineWrapper.querySelectorAll('.etl-timeline-period');

		if(this.options.opener.enabled) {
			this.uiElements.openers = this.uiElements.timelineWrapper.querySelectorAll('.etl-timeline-period-opener-wrapper');
		}
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
				item.classList.add('current');
			} else {
				item.classList.remove('current');
			}
		});

		this.currentPeriod = period;

		const opener = this.uiElements.openers[period];
		const openerDateWrapper = opener.querySelector('.etl-timeline-period-opener-date');
		const openerDateChars = openerDateWrapper.querySelectorAll('.etl-timeline-period-opener-date-char');

		this.animateOpener(opener, openerDateWrapper, openerDateChars)
	}

	animateOpener(opener, openerDateWrapper, openerDateChars) {
		const animationIn = this.toCamelCase(openerDateWrapper.dataset.animationIn);
		const animationInDuration = parseInt(openerDateWrapper.dataset.animationInDuration);
		const animationOut = this.toCamelCase(openerDateWrapper.dataset.animationOut);
		const animationOutDuration = parseInt(openerDateWrapper.dataset.animationOutDuration);
		

		const dateAnimation = anime({
			...animationPresetsIn[animationIn](openerDateWrapper, openerDateChars),
			duration: animationInDuration,
			complete: () => {
				console.log('complete');
			}
		})
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

	toCamelCase(string) {
		console.log(string)
		return string.replace(/-./g, match => match.charAt(1).toUpperCase());
	}
}


const DATA = [
	{
		date: '1 january 2025',
		heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		content: 'Nam eros metus, molestie id ullamcorper et, auctor sed nunc. Proin semper non velit sit amet venenatis. Mauris egestas purus at erat imperdiet ullamcorper. In tincidunt hendrerit commodo. Nulla facilisi. Vestibulum convallis venenatis ex, non venenatis sem pulvinar ut. Quisque posuere aliquam enim ac eleifend. Cras efficitur tincidunt venenatis. Ut a malesuada odio. Nunc vel mi quis sapien auctor pretium eu ut mi. Fusce eget nisi congue, ultrices elit sed, semper libero. Integer dapibus orci in mauris tempor, non iaculis nulla fermentum. Nulla venenatis aliquam orci eget dapibus.',
		link: {
			text: 'Read more',
			source: '#'
		}
	},
	{
		date: '3 january 2025',
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
				animationInDuration: 1000,
				animationIn: 'zoom-in',
				animationOut: 'slide-up',
				animationOutDuration: 1000,
			}
		}
	}
});

console.log(animationPresetsIn)