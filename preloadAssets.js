function preloadImages() {
  var states = ['ui-side-weapons-hover.png', 'ui-side-weapons-on.png', 'ui-side-outfits-hover.png', 'ui-side-outfits-on.png', 'ui-side-tools-hover.png', 'ui-side-tools-on.png', 'ui-side-upgrades-hover.png', 'ui-side-upgrades-on.png', 'ui-side-ammo-hover.png', 'ui-side-ammo-on.png', 'ui-side-travel-hover.png', 'ui-side-travel-on.png'];
  states.forEach(function(state) {
      var img = new Image();
      img.src = './assets/' + state;
  });
}

window.onload = preloadImages;