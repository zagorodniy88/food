"use strict";

// ********Табы*********

// 1) Получаем все необходимые элементы для работы с ними.
const tabs = document.querySelectorAll('.tabheader__item'),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabsParent = document.querySelector('.tabheader__items');

//  2) Фунцкия переберает каждый таб и соответствующий ему (табу) контент и удаляет активный класс у таба, 
// блоку с контентом устанавливает дисплей блок.

function hideTabContent() {
	tabsContent.forEach(item => {
		item.style.display = 'none';
	});

	tabs.forEach(item => {
		item.classList.remove('tabheader__item_active');
	});
}

// 3) Функция противоположная предыдущей. Параметр i по умолчанию 0 (Показывает первый таб).
// Табы переключаются в зависимости какой аргумент мы передаем в параметр (На какой таб будет клик и передается его 
// index).

function showTabContent(i = 0) {
	tabsContent[i].style.display = 'block';
	tabs[i].classList.add('tabheader__item_active');
}
// 4) Запуск обеих функций.
hideTabContent();
showTabContent();

// 5) Делегирование события. Вешаем обработчик событий на на родительский блок табов.
// Через объект event получаем где был клик (и был ли вообще на нем а не мимо), и узнаем содержит 
// ли этот элемент нужный класс. Если условие выполняется сравниваем объект event с табом и вызываем функции.
// Аргументом для функции showTabContent является индекс таба на котором был клик.

tabsParent.addEventListener('click', (event) => {
	const target = event.target;
	if (target && target.classList.contains('tabheader__item')) {
		tabs.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabContent(i);
			}
		});
	}
});


// ***** Таймер ******

const deadLine = '2021-12-11';

function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date()),
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
		hours = Math.floor((t / (1000 * 60 * 60) % 24)),
		minutes = Math.floor((t / 1000 / 60) % 60),
		seconds = Math.floor((t / 1000) % 60);

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
	};
}

function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0 ${num}`;
	} else {
		return num;
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector),
		days = timer.querySelector('#days'),
		hours = timer.querySelector('#hours'),
		minutes = timer.querySelector('#minutes'),
		seconds = timer.querySelector('#seconds'),
		timeInterval = setInterval(updateClock, 1000);

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endtime);

		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if (t.total <= 0) {
			clearInterval(timeInterval);
		}
	}
}

setClock('.timer', deadLine);


// ***** Модальное окно ******

const modalTrigger = document.querySelectorAll('[data-modal]'),
	modal = document.querySelector('.modal'),
	modalCloseBtn = document.querySelector('[data-close]');

function openModal() {
	modal.classList.add('show');
	modal.classList.remove('hide');
	// modal.classList.toggle('show');
	// Чтобы страница не прокручивалась когда модальное окно открыто 
	document.body.style.overflow = 'hidden';
	clearTimeout(modalTimerid);
}

modalTrigger.forEach(btn => {
	btn.addEventListener('click', openModal);
});


function closeModal() {
	modal.classList.remove('show');
	modal.classList.add('hide');
	// modal.classList.toggle('show');
	document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

document.addEventListener('keydown', (e) => {
	if (e.code === 'Escape' && modal.classList.contains('show')) {
		closeModal();
	}
});

// let modalTimerid = setTimeout(openModal, 3000);

function showModalByScroll() {
	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		openModal();
		window.removeEventListener('scroll', showModalByScroll);
	}
}

window.addEventListener('scroll', showModalByScroll);

// ****** Динамическое добавление карточек при помощи классов ******

class MenuCards {
	constructor(src, alt, title, descr, price, parentSelector, ...classes) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.classes = classes;
		this.parent = document.querySelector(parentSelector);
		this.transfer = 27;
		this.changeToUAH();

	}

	changeToUAH() {
		this.price = this.price * this.transfer;
	}

	render() {
		const element = document.createElement('div');

		if (this.classes.length === 0) {
			this.element = 'menu__item';
			element.classList.add(this.element);
		} else {
			this.classes.forEach(className => element.classList.add(className));

		}
		element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
		`;
		this.parent.append(element);
	}


}

new MenuCards(
	"img/tabs/vegy.jpg",
	"vegy",
	'Меню "Фитнес"',
	`Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
	овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
	ценой и высоким качеством!`,
	9,
	'.menu .container',

).render();


new MenuCards(
	"img/tabs/vegy.jpg",
	"vegy",
	'Меню "Фитнес"',
	`Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
	овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
	ценой и высоким качеством!`,
	9,
	'.menu .container',

).render();

new MenuCards(
	"img/tabs/vegy.jpg",
	"vegy",
	'Меню "Фитнес"',
	`Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
	овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
	ценой и высоким качеством!`,
	9,
	'.menu .container',

).render();


// ***** Forms ******

const forms = document.querySelectorAll('form');

const message = {
	loading: 'Загрузка...',
	success: 'Спасибо! Скоро мы с вами свяжемся',
	failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
	postData(item);
})

function postData(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		statusMessage.textContent = message.loading;
		form.append(statusMessage);

		const request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		request.setRequestHeader('Content-type', 'application/json');

		const formData = new FormData(form);

		const object = {};
		formData.forEach(function (value, key) {
			object[key] = value;
		});

		const json = JSON.stringify(object);

		request.send(json);
		request.addEventListener('load', () => {
			if (request.status === 200) {
				console.log(request.response);
				statusMessage.textContent = message.success;
				form.reset();
				setTimeout(() => {
					statusMessage.remove();
				}, 2000);
			} else {
				statusMessage.textContent = message.failure;

			}
		});
	});
}
function culc() {
	// ***** calculating *****

	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 'female';
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}


	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	initLocalSettings('#gender div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInfo(parentSelector, activeClass) {
		const elements = document.querySelectorAll(parentSelector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				console.log(ratio, sex);

				elements.forEach(element => {
					element.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);

				calcTotal();
			});

		});


	}

	getStaticInfo('#gender div', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});

	}

	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');
}