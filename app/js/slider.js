(function() {
	const slider = document.getElementById('slider')
	const leftArrow = document.getElementById('left-test')
	const rightArrow = document.getElementById('right-test')
	const items = document.querySelectorAll('.screen-7__wrapper__slider__item')
	let slidesShift
	const itemWidth = 570
	let firstChild
	let lastChild = document.querySelector('.screen-7__wrapper__slider__inner :last-child')
	let travel

	rightArrow.addEventListener('click', moveToRight)


	function moveToRight() {
		rightArrow.removeEventListener('click', moveToRight)
		slidesShift = Number(getComputedStyle(items[0]).getPropertyValue('left').replace('px', ''))
		travel = slidesShift - itemWidth

		for (var j = 0; j < items.length; j++) {
			items[j].classList.add('animationON')
			items[j].style.left = travel + 'px'
		}
		
		setTimeout(function replaceLastSlideWithFirst() {
			for (var i = 0; i < items.length; i++) {
				items[i].classList.remove('animationON')
			}

			firstChild = document.querySelector('.screen-7__wrapper__slider__inner :first-child')
			slider.append(firstChild)

			travel += itemWidth

			for (var y = 0; y < items.length; y++) {
				items[y].style.left = travel + 'px'
			}

			rightArrow.addEventListener('click', moveToRight)
		}, 500)
	}







		// // console.log(slidesShift)
		// console.log(travel)

})()
