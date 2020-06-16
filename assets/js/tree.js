// source: https://curran.github.io/HTML5Examples/

function canvas_obj(ele) {
    const returnable = {
        canvas: ele,
        ctx: ele.getContext("2d"),
        dpi: window.devicePixelRatio
    };
    returnable.get = {
        style: {
            height() {
                return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
            },
            width() {
                return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
            }
        },
        attr: {
            height() {
                return returnable.ele.getAttribute("height");
            },
            width() {
                return returnable.ele.getAttribute("height");
            }
        }
    };
    returnable.set = {
        style: {
            height(ht) {
            ele.style.height = ht + "px";
            },
            width(wth) {
                ele.style.width = wth + "px";
            }
        },
        attr: {
            height(ht) {
                ele.setAttribute("height", ht);
            },
            width(wth) {
                ele.setAttribute("width", wth);
            }
        }
    };
    return returnable;
};


const Tree = (id, opts) => {
    opts = opts || {};
    

    const obj = canvas_obj(document.getElementById(id));
    let { canvas, ctx, dpi, set, get } = obj;
    console.log(dpi);

    // requestAnimationFrame(animate);

    function dpi_adjust() {
        set.attr.height(get.style.height() * dpi);
        set.attr.width(get.style.width() * dpi);
    }

    // const canvas = document.getElementById(id);
    // const ctx = canvas.getContext("2d");

    let isInteractive = true;
    if (opts.isInteractive !== undefined) {
        isInteractive = opts.isInteractive;
    }
    let showLabel = opts.showLabel;
    if (showLabel === undefined) {
        showLabel = true;
    }
    let height = get.style.height();
    // let width = get.style.width() * 3;    
    let animationY = height; canvas.height;
    let branchLengthRatio = 0.873; //0.775;
    let branchingDepth = opts.branchingDepth || 10;
    let trunkHeight = canvas.height / 6;
    let alpha = 1;
    let branchAngleDifference = -0.35;
    let animation = null;
    let fontSize = parseInt(opts.fontSize || '30px') * dpi + "px";

    const drawTree = (x1, y1, x2, y2, branchLength, branchAngle, depth) => {
        if (depth === 0)
            return;

        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.moveTo(x1, y1);
        // if (depth < 3) {
        //     // if (alpha < 0.1)
        //     //     ctx.strokeStyle = 'black';
        //     // else
        //         ctx.strokeStyle = 'rgba(41, 81, 46, ' + alpha + ')';
        //     // ctx.strokeStyle = 'rgba(62, 122, 70, ' + alpha + ')';
        //     // ctx.strokeStyle = 'rgba(135, 195, 143, ' + alpha + ')';
        //     // ctx.strokeStyle = 'rgba(124, 143, 19, ' + alpha + ')';
        // } else 
        
        if (depth < 2) {
            ctx.strokeStyle = 'rgba(62, 122, 70, ' + alpha + ')';
        } else if (depth < 1) {
            ctx.strokeStyle = 'rgba(135, 195, 143, ' + alpha + ')';
        } else {
            ctx.strokeStyle = 'black';
        }
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        branchLength *= branchLengthRatio;

        // right branch
        branch(depth, x2, y2, branchLength, branchAngle + branchAngleDifference);

        // left branch
        branch(depth, x2, y2, branchLength, branchAngle - branchAngleDifference);
    };

    const branch = (depth, x, y, branchLength, angle) => {
        const branchX = x + branchLength * Math.cos(angle);
        const branchY = y + branchLength * Math.sin(angle);
        drawTree(
            x, y, branchX, branchY, branchLength,
            angle, depth - 1);
    };

    const fillTextWithSpacing = (context, text, x, y, spacing) => {
        //Start at position (X, Y).
        //Measure wAll, the width of the entire string using measureText()
        wAll = context.measureText(text).width;
        x = wAll / 2 + wAll * .1;

        do {
            //Remove the first character from the string
            char = text.substr(0, 1);
            text = text.substr(1);

            //Print the first character at position (X, Y) using fillText()
            context.fillText(char, x, y);

            //Measure wShorter, the width of the resulting shorter string using measureText().
            if (text == "")
                wShorter = 0;
            else
                wShorter = context.measureText(text).width;

            //Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
            wChar = wAll - wShorter;

            //Increment X by wChar + spacing
            x += wChar + spacing;

            //wAll = wShorter
            wAll = wShorter;

            //Repeat from step 3
        } while (text != "");
    };

    const redrawTree = () => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        const x = canvas.width / 2;
        const y1 = canvas.height;
        const y2 = canvas.height - trunkHeight;
        // const opacity = 1.0 - alpha;
        // console.log(opacity);
        // canvas.getContext("2d").fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        // canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
            
        drawTree(x, y1, x, y2, trunkHeight,
                - Math.PI / 2, branchingDepth);
        // label:
        if (showLabel) {
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
            ctx.font = fontSize + ' "Oswald", sans-serif';
            //ctx.fontWeight = 300;
            // ctx.textAlign = 'center';
            fillTextWithSpacing(ctx, "TREE", 45, y1, 8 * dpi);
            // ctx.fillText("TREE", x + x * 0.03, y1);
        }
    };

    const updateTreeOnMousemove = (e) => {
        clearInterval(animation);
        const rect = canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        if (Math.abs(animationY - y) > 6) {
            animationY = y;
            updateTree(y);
        }
    };

    const setDimensions = () => {
        dpi_adjust();
        trunkHeight = canvas.height / 6;
    }

    const updateTree = y => {
        // console.log(y);
        y *= dpi;
        setDimensions();
        branchAngleDifference = -1 * (y / canvas.height * 0.8 + 0.35);
        alpha = Math.abs(1 - y / canvas.height);
        branchLengthRatio = alpha * .18 + 0.7;
        redrawTree();
    };
    this.startAnimation = () => {
        animationY = document.querySelector('#' + id).clientHeight;
        animation = setInterval(animate, opts.speed || 10);
    };

    const animate = () => {
        --animationY;
        // console.log(animationY);
        const ratio = animationY / height;
        // if (animationY <= 0) {
        if (ratio <= 0.1) {
            clearInterval(animation);
            // console.log('CLEARED');
            return;
        }
        updateTree(animationY);
    }
    const init = () => {
        // attach event handlers:
        if (isInteractive) {
            canvas.addEventListener("mousemove", updateTreeOnMousemove);
        }

        // init animation if requested:
        if (opts.animate) {
            updateTree(document.querySelector('#' + id).clientHeight);
            if (opts.delay) {
                setTimeout(startAnimation, opts.delay);
                return;
            }
            startAnimation();
        } else {
            // make sure that font has loaded from the internet...
            document.fonts.ready.then(() => {
                updateTree(document.querySelector('#' + id).clientHeight / 5);
            });
        }
    }

    init();

};
