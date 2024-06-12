const headerNavItems = headerNav.querySelectorAll('li');
const sideNavItems = sideNavIconsCont.querySelectorAll('li');

function changeFocus(move, items) {
  console.log(items)
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  let nextIndex = currentIndex + move;

  if (nextIndex >= items.length) {
      nextIndex = 0;
  } else if (nextIndex < 0) {
      nextIndex = items.length - 1;
  }

  items[nextIndex].focus();
}

interactionManager.keyboard.on({
  keys: ['ARROW_RIGHT'],
  callback: (event) => {
    changeFocus(1, headerNavItems);
    event.preventDefault();
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_LEFT'],
  callback: (event) => {
    changeFocus(-1, headerNavItems);
    event.preventDefault();
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_DOWN'],
  callback: (event) => {
    changeFocus(1, sideNavItems);
    event.preventDefault();
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_UP'],
  callback: (event) => {
    changeFocus(-1, sideNavItems);
    event.preventDefault();
  },
  type: ['press']
})  