const loadCards = (photos) => {
    for (photo of photos) {
        document.querySelector('.cards').innerHTML += template;
    }
};
initCarousel();
