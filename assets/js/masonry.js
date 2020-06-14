/**
 * Set appropriate spanning to any masonry item
 * @param item Object A brick/tile/cell inside the masonry
 * @link https://w3bits.com/css-grid-masonry/
 */
function resizeMasonryItem(item) {

    /* Get the grid object, its row-gap, and the size of its implicit rows */
    //item.style.removeProperty('grid-row-end');
    var grid = document.getElementsByClassName('masonry')[0];
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
        item.classList.add('visible');
    }
}

function resizeAllMasonryItems() {
    console.log('resizing!')
    var allItems = document.querySelectorAll('.masonry-item');
    if (allItems) {
        for(var i=0;i < allItems.length;i++){
            resizeMasonryItem(allItems[i]);
        }
    };
}
  
function waitForImages() {
    //var grid = document.getElementById("masonry");
    var allItems = document.querySelectorAll('.masonry-item');
    if( allItems ) {
      for(var i=0;i<allItems.length;i++){
        imagesLoaded( allItems[i], function(instance) {
          var item = instance.elements[0];
          resizeMasonryItem(item);
          console.log("Waiting for Images");
        } );
      }
    }
}
  
var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
    window.addEventListener(event, resizeAllMasonryItems);
});
  
/* Do a resize once more when all the images finish loading */
waitForImages();