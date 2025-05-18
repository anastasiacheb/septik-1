import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

let menu = document.querySelector('.js-menu');
let burger = document.querySelector('.js-burger');
let bars = document.querySelectorAll('.js-bar');

burger.addEventListener('click', () => {
  menu.classList.toggle('top-13');
  menu.classList.toggle('md:top-28');
  bars[0].classList.toggle('rotate-45');
  bars[0].classList.toggle('translate-y-2');
  bars[1].classList.toggle('opacity-0');
  bars[2].classList.toggle('-rotate-45');
  bars[2].classList.toggle('-translate-y-2');
});

let buttons = document.querySelectorAll('[data-target]');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {
    e.preventDefault();
    let id = e.currentTarget.getAttribute('data-target');
    let section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

fetch('https://docs.google.com/spreadsheets/d/1mXI88VhZULwK34edZO2fRQJYo6IUE9D2fqQLbmmG9S0/gviz/tq?tqx=out:json')
  .then((res) => res.text())
  .then((text) => {
    const json = JSON.parse(
      text.replace('/*O_o*/', '').replace('google.visualization.Query.setResponse(', '').slice(0, -2),
    );

    const rows = json.table.rows;

    const headers = rows[0].c.map((cell) => cell?.v ?? '');

    const data = rows.slice(1).map((row) => {
      const obj = {};
      row.c.forEach((cell, i) => {
        obj[headers[i]] = cell?.v ?? null;
      });
      return obj;
    });

    renderCards(data);
  });

function renderCards(data) {
  const container = document.querySelectorAll('.slider');
  const title = document.querySelectorAll('.slider-title');
  for (let i = 0; i < container.length; i++) {
    const filtData = data.filter((item) => item.category === title[i].textContent);
    filtData.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'swiper-slide bg-white p-2 rounded-2xl md:rounded-[20px] pb-4 md:p-4 md:pb-8 text-center';

      card.innerHTML = `
        <img src="public/images/${item.image}" alt="септик" class="aspect-[160/183] object-cover w-full rounded-2xl md:rounded-3xl bg-primary md:aspect-[303/274]" />
        <p class="font-medium text-base pt-4 md:text-2xl md:pt-3">${item.title}</p>
        <p class="font-bold text-xl pt-2 pb-4 md:text-[32px] md:pt-4 md:pb-3">₽${item.price1}</p>
        <p class="-mx-2 md:-mx-4 font-medium text-base pt-4 border-t border-primary italic md:text-[22px]">Септик+монтаж</p>
        <p class="font-bold text-xl pt-2 italic md:text-2xl md:pt-4">₽${item.price2}</p>
        <button class="text-white bg-accent rounded-lg flex gap-2 items-center justify-center w-full max-w-[175px] mx-auto mt-6 md:mt-12 text-sm md:text-lg h-8 md:h-10">
        <img src="public/icons/majesticons_open.svg" alt="иконка" class="size-3.5 md:size-4.5" />Подробнее</button>
      `;
      container[i].appendChild(card);
    });
  }
}

const swiper1 = new Swiper('.swiper-1', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-1',
    prevEl: '.swiper-button-prev-1',
  },

  scrollbar: {
    el: '.swiper-scrollbar-1',
  },
});

const swiper2 = new Swiper('.swiper-2', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-2',
    prevEl: '.swiper-button-prev-2',
  },

  scrollbar: {
    el: '.swiper-scrollbar-2',
  },
});

const swiper3 = new Swiper('.swiper-3', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-3',
    prevEl: '.swiper-button-prev-3',
  },

  scrollbar: {
    el: '.swiper-scrollbar-3',
  },
});

const swiper4 = new Swiper('.swiper-4', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-4',
    prevEl: '.swiper-button-prev-4',
  },

  scrollbar: {
    el: '.swiper-scrollbar-4',
  },
});

const swiper5 = new Swiper('.swiper-5', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-5',
    prevEl: '.swiper-button-prev-5',
  },

  scrollbar: {
    el: '.swiper-scrollbar-5',
  },
});

const swiper = new Swiper('.swiper-0', {
  slidesPerView: 2,
  spaceBetween: 8,

  breakpoints: {
    768: {
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-0',
    prevEl: '.swiper-button-prev-0',
  },

  scrollbar: {
    el: '.swiper-scrollbar-0',
  },
});

const swipern = new Swiper('.swiper-n', {
  slidesPerView: 1,
  loop: true,

  breakpoints: {
    768: {
      spaceBetween: 32,
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next-n',
    prevEl: '.swiper-button-prev-n',
  },
});

let phoneInput = document.querySelector('.js-phone');

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
  const input = phoneInput.value.substring(0, 10);
  // const areaCode = input.substring(0, 1);
  const operatorCode = input.substring(0, 3);
  const first = input.substring(3, 6);
  const middle = input.substring(6, 8);
  1;
  const last = input.substring(8, 10);

  if (input.length > 8) {
    phoneInput.value = `(${operatorCode}) ${first}-${middle}-${last}`;
  } else if (input.length > 6) {
    phoneInput.value = `(${operatorCode}) ${first}-${middle}`;
  } else if (input.length > 3) {
    phoneInput.value = `(${operatorCode}) ${first}`;
  } else if (input.length > 0) {
    phoneInput.value = `(${operatorCode}`;
  }
});

let form = document.querySelector('.js-form');

form.addEventListener('submit', function (e) {
  if (phoneInput.value.length !== 15) {
    e.preventDefault();
    alert('Введите полный номер телефона');
  }
});
