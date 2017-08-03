var textInitialize = fabric.Text.prototype.initialize;

fabric.util.object.extend(fabric.Text.prototype, {
  textInitialize: textInitialize,
  editTool: false,
  advancedColorsTools: false,
  textFontSizeTools: false,
  textAligmentTools: false,
  advancedTextStyleTools: false,
  rasterizeTool: false,
  rasterizeKlass: fabric.Image,
  initialize: function (text, options) {
    this._initEntity(options);
    this.textInitialize(text, options);
    // this.updateCache();
  }
});
