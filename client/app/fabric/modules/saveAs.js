
if(typeof saveAs == "undefined"){
  fabric.saveAs  = require("./../plugins/saveAs.js").saveAs;
}else{
  fabric.saveAs = saveAs;
}

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  insertRenderArea: false,
  insertRenderFull: false,
});


fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  renderArea: {
    className: 'fa fa-download',
    title: 'download',
    action: function () {
      fabric.saveAs(this.getImageData({
        clipped_area: this.activeArea,
        zoom: this.dotsPerUnit,
        clipped_area_only: true,
        draw_background: true
      }).blob, this.title);
    }
  },
  renderFull: {
    title: 'download with background',
    action: function () {
      fabric.saveAs(this.getImageData({
        zoom: this.dotsPerUnit,
        clipped_area_only: false,
        draw_background: true
      }).blob, this.title);
    }
  }
});
