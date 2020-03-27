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
    '{{site.baseurl}}/assets/images/green.jpg',
    '{{site.baseurl}}/assets/images/img1.jpg',
    '{{site.baseurl}}/assets/images/img2.jpg',
    '{{site.baseurl}}/assets/images/img3.jpg',
    '{{site.baseurl}}/assets/images/red.jpg',
    '{{site.baseurl}}/assets/images/purple.jpg',
    '{{site.baseurl}}/assets/images/green.jpg',
    '{{site.baseurl}}/assets/images/red.jpg',
    '{{site.baseurl}}/assets/images/purple.jpg',
    '{{site.baseurl}}/assets/images/purple.jpg'
]);
initCarousel();
