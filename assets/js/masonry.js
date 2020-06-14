/**
 * Set appropriate spanning to any masonry item
 * @param item Object A brick/tile/cell inside the masonry
 * @link https://w3bits.com/css-grid-masonry/
 */

let numLoaded = 0;

const resizeMasonryItem = (item) => {
    /* Get the grid object, its row-gap, and the size of its implicit rows */
    //item.style.removeProperty('grid-row-end');
    const grid = document.getElementsByClassName('masonry')[0];
    if (grid) {
        var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
            rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
            gridImagesAsContent = item.querySelector('img.masonry-content');
  
        var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  
        /* Set the spanning as calculated above (S) */
        item.style.gridRowEnd = 'span '+rowSpan;
        if(gridImagesAsContent) {
            item.querySelector('img.masonry-content').style.height = item.getBoundingClientRect().height + "px";
        }
    }
};

const resizeAllMasonryItems = () => {
    const allItems = document.querySelectorAll('.masonry-item');
    if (allItems) {
        for(var i=0;i < allItems.length;i++){
            resizeMasonryItem(allItems[i]);
        }
    };
};

const scrollToAnchor = (ev) => {
    console.log('scrollToAnchor');
    if (!window.location.hash) {
        console.log('returning...');
        return;
    }
    setTimeout(() => {window.scrollTo(0, 250);}, 1);
    // window.scrollTo(0, 250);
    const distanceToTop = (el) => {
        return Math.floor(el.getBoundingClientRect().top);
    };
    setTimeout(() => {
        var targetID = window.location.hash;
        const targetAnchor = document.querySelector(targetID);
        const yDistance = distanceToTop(targetAnchor) - 60;
        console.log(targetID, yDistance);
        window.scrollBy({ top: yDistance, left: 0, behavior: 'smooth' });
    }, 10);
    if (ev) {
        ev.preventDefault();
    }          
};
  
const waitForImages = () => {
    const allItems = document.querySelectorAll('.masonry-item');
    if (allItems) {
        for( var i=0; i<allItems.length; i++) {
            imagesLoaded( allItems[i], function(instance) {
                var item = instance.elements[0];
                resizeMasonryItem(item);
                ++numLoaded;
                if (numLoaded === allItems.length) {
                    numLoaded = 0;
                    document.querySelector('.masonry').classList.add('visible');
                    scrollToAnchor();
                }
            });
        }
    }
};
  

window.addEventListener('load', resizeAllMasonryItems);
window.addEventListener('resize', resizeAllMasonryItems);
window.addEventListener('hashchange', scrollToAnchor);

/* Do a resize once more when all the images finish loading */
waitForImages();