(function() {
	const slider = document.getElementById('slider')
	const leftArrow = document.getElementById('left-test')
	const rightArrow = document.getElementById('right-test')
	const items = document.querySelectorAll('.screen-7__wrapper__slider__item')
	let slidesShift
	const itemWidth = 570
	let firstChild
	let lastChild
	let travel

	rightArrow.addEventListener('click', moveToRight)


	function moveToRight() {
		rightArrow.removeEventListener('click', moveToRight)
		slidesShift = Number(getComputedStyle(items[0]).getPropertyValue('left').replace('px', ''))
		travel = slidesShift - itemWidth

		for (let i = 0; i < items.length; i++) {
			items[i].classList.add('animationON')
			items[i].style.left = travel + 'px'
		}

		setTimeout(function replaceLastSlideWithFirst() {
			for (let i = 0; i < items.length; i++) {
				items[i].classList.remove('animationON')
			}

			firstChild = slider.firstElementChild
			slider.appendChild(firstChild)

			travel += itemWidth

			for (let i = 0; i < items.length; i++) {
				items[i].style.left = travel + 'px'
			}

			lastChild = slider.lastElementChild
			rightArrow.addEventListener('click', moveToRight)
		}, 500)
	}







})()
