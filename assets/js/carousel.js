let featuredImage = null;

const showImage = (ev) => {
    featuredImage = ev.target;
    document.querySelector('.preview_box').className = 'preview_box active';
    document.querySelector('.featured_image').style.backgroundImage = featuredImage.style.backgroundImage;

    //scroll to top, hide scrollbar:
    window.scrollTo(0, 0);
    document.querySelector('body').style.overflow = 'hidden';
};

const hideImage = (ev) => {
    document.querySelector('.preview_box').className = 'preview_box';

    //add scrollbar back:
    document.querySelector('body').style.overflow = 'auto';
};

const nextImage = (ev) => {
    if (featuredImage.parentElement.nextElementSibling) {
        featuredImage = featuredImage.parentElement.nextElementSibling.firstElementChild;
    } else {
        featuredImage = document.querySelector('.image');
    }
    document.querySelector('.featured_image').style.backgroundImage = featuredImage.style.backgroundImage;
};

const previousImage = (ev) => {
    if (featuredImage.parentElement.previousElementSibling) {
        featuredImage = featuredImage.parentElement.previousElementSibling.firstElementChild;
    } else {
        const numImages = document.querySelectorAll('.image').length;
        featuredImage = document.querySelectorAll('.image')[numImages - 1];
    }
    document.querySelector('.featured_image').style.backgroundImage = featuredImage.style.backgroundImage;
};

const initCarousel = () => {
    document.querySelector('.close').onclick = hideImage;
    document.querySelector('.next').onclick = nextImage;
    document.querySelector('.featured_image').onclick = nextImage;
    document.querySelector('.prev').onclick = previousImage;
    for (img of document.querySelectorAll('.image')) {
        img.onclick = showImage;
    }
};
