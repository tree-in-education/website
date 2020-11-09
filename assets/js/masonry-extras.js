const containers = document.querySelectorAll('.masonry-item');
for (const container of containers) {
    container.onclick = (e) => {
        const elem = e.currentTarget;
        if (elem.dataset.externalLink) {
            window.location.href = elem.dataset.externalLink;
        } else {
            window.location.href = '/projects/' + elem.id;
        }
    };
};