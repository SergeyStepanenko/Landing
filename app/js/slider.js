'use strict';

(function () {
	var slider = document.getElementById('slider');
	var leftArrow = document.getElementById('left');
	var rightArrow = document.getElementById('right');
	var items = document.querySelectorAll('.screen-7__wrapper__slider__item');
	var itemWidth = 570;
	var slidesShift = void 0;
	var firstChild = void 0;
	var lastChild = void 0;
	var travel = void 0;

	rightArrow.addEventListener('click', moveBlocks);
	leftArrow.addEventListener('click', moveBlocks);

	function moveBlocks(event) {
		var button = event.srcElement.id;
		leftArrow.removeEventListener('click', moveBlocks);
		rightArrow.removeEventListener('click', moveBlocks);
		slidesShift = Number(getComputedStyle(items[0]).getPropertyValue('left').replace('px', ''));

		if (button === 'right') {
			travel = slidesShift - itemWidth;
		} else {
			travel = slidesShift + itemWidth;
		}

		for (var i = 0; i < items.length; i++) {
			items[i].classList.add('animationON');
			items[i].style.left = travel + 'px';
		}

		setTimeout(function replaceLastSlideWithFirst() {
			for (var _i = 0; _i < items.length; _i++) {
				items[_i].classList.remove('animationON');
			}

			firstChild = slider.firstElementChild;
			lastChild = slider.lastElementChild;

			if (button === 'right') {
				slider.appendChild(firstChild);
			} else {
				slider.insertBefore(lastChild, slider.childNodes[0]);
			}
			travel = -itemWidth;

			for (var _i2 = 0; _i2 < items.length; _i2++) {
				items[_i2].style.left = travel + 'px';
			}

			leftArrow.addEventListener('click', moveBlocks);
			rightArrow.addEventListener('click', moveBlocks);
		}, 501);
	}
})();