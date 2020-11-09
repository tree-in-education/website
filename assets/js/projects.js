const containers = document.querySelectorAll('.masonry-item');
for (const container of containers) {
    container.onclick = (e) => {
        const url = '/projects/' + e.currentTarget.id;
        window.location.href = url;
    };
};