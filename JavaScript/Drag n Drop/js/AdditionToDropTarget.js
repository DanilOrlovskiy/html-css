function MyDropTarget(elem) {
  MyDropTarget.parent.constructor.apply(this, arguments);
}

extend(MyDropTarget, DropTarget);

MyDropTarget.prototype._showHoverIndication = function() {
  this._targetElem && this._targetElem.classList.add('hover');
};

MyDropTarget.prototype._hideHoverIndication = function() {
  this._targetElem && this._targetElem.classList.remove('hover');
};

MyDropTarget.prototype._getTargetElem = function(avatar, event) {
  var target = avatar.getTargetElem();

  while(target !== this._elem ) {
    if (target.classList.contains("dragble")) {
      var centerTargetEdge = target.getBoundingClientRect().top + target.offsetHeight / 2;
      var ceterAtavarEdge = avatar._elem.getBoundingClientRect().top + avatar._elem.offsetHeight / 2

      if (centerTargetEdge > ceterAtavarEdge) {
        console.log("top");
        return target;
      } else {
        return target.nextElementSibling;
        console.log("bottom");
      }
    }
    target = target.parentNode;
  }
};

MyDropTarget.prototype.onDragEnd = function(avatar, event) {

  if (!this._targetElem) {
    avatar.onDragCancel();
    return;
  }

  this._hideHoverIndication();

  var avatarInfo = avatar.getDragInfo(event);

  avatar.onDragEnd(avatar);

  console.log(this._targetElem);
  this._targetElem.parentNode.insertBefore(avatarInfo.dragZoneElem, this._targetElem)
  this._targetElem = null;
};