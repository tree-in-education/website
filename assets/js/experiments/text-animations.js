// Wrap every letter in a span
// var textWrapper = document.querySelector('.ml12');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: false})
//     .add({
//         targets: '.ml12 .letter',
//         translateX: [40,0],
//         translateZ: 0,
//         opacity: [0,1],
//         easing: "easeOutExpo",
//         duration: 1200,
//         delay: (el, i) => 500 + 30 * i
//     }).add({
//         targets: '.ml12 .letter',
//         translateX: [0,-30],
//         opacity: [1,0],
//         easing: "easeInExpo",
//         duration: 1100,
//         delay: (el, i) => 100 + 30 * i
//     });

let counter = 0;
let animation = anime({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 1300,
    autoplay: false,
    loop: false,
    delay: (el, i) => 45 * i
});
animation.play();
// const waypoint = new Waypoint({
//     element: document.getElementById('news'),
//     handler: (direction) => {
//         if (direction === 'up') { counter = 0; }
//         if (counter === 0) {
//             animation.play();
//         }
//         ++counter;
//     },
//     offset: '80vh'
// })



