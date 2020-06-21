const nav = document.querySelector("nav");
const main = document.querySelector("main");
const cover = document.querySelector(".cover");
const sticky = nav.offsetTop;

const toggleMobileMenu = (e) => {
    nav.classList.remove('sticky');
    nav.classList.toggle('mobile');
    cover.classList.toggle('mobile');
    e.preventDefault();
};
const isMobile = () => {
    return getComputedStyle(nav).display === 'none' || nav.classList.contains('mobile');
};

const stickyToggle = () => {
    if (isMobile()) { 
        return; 
    }
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        main.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
        main.classList.remove("sticky");
    }
};

window.onscroll = stickyToggle;
document.querySelector('.menu-toggle').onclick = toggleMobileMenu;
document.querySelector('.cover').onclick = toggleMobileMenu;