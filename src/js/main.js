import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

let menu = document.querySelector('.js-menu');
let burger = document.querySelector('.js-burger');
let bars = document.querySelectorAll('.js-bar');

burger.addEventListener('click', () => {
  menu.classList.toggle('top-15');
  menu.classList.toggle('md:top-28');
  bars[0].classList.toggle('rotate-45');
  bars[0].classList.toggle('translate-y-2');
  bars[1].classList.toggle('opacity-0');
  bars[2].classList.toggle('-rotate-45');
  bars[2].classList.toggle('-translate-y-2');
});

fetch('https://docs.google.com/spreadsheets/d/1uPas_hqXHmcYewWpLCbky9z9BFvwPj9qCbwswnUXzZQ/gviz/tq?tqx=out:json')
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
  const sectionWrap = document.querySelector('.js-section');
  const linkWrap = document.querySelector('.js-links');
  const linkWrap2 = document.querySelector('.js-links2');
  const uniqueCategories = [...new Set(data.map((it) => it.category))];

  for (let i = 0; i < uniqueCategories.length; i++) {
    const section = document.createElement('section');

    section.className = 'max-w-384 lg:mx-auto pb-14 md:pb-16 -mx-2';
    section.id = uniqueCategories[i];
    section.innerHTML = `<h2 class="font-bold text-2xl text-center pb-8 md:text-[44px] md:pb-12 lg:pl-50 lg:text-left">
          Септики <span class="slider-title">${uniqueCategories[i]}</span>
        </h2>
        <div class="relative px-2 md:px-13">
          <div class="swiper swiper-${i + 1} !static">
            <div class="swiper-wrapper slider"></div>

            <button
              aria-label="предыдущий слайд"
              class="swiper-button-prev-${i + 1} absolute top-1/2 z-10 left-0 -translate-y-full">
              <img src="assets/icons/Arrow_5.svg" alt="стрелка" class="md:hidden" />
              <img src="assets/icons/Arrow_1.svg" alt="стрелка" class="hidden md:block" />
            </button>
            <button
              aria-label="следующий слайд"
              class="swiper-button-next-${i + 1} absolute top-1/2 z-10 right-0 -translate-y-full">
              <img src="assets/icons/Arrow_5.svg" alt="стрелка" class="md:hidden rotate-180" />
              <img src="assets/icons/Arrow_1.svg" alt="стрелка" class="hidden md:block rotate-180" />
            </button>
            <div class="swiper-scrollbar swiper-scrollbar-${i + 1} mt-6 md:mt-8"></div>
          </div>
        </div>`;
    sectionWrap.appendChild(section);

    const link = document.createElement('a');
    link.href = '';
    link.className = 'font-medium text-lg';
    link.setAttribute('data-target', uniqueCategories[i]);
    link.textContent = `Септики ${uniqueCategories[i]}`;
    linkWrap.appendChild(link);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-target');
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const link2 = document.createElement('a');
    link2.href = '';
    link2.className = 'font-medium text-lg';
    link2.setAttribute('data-target', uniqueCategories[i]);
    link2.textContent = `Септики ${uniqueCategories[i]}`;
    linkWrap2.appendChild(link2);

    link2.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-target');
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const sliderEl = section.querySelector(`.slider`);
    const filtData = data.filter((item) => item.category === uniqueCategories[i]);

    filtData.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'swiper-slide bg-white p-2 rounded-2xl md:rounded-[20px] pb-4 md:p-4 md:pb-8 text-center';

      card.innerHTML = `
        <img src="assets/images/${item.image}" alt="септик" class="aspect-[160/183] object-cover w-full rounded-2xl md:rounded-3xl bg-primary md:aspect-[303/274]" />
        <p class="font-medium text-base pt-4 md:text-2xl md:pt-3">${item.title}</p>
        <p class="font-bold text-xl pt-2 pb-4 md:text-[32px] md:pt-4 md:pb-3">₽${item.price1}</p>
        <p class="-mx-2 md:-mx-4 font-medium text-base pt-4 border-t border-primary italic md:text-[22px]">Септик+монтаж</p>
        <p class="font-bold text-xl pt-2 italic md:text-2xl md:pt-4">₽${item.price2}</p>
        <a href='${item.link}' class="text-white bg-accent rounded-lg flex gap-2 items-center justify-center w-full max-w-[175px] mx-auto mt-6 md:mt-12 text-sm md:text-lg h-8 md:h-10">
          <img src="assets/icons/majesticons_open.svg" alt="иконка" class="size-3.5 md:size-4.5" />Подробнее</a>
      `;

      sliderEl.appendChild(card);
    });

    new Swiper(`.swiper-${i + 1}`, {
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
        nextEl: `.swiper-button-next-${i + 1}`,
        prevEl: `.swiper-button-prev-${i + 1}`,
      },
      scrollbar: {
        el: `.swiper-scrollbar-${i + 1}`,
      },
    });
  }
}

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

// let form = document.querySelector('.js-form');

// form.addEventListener('submit', function (e) {
//   if (phoneInput.value.length !== 15) {
//     e.preventDefault();
//     alert('Введите полный номер телефона');
//   } else {
//     alert('Заявка получена! Мы свяжемся с вами в ближайшее время');
//   }
// });

document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const emails = ['7891415z@mail.ru', 'errorrs@yandex.com'];

  emails.forEach((email) => {
    fetch(`https://formsubmit.co/${email}`, {
      method: 'POST',
      body: formData,
    });
  });

  alert('Заявка получена! Мы свяжемся с вами в ближайшее время');
  form.reset();
});

document.querySelector('.form2').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const emails = ['7891415z@mail.ru', 'errorrs@yandex.com'];

  emails.forEach((email) => {
    fetch(`https://formsubmit.co/${email}`, {
      method: 'POST',
      body: formData,
    });
  });

  if (phoneInput.value.length !== 15) {
    e.preventDefault();
    alert('Введите полный номер телефона');
  } else {
    alert('Заявка получена! Мы свяжемся с вами в ближайшее время');
    form.reset();
  }
});
