"use strict";

const Draggable = function (element) {
   this.element = element;
   this.isMouseDown = false;

   // mouse button down over the element
   this.onMouseDown = function (ev) {
       setTimeout((function() {
        this.isMouseDown = true;
       }).bind(this), 100);

      // set element X & Y:
      const bbox = this.element.getBoundingClientRect();
      this.elementX = bbox.left;
      this.elementY = bbox.top;
      
      this.mouseX = ev.clientX;
      this.mouseY = ev.clientY;
   };

    this.onMouseUp = function (ev) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
        } else {
            window.location.href = ev.currentTarget.dataset.link;
            ev.preventDefault();
        }
    };

    this.onMouseMove = function (ev) {
        if (!this.isMouseDown) {
            return;
        }
        var deltaX = ev.clientX - this.mouseX;
        var deltaY = ev.clientY - this.mouseY;
        this.element.style.left = this.elementX + deltaX + "px";
        this.element.style.top = this.elementY + deltaY + window.scrollY + "px";
    };

    // this.navigate = function (ev) {
    //     alert(ev.currentTarget.dataset.link);
    // }
   
    // init event listeners:
    this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.element.addEventListener("mouseup", this.onMouseUp.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));

    // needed for firefox:
    this.element.addEventListener("dragstart", function (ev) {
        ev.preventDefault();
    });
};


const DraggableFactory = function (element) {
    this.draggables = [];
    const elements = document.querySelectorAll('.desktop-icon');
    const bodyRect = document.body.getBoundingClientRect();
    const positions = [];
    elements.forEach(elem => {
        const elemRect = elem.getBoundingClientRect();
        const x = elemRect.top - bodyRect.top;
        const y = elemRect.left - bodyRect.left;
        positions.push([x + 'px', y + 'px', elem]);
    });

    positions.forEach(item => {
        const elem = item[2];
        elem.style.top =item[0];
        elem.style.left = item[1];
        elem.style.position = 'absolute';
        elem.querySelector('img').setAttribute('draggable', false);
        this.draggables.push(new Draggable(elem));
    });

    this.release = function (ev) {
        console.log('release');
        this.draggables.forEach(db => {
            db.isMouseDown = false;
        });
    };

    this.onEnter = function (ev) {
        console.log(ev);
    };

    document.addEventListener("mouseup", this.release.bind(this));
    // document.addEventListener("mouseup", function () {
    //     console.log('hi');
    // }​);
}

new DraggableFactory();

