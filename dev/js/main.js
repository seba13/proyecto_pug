


let toggleBtn = document.getElementById('toggle-menu')

let spanHamburger = toggleBtn.querySelectorAll('.toggle-menu__hamburger')

let menu = document.querySelector('#menu')

toggleBtn.addEventListener("click", toggleActionBtn)



function toggleActionBtn() {

    spanHamburger.forEach(span => span.classList.toggle("toggle-menu__hamburger--active"))

    menu.classList.toggle("active")
}