'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const menuBtn = document.getElementById('toggle-menu');
const nav = document.querySelector('.navigation');
const exitBtn = document.getElementById('nav-exit');
const navLink = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const cookie = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navHead = document.querySelector('.nav');

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
//! STICKY NAVIGATION
////-------------------------------------/////

const initCoords = section1.getBoundingClientRect();
// console.log(initCoords);

window.addEventListener('scroll', function () {
  // console.log(window.scrollY);

  if (window.scrollY > initCoords.top) {
    navHead.classList.add('sticky');
  } else navHead.classList.remove('sticky');
});

//////////////////////////////////////////
/////////////////////////////////////////
////////////////////////////////////////

//////////////////////////////////
//////////////////////////////////
/////////////////////////////////

//! CREATING AND INSERTING ELEMENT
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

//////////////////////////////////
//////////////////////////////////
/////////////////////////////////

////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////

///////////////////////////////////////
//! TYPES OF EVENTS AND EVENTS      //
//!          HANDLERS              //
////////////////////////////////////

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('onmouseeneter: you are entering heading dude!');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.onclick = function (e) {
//   alert('onmouseeneter: you are entering heading dude!');
// };

// h1.addEventListener('mouseenter', alertH1);

/////-------------------------------------/////
//! EVENT PROPAGATION: BUBBLING AND CAPTURING
////-------------------------------------/////
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

/**
 *! e.target === to first DOM selector which is .nav__link
 *! all the event target pointing to .nav__link
 *? e.currentTarget === this
  //! HOW TO STOP PROPAGATION
  //? ONLY USE FOR DEBUGGING FOR BIG APPLICATION
  e.stopPropagation();
  
 ** addEventListener can take 2 arguments for capturing phase
 ** it takes boolean => true and false, false is default
 */

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   //! HOW TO STOP PROPAGATION
//   //? ONLY USE FOR DEBUGGING FOR BIG APPLICATION
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINKS', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

/////-------------------------------------/////
//! DOM TRAVERSING
////-------------------------------------/////
/*
const h1 = document.querySelector('h1');

//? GOING DOWNWARDS: Child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//? GOING UPWARDS: Parents
console.log(h1.parentNode); // same
console.log(h1.parentElement); // same

h1.closest('header');

//? GOING SIDEWAYS: Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children); // => access all the siblings

//* play a bit
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
