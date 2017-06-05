"use strict";

;"use strict";
(function popUp() {
  var div = document.createElement('div'),
      body = document.querySelector("body"),
      overlayPopUp = document.createElement('div'),
      popUpCover,
      closeButton,
      overlay,
      closeButton2;

  overlayPopUp.className = "overlayPopUp";

  div.className = "popUpWrapper";
  div.innerHTML = "\
  		<div class = 'popUpContainer'>\
  				<a class = 'closeButton'><img src='img/x.png' alt='' width='13' height='13'></a>\
  					<div class = 'popUpContainerInner'>\
  						<div class = 'popUpText'>Оставьте ваш email и номер телефона, мы перезвоним, чтобы обсудить ваш лендинг</div>\
  						<div class = 'form'>\
  							<form action='mail/index.php' id='myForm' method='post'>\
                  				<input class='inputName' id='email' name='email' placeholder='Введите ваш email' value=''>\
					  			<img class='success-icon' id='success-email' src='../img/success.png' alt=''>\
								<p class='error' id='error-email'>Пожалуйста введите верный email</p>\
  								<input class='inputPhoneNumber' id='phone' placeholder='+7 (___) ___-__-__' name='phone' value=''>\
								<img class='success-icon' id='success-phone' src='../img/success.png' alt=''>\
								<p class='error' id='error-phone'>Пожалуйста введите только цифры</p>\
  								<input class='submitData' onsubmit='' type='submit' value='ЗАКАЗАТЬ             '><img class='submit-arrow' src='../img/noun_711844_cc.png' alt=''>\
  							</form>\
  		        </div>\
  		      </div>\
  		    </div>";

  document.querySelector('.callBeBackBtn').addEventListener('click', appendChild, false);
  document.querySelector('.callBeBackBtn-2').addEventListener('click', appendChild, false);

  function appendChild() {
    body.appendChild(overlayPopUp);
    body.appendChild(div);
    body.style.overflow = "hidden";

    function append() {
      //   body.appendChild(div);
      $("#myForm").submit(function () {
        // var error = "";
        // error += $(this).yaproField("phone", "p", "телефон введен неправильно");
        var data = $("#myForm").serialize();

        $.ajax({
          type: "POST",
          url: 'mail/index.php',
          data: data,
          success: function success() {
            // показать окно об успешной отправке и закрыть после
            body.appendChild(popUpCover);
            closeButton2 = document.querySelector('.closeButton2');
            setTimeout(function addEventListener() {
              closeButton2.addEventListener('click', closePopUp, false);
            }, 1);
          }
        });

        return false;
      });

      //   fieldPhone("[name=phone]"); //форматирование номера
    };

    setTimeout(append, 1);

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
		// emailErrorText.classList.remove('error-visible');
        // return true;
      } else {
        emailIcon.classList.remove('visible');
		// emailErrorText.classList.add('error-visible');
        // return false;
      }
    }

    $('#phone').on('change keyup paste input', phoneCheck);
    var phoneInput = document.querySelector('.inputName');
    var phoneIcon = document.getElementById('success-phone');
    var phoneErrorText = document.getElementById('error-phone');
    var emailErrorText = document.getElementById('error-email');

	$(function(){
	  $("#phone").mask("+7 (999) 999-99-99");
	});

    function phoneCheck(event) {
      var phone = document.getElementById('phone').value;
	  console.log(event.target.value);
	  //
	//   if (event.target.value.length < 1) {
	// 	  document.getElementById('phone').value = '+7' + event.target.value;
	//   }

	//   document.getElementById('phone').value = '+7' + event.target.value;

      if (phone.search(/[a-zа-яА-ЯёЁ]/g) === -1 && phone.charAt(phone.length - 1) !== '_') {
        phoneIcon.classList.add('visible');
        // phoneErrorText.classList.remove('error-visible');
		// console.log(phone.charAt(phone.length - 1) !== '_');
        // return true;
      } else {
        phoneIcon.classList.remove('visible');
        // phoneErrorText.classList.add('error-visible');

        // return false;
      }
    }

    document.querySelector('.submitData').onclick = function () {

      var customerName = document.querySelector('.inputName').value;
      var customerPhone = document.querySelector('.inputPhoneNumber').value;

      //   if (customerPhone.length > 9 && customerPhone != '+7 (___) ___-__-__') {
      //     var writeUserData = function writeUserData(name, phone) {
      //       firebase.database().ref('callers/' + now).set({
      //         username: name,
      //         phone: phone
      //       });
      //     };

      // customerPhone = "+" + customerPhone.replace(/\D+/g, '');
      // customerName == "Введите ваше имя" ? customerName = "" : customerName;

      // var now = new Date();
      //
      // writeUserData(customerName, customerPhone); //отправляем данные в базу firebase

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
    };
  };

  function closePopUp() {
    div != undefined ? body.removeChild(div) : "";
    popUpCover != undefined ? body.removeChild(popUpCover) : "";
    overlayPopUp != undefined ? body.removeChild(overlayPopUp) : "";

    closeButton.removeEventListener('click', closePopUp, false);
    overlay.removeEventListener('click', closePopUp, false);

    body.style.overflow = "auto";
  };

  // function resetStyleName() {
  //   if (document.querySelector('.inputName').value == 'Введите ваше имя') {
  //     document.querySelector('.inputName').value = "";
  //   };
  //
  //   document.querySelector('.inputName').style.color = "black";
  // };
  // function resetStylePhone() {
  //   console.log("focus");
  //   if (document.querySelector('.inputPhoneNumber').value == '+7 (___) ___-__-__') {
  //     document.querySelector('.inputPhoneNumber').value = "";
  //     document.querySelector('.inputPhoneNumber').style.color = "black";
  //   };
  // };
})();
