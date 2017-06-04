(function() {
	const slider = document.getElementById('slider')
	const leftArrow = document.getElementById('left')
	const rightArrow = document.getElementById('right')
	const items = document.querySelectorAll('.screen-7__wrapper__slider__item')
	const itemWidth = 570
	let slidesShift
	let firstChild
	let lastChild
	let travel

	rightArrow.addEventListener('click', moveBlocks)
	leftArrow.addEventListener('click', moveBlocks)

	function moveBlocks(event) {
		const button = event.srcElement.id
		leftArrow.removeEventListener('click', moveBlocks)
		rightArrow.removeEventListener('click', moveBlocks)
		slidesShift = Number(getComputedStyle(items[0]).getPropertyValue('left').replace('px', ''))

		if (button === 'right') {
			travel = slidesShift - itemWidth
		} else {
			travel = slidesShift + itemWidth
		}

		for (let i = 0; i < items.length; i++) {
			items[i].classList.add('animationON')
			items[i].style.left = travel + 'px'
		}

		setTimeout(function replaceLastSlideWithFirst() {
			for (let i = 0; i < items.length; i++) {
				items[i].classList.remove('animationON')
			}

			firstChild = slider.firstElementChild
			lastChild = slider.lastElementChild

			if (button === 'right') {
				slider.appendChild(firstChild)
			} else {
				slider.insertBefore(lastChild, slider.childNodes[0])
			}
			travel = -itemWidth

			for (let i = 0; i < items.length; i++) {
				items[i].style.left = travel + 'px'
			}

			leftArrow.addEventListener('click', moveBlocks)
			rightArrow.addEventListener('click', moveBlocks)
		}, 501)
	}
})()
