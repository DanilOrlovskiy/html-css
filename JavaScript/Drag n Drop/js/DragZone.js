function DragZone(elem) {
    elem.dragZone = this;
    this._elem = elem;
}

DragZone.prototype._makeAvatar = function () {
    /* override */
};

DragZone.prototype.onDragStart = function (downX, downY, event) {

    let avatar = this._makeAvatar();

    if (!avatar.initFromEvent(downX, downY, event)) {
        return false;
    }

    return avatar;
};