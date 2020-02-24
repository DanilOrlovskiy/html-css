function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docElem = document.documentElement;

    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    let clientTop = docElem.clientTop || body.clientTop || 0;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left)
    };
}

function getElementUnderClientXY(elem, clientX, clientY) {
    let display = elem.style.display || '';
    elem.style.display = 'none';

    let target = document.elementFromPoint(clientX, clientY);

    elem.style.display = display;

    if (!target || target == document) {
        target = document.body;
    }

    return target;
}

function extend(Child, Parent) {
    function F() {
    }

    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
}