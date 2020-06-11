const nav = document.querySelector("nav");
const sticky = nav.offsetTop;

const stickyToggle = () => {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};

window.onscroll = stickyToggle;