document.querySelector('.menu-toggle').onclick = (e) => {
    //console.log(document.querySelector('nav').classList);
    document.querySelector('nav').classList.toggle('mobile');
    e.preventDefault();
};



const nav = document.querySelector("nav");
const sticky = nav.offsetTop;
let timeout;
const stickyToggle = () => {
    if (window.pageYOffset > sticky && !nav.classList.contains('mobile')) {
        if (!timeout) {
            timeout = setTimeout(() => {
                nav.classList.add("sticky");
                timeout = null;
            }, 100);
        }
    } else {
        if (!timeout) {
            timeout = setTimeout(() => {
                nav.classList.remove("sticky");
                timeout = null;
            }, 100);
        }
    }
};

window.onscroll = stickyToggle;