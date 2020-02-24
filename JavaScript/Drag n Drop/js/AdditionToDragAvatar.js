function MyDragAvatar(dragZone, dragElem) {
    DragAvatar.apply(this, arguments);
}

extend(MyDragAvatar, DragAvatar);

MyDragAvatar.prototype.initFromEvent = function (downX, downY, event) {
    let target = event.target;
    while (target !== this._elem) {
        if (target.classList.contains("dragble")) {

            this._dragZoneElem = target;
            let elem = this._elem = this._dragZoneElem.cloneNode(true);
            elem.style.width = target.offsetWidth + "px";
            elem.style.height = target.offsetHeight + "px";
            elem.classList.add('avatar');

            let coords = getCoords(this._dragZoneElem);
            this._shiftX = event.pageX - coords.left;
            this._shiftY = event.pageY - coords.top;
            this._initLeft = getCoords(event.target).left;
            this._initTop = getCoords(event.target).top;

            document.body.appendChild(elem);
            elem.style.zIndex = 9999;
            elem.style.position = 'absolute';

            return true;
        }
        target = target.parentNode;
    }

    return true;
};

MyDragAvatar.prototype.getDragInfo = function (event) {
    return {
        elem: this._elem,
        dragZoneElem: this._dragZoneElem,
        dragZone: this._dragZone,
        initTop: this._initTop,
        initLeft: this._initLeft
    };
};

MyDragAvatar.prototype._returnToStart = function () {
    let self = this;
    let elem = this._elem;

    elem.style.transition = "all 0.4s";

    setTimeout(function () {
        elem.style.left = self.getDragInfo().initLeft + "px";
        elem.style.top = self.getDragInfo().initTop + "px";

        elem.addEventListener("transitionend", gohome);
    }, 0);

    function gohome(e) {
        elem.removeEventListener("transitionend", gohome);
        self._destroy();
    }
};

MyDragAvatar.prototype._destroy = function () {
    this._elem.parentNode.removeChild(this._elem);
};

MyDragAvatar.prototype.onDragCancel = function () {
    this._returnToStart();
};

MyDragAvatar.prototype.onDragEnd = function () {
    this._destroy();
};