document.querySelector('.menu-toggle').onclick = () => {
    console.log(document.querySelector('nav').classList);
    document.querySelector('nav').classList.toggle('mobile');
};
