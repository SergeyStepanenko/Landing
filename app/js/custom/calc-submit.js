const emailIcon = document.getElementById('success-email-calc');
const phoneIcon = document.getElementById('success-phone-calc');
const phoneErrorText = document.getElementById('error-phone-calc');
const emailErrorText = document.getElementById('error-email-calc');
const phoneInput = document.getElementById('phone-calc');
const emailInput = document.getElementById('email-calc');
const priceBlock = document.getElementById('price');
let checkBox = false;

(function() {
	document.getElementById("checkbox67").checked = false;

	$('#phone-calc').on('change keyup paste input', phoneCheck);

	$(function(){
	  $("#phone-calc").mask("+7 (999) 999-99-99");
	});

	function phoneCheck(event) {
		const phone = document.getElementById('phone-calc').value;

		if (phone.search(/[a-zа-яА-ЯёЁ]/g) === -1 && phone.charAt(phone.length - 1) !== '_' && phone !== '') {
			phoneIcon.classList.add('shown');
			phoneErrorText.classList.remove('error-visible');
		} else {
			phoneIcon.classList.remove('shown');
		}
	}

	$('#email-calc').on('change keydown paste input', emailCheck);

	function emailCheck() {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
			emailIcon.classList.add('shown');
			emailErrorText.classList.remove('error-visible');
		} else {
			emailIcon.classList.remove('shown');
		}
	}
})();

(function() {
	const submitBtn = document.getElementById('calculate-submit');
	submitBtn.addEventListener('click', calculateAndSubmit);
	sliderValue = 3;

	function calculateAndSubmit() {
		const step = 2000;
		const startValue = 14500;
		let value;

		if (sliderValue <= 3) {
			value = startValue;
		}

		if (sliderValue > 3 && sliderValue < 11) {
			value = startValue + (step * (sliderValue - 3));
		}

		if (sliderValue > 10) {
			value = 'Индивидуальный расчет';
			priceBlock.innerHTML = value;
		} else {
			if (document.getElementById("checkbox67").checked === true) {
				checkBox = true;
				value += 3000;
			}
			priceBlock.innerHTML = value + ' РУБ.';
		}

		if (!showError()) {
			sendData();
		};
	}

	function showError() {
		if (phoneIcon.classList[phoneIcon.classList.length - 1] !== 'shown') {
			phoneErrorText.classList.add('error-visible');

			return true;
		}

		if (emailIcon.classList[emailIcon.classList.length - 1] !== 'shown') {
			emailErrorText.classList.add('error-visible');

			return true;
		}

		return false;
	}

	function sendData() {
		const http = new XMLHttpRequest();
		const url = 'mail/index-calc.php';

		(checkBox === true) ? checkBox = 'Да': checkBox = 'Нет';

		const params = 'email=' + emailInput.value + '&phone=' + phoneInput.value + '&screens=' + sliderValue + '&adaptive=' + checkBox + '&price=' + priceBlock.innerHTML;
		http.open('POST', url, true);

		// Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState === 4 && http.status === 200) {
				console.log('data sent');
			}
		}
		http.send(params);
	}
})();
