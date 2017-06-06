"use strict";

(function popUp() {
	const div = document.createElement('div');
	const body = document.querySelector("body");
	const overlayPopUp = document.createElement('div');
	const callBtn_1 = document.querySelector('.callBeBackBtn');
	const callBtn_2 = document.querySelector('.callBeBackBtn-2');
	let popUpCover;
	let closeButton;
	let overlay;
	let closeButton2;

	overlayPopUp.className = "overlayPopUp";
	div.className = "popUpWrapper";
	div.innerHTML = "\
			<div class = 'popUpContainer'>\
					<a class = 'closeButton'><img src='img/x.png' alt='' width='13' height='13'></a>\
						<div class = 'popUpContainerInner'>\
							<div class = 'popUpText'>Оставьте ваш email и номер телефона, мы перезвоним, чтобы обсудить ваш лендинг</div>\
							<div class = 'form'>\
								<div >\
	              				<input class='inputName' id='email' name='email' placeholder='Введите ваш email' value=''>\
					  			<img class='success-icon' id='success-email' src='../img/success.png' alt=''>\
								<p class='error' id='error-email'>Пожалуйста введите верный email</p>\
									<input class='inputPhoneNumber' id='phone' placeholder='+7 (___) ___-__-__' name='phone' value=''>\
								<img class='success-icon' id='success-phone' src='../img/success.png' alt=''>\
								<p class='error' id='error-phone'>Пожалуйста заполните это поле</p>\
									<input class='submitData' onsubmit='return true;' type='submit' value='ЗАКАЗАТЬ             '><img class='submit-arrow' src='../img/noun_711844_cc.png' alt=''>\
								</div>\
			        </div>\
			      </div>\
			    </div>";

  callBtn_1.addEventListener('click', appendChild, false);
  callBtn_2.addEventListener('click', appendChild, false);

	function appendChild() {
	    body.appendChild(overlayPopUp);
	    body.appendChild(div);
	    body.style.overflow = "hidden";
	    closeButton = document.querySelector('.closeButton');
	    closeButton.addEventListener('click', closePopUp, false);

	    overlay = document.querySelector('.overlayPopUp');
	    setTimeout(function addEventListener() {
	      overlay.addEventListener('click', closePopUp, false);
	    }, 1);

	    var emailInput = document.querySelector('.inputName');
	    $('#email').on('change keydown paste input', emailCheck);

	    var emailIcon = document.getElementById('success-email');

	    function emailCheck() {
	      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
	        emailIcon.classList.add('visible');
			emailErrorText.classList.remove('error-visible');
	      } else {
	        emailIcon.classList.remove('visible');
	      }
	    }

	    $('#phone').on('change keyup paste input', phoneCheck);
	    const phoneInput = document.querySelector('.inputName');
	    const phoneIcon = document.getElementById('success-phone');
	    const phoneErrorText = document.getElementById('error-phone');
	    const emailErrorText = document.getElementById('error-email');

		$(function(){
		  $("#phone").mask("+7 (999) 999-99-99");
		});

	    function phoneCheck(event) {
	      var phone = document.getElementById('phone').value;

	      if (phone.search(/[a-zа-яА-ЯёЁ]/g) === -1 && phone.charAt(phone.length - 1) !== '_') {
	        phoneIcon.classList.add('visible');
			phoneErrorText.classList.remove('error-visible');
	      } else {
	        phoneIcon.classList.remove('visible');
	      }
	    }

	    document.querySelector('.submitData').addEventListener('click', handleSubmit);

		function handleSubmit() {
			if (emailIcon.classList[emailIcon.classList.length - 1] !== 'visible') {
				emailErrorText.classList.add('error-visible');

				return false;
			}

			if (phoneIcon.classList[phoneIcon.classList.length - 1] !== 'visible') {
				phoneErrorText.classList.add('error-visible');

				return false;
			}

			sendData()
		}


		function sendData() {
			const http = new XMLHttpRequest();
			const url = 'mail/index.php';
			const params = 'email=' + email.value + '&phone=' + phone.value;
			http.open('POST', url, true);

			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
				if(http.readyState === 4 && http.status === 200) {
					popUpCover = document.createElement('div');
					popUpCover.className = "popUpWrapper";
					popUpCover.innerHTML = "\
						<div class = 'popUpContainer'>\
							<a class = 'closeButton2'><img src='img/x.png' alt='' width='13' height='13'></a>\
							  <div class = 'popUpContainerInner'>\
								<div class = 'callMePopUpCover'>Ваша заявка принята</div>\
								<div class = 'popUpText'>Уже набираем ваш номер!</div>\
								</div>\
							  </div>\
							</div>";

					body.appendChild(popUpCover);
					closeButton2 = document.querySelector('.closeButton2');
					setTimeout(function addEventListener () {closeButton2.addEventListener('click', closePopUp, false)}, 1);
					callBtn_1.removeEventListener('click', appendChild, false);
					callBtn_2.removeEventListener('click', appendChild, false);
					callBtn_1.classList.add('disabled');
					callBtn_2.classList.add('disabled');
				}
			}
			http.send(params);
		}
	}

	function closePopUp() {
	div != undefined ? body.removeChild(div) : "";
	popUpCover != undefined ? body.removeChild(popUpCover) : "";
	overlayPopUp != undefined ? body.removeChild(overlayPopUp) : "";

	closeButton.removeEventListener('click', closePopUp, false);
	overlay.removeEventListener('click', closePopUp, false);

	body.style.overflow = "auto";
	};
})();
