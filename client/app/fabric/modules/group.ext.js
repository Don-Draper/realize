var _GroupRemoveNetive = fabric.Group.prototype.remove;

fabric.util.object.extend(fabric.Group.prototype, {
  /**
   * Removes object from canvas to which it was added last
   * @return {fabric.Object} thisArg
   * @chainable
   */
  remove: function () {
    if (arguments.length === 0) {
      this.canvas && this.canvas.remove(this);
    } else {
      _GroupRemoveNetive.apply(this, arguments);
    }

    return this;
  }
});
