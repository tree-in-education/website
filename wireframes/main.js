document.querySelector('.menu-toggle').onclick = (e) => {
    //console.log(document.querySelector('nav').classList);
    document.querySelector('nav').classList.toggle('mobile');
    e.preventDefault();
};
