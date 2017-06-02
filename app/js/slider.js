(function() {
	const leftArrow = document.getElementById('left')
	const rightArrow = document.getElementById('right')
	const items = document.querySelectorAll('.screen-7__wrapper__slider__item')
	let slidesShift = Number(getComputedStyle(items[0]).getPropertyValue('left').replace('px', ''))
	const itemWidth = 570;

	rightArrow.addEventListener('click', moveToRight)


	function moveToRight() {
		const travel = slidesShift + -itemWidth
		for (var i = 0; i < items.length; i++) {
			items[i].style.left = travel + 'px'
		}
		slidesShift = travel
	}

})()
