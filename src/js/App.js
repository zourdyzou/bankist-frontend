'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const menuBtn = document.getElementById('toggle-menu');
const nav = document.querySelector('.navigation');
const exitBtn = document.getElementById('nav-exit');
const navLink = document.querySelectorAll('.nav-link');
const cookie = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navHead = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

menuBtn.addEventListener('click', e => {
  e.preventDefault();
  nav.classList.remove('hidden');
});

exitBtn.addEventListener('click', e => {
  e.preventDefault();
  nav.classList.add('hidden');
});

navLink.forEach(n => {
  n.addEventListener('click', e => {
    nav.classList.add('hidden');
  });
});

btnsOpenModal.forEach(curr => curr.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////-------------------------------------/////
//! SCROLL BEHAVIOUR
////-------------------------------------/////

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // viewport

  //! this is actually for the extends scrolling viewport from the current window to the top viewport
  console.log(s1coords.top + window.pageYOffset);

  //! old way
  // window.scrollTo({
  // //   left: s1coords.left + window.pageXOffset,
  // //   top: s1coords.top + window.pageYOffset,
  // //   behavior: 'smooth',
  // // });

  //* modern way but only just work in modern browser
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////-------------------------------------/////
//! EVENT DELEGATIONS: IMPLEMENTING PAGE NAVIGATION
////-------------------------------------/////

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //* if user click the navigation
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

/////-------------------------------------/////
//! TAB COMPONENTS
////-------------------------------------/////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //? GUARD CLAUSE
  //? if there is no clicked, immediately return
  if (!clicked) return;

  //! Remove Tab Active
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // clear the tab--active first

  //! Remove Content Active
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //? Tab Active
  clicked.classList.add('operations__tab--active');

  //? Content Active
  console.log(clicked.dataset.tab); //* => data-tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log(clicked);
});

/////-------------------------------------/////
//! MENU FADE ANIMATION
////-------------------------------------/////

/**
 * * WE USE 'MOUSEOVER' BECAUSE 'MOUSENTER' DOES NOT BUBBLING
 */

const handleHover = function (e) {
  // console.log(this);
  /**
   * * we use this keyowrd for the reference bind() method
   */
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //! back to the parent for search the closest
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //* the Magic
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

navHead.addEventListener('mouseover', handleHover.bind(0.5));
navHead.addEventListener('mouseout', handleHover.bind(1));

/////-------------------------------------/////
//! STICKY NAVIGATION with Intersection Observer API
////-------------------------------------/////

/**
 * * INTERSECTION OBSERVER API:
 * * allow our code to observe changes to a certain target of element intersect another element or intersect the viewport
 *
 * ? threshold: this is basically the percentage of intersection at which the observer callback will be called
 * ? root: viewport
 */

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navHead.classList.add('sticky');
  else navHead.classList.remove('sticky');
  // console.log(entry);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-90px`,
});

headerObserver.observe(header);

/////-------------------------------------/////
//! REVEALING ELEMENT WHEN SCROLLING
////-------------------------------------/////

//?  using libraries
const sr = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 2000,
  reset: false,
  mobile: true,
});

sr.reveal(
  `.header__title, .header__img, .features__img, .features__feature, .section__title, .operations__tab, .operations__content, .slider, .section--sign-up`,
  {
    interval: 200,
  }
);

//* only javascript => vanilla js using IntersectionObserver API

const revealObserve = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  //! we use target for targeting what the section is intersecting
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealObserve, {
  root: null,
  threshold: 0.15,
});

// allSections.forEach(function (sec) {
//   sectionObserver.observe(sec);
//   sec.classList.add('section--hidden');
// });

/////-------------------------------------/////
//! LAZY LOADING IMAGES
////-------------------------------------/////
const loadingImg = function (entries, observer) {
  const [entry] = entries;

  // guard clause
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  //* remove the lazy__img class/blur props
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});
/////-------------------------------------/////
//! CREATING AND INSERTING ELEMENT
//! CREATING COOKIES MESSAGE AND CONSENT
////-------------------------------------/////

cookie.classList.add('cookie-message');
cookie.classList.add('hidden');
cookie.innerHTML =
  'We use cookies for empowering our website perfomance and user interactions with functionality <button class="btn-cookie btn-close-cookie">Got it!</button';
header.append(cookie);
const btnCookie = document.querySelector('.btn-close-cookie');
// header.append(cookie.cloneNode(true));

//? delete element
btnCookie.addEventListener('click', e => {
  e.preventDefault();
  cookie.remove();

  // the old way
  // cookie.parentElement.removeChild(cookie);
});

//? STYLES
cookie.style.backgroundColor = '#37383d';
cookie.style.width = '120%';
cookie.style.height =
  Number.parseFloat(getComputedStyle(cookie).height, 10) + 30 + 'px';

//? cookie showed up
setTimeout(() => {
  cookie.classList.remove('hidden');
}, 5000);

/////-------------------------------------/////
//! GENERATE RANDOM COLOR
////-------------------------------------/////
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());
