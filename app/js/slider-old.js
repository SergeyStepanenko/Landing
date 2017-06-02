(function() {
  var image = document.querySelectorAll('.image'),
      slider = document.querySelector('.slider'
      left = document.querySelector('#left'),
      right = document.querySelector('#right'),
      slider__window = document.querySelector('.slider__window'),
      firstChild = document.querySelector('slider :first-child'),
      lastChild = document.querySelector('slider :last-child');

  slider.style.width = image.length * 100 + "%"; //задали ширину конейнера по кол-ву картинок с классом .image

  for (var i = 0; i < image.length; i++) {
    document.querySelectorAll('.image')[i].style.width = 100 / image.length + "%";
  }; //задали ширину картинкам в контейнере по формуле (100% делить на кол-во картинок)

  slider.style.transform = "translate3d(" + -(100 / image.length) + "%" + ", 0, 0)";
  slider__window.prepend(lastChild); //переместили последнюю картинку перед первой на случай переключения слайдера назад

  var imgWidth = +document.querySelectorAll('.image')[0].style.width.replace(/%/, ""), //получили ширину одной картинки в % и убрали %
      shift = -imgWidth, //присвоили shift значение ширины одной картинки
      imagesShift = 0; //инициализировали переменную и задали ей значение для дальнейшего сдвига всех блоков картинок

  left.onclick = function() {
    shift += imgWidth; // обновляем положение сдвига окна блока slider
    slider.style.transform = "translate3d(" + shift + "%, 0, 0)"; // передвигаем окно слайдера на нужную картинку

    function replace() {
      lastChild = document.querySelector('.slider__window :last-child'); //берем последнюю картинку
      slider__window.prepend(lastChild); //ставим последнюю картинку в начало, чтобы слайдер был бесконечным

      imagesShift -= 100; //обновляем позицию всех блоков картинок
      for (var i = 0; i < image.length; i++) {
        image[i].style.transform = "translate3d(" + imagesShift + "%, 0, 0)"; //передвигаем все картинки
      };
    };

    setTimeout(replace, 400); //запускаем отложенную функцию переставления картинки и сдвига всех картинок
  };

  right.onclick = function() {
    shift -= imgWidth; // обновляем положение сдвига окна блока slider
    slider.style.transform = "translate3d(" + shift + "%, 0, 0)"; // передвигаем окно слайдера на нужную картинку

    function replace() {
      firstChild = document.querySelector('.slider__window :first-child'); //берем первую картинку
      slider__window.append(firstChild); //ставим первую картинку в конец, чтобы слайдер был бесконечным

      imagesShift += 100; //обновляем позицию всех блоков картинок
      for (var i = 0; i < image.length; i++) {
        image[i].style.transform = "translate3d(" + imagesShift + "%, 0, 0)"; //передвигаем все картинки
      };
    };

    setTimeout(replace, 400); //запускаем отложенную функцию переставления картинки и сдвига всех картинок
  };
})();
