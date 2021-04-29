'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const menuBtn = document.getElementById('toggle-menu');
const nav = document.querySelector('.navigation');
const exitBtn = document.getElementById('nav-exit');
const navLink = document.querySelectorAll('.nav-link');

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
    e.preventDefault();
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
