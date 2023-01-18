"use strict";

var toggleBtn = document.getElementById('toggle-menu');
var spanHamburger = toggleBtn.querySelectorAll('.toggle-menu__hamburger');
var menu = document.querySelector('#menu');
toggleBtn.addEventListener("click", toggleActionBtn);
function toggleActionBtn() {
  spanHamburger.forEach(function (span) {
    return span.classList.toggle("toggle-menu__hamburger--active");
  });
  menu.classList.toggle("active");
}