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
  keys: ['E'],
  callback: () => {
    changeFocus(1, headerNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['Q'],
  callback: () => {
    changeFocus(-1, headerNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_DOWN'],
  callback: () => {
    changeFocus(1, sideNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_UP'],
  callback: (event) => {
    changeFocus(-1, sideNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ESC'],
  callback: () => {
    mainContainer.classList.add('initial')
  },
  type: ['press']
})  