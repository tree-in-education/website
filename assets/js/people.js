const loadCards = (photos) => {
    for (photo of photos) {
        const template = `
            <li class="card">
                <div class="image" style="background-image:url('${photo}')"></div>
            </li>
        `;
        document.querySelector('.cards').innerHTML += template;
    }
};

loadCards([
    'assets/images/green.jpg',
    'assets/images/img1.jpg',
    'assets/images/img2.jpg',
    'assets/images/img3.jpg',
    'assets/images/red.jpg',
    'assets/images/purple.jpg',
    'assets/images/green.jpg',
    'assets/images/red.jpg',
    'assets/images/purple.jpg',
    'assets/images/purple.jpg'
]);
initCarousel();
