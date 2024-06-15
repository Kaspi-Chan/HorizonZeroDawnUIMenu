const headerNavItems = headerNav.querySelectorAll('li');
const sideNavItems = sideNavIconsCont.querySelectorAll('li');

function changeFocus(move, items) {
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  let nextIndex = currentIndex + move;

  if (nextIndex >= items.length) {
      nextIndex -= items.length;
  } else if (nextIndex < 0) {
      nextIndex += items.length;
  }

  items[nextIndex].focus();
  items[currentIndex].classList.remove('current')
  items[nextIndex].classList.add('current')
}

function changeHorizontalFocus(move, items) {
  const itemsPerRow = getItemsPerRow(items); 
  const totalItems = items.length;
  
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  let nextIndex = currentIndex + move;

  const currentRow = Math.floor(currentIndex / itemsPerRow);
  const startIndexOfRow = currentRow * itemsPerRow;
  let endIndexOfRow = startIndexOfRow + itemsPerRow - 1;

  // Adjust for the last row potentially having fewer items
  if (endIndexOfRow >= totalItems) {
    endIndexOfRow = totalItems - 1;
  }

  if (move > 0) { 
    if (nextIndex > endIndexOfRow) {
      nextIndex = startIndexOfRow; 
    }
  } else if (move < 0) { 
    if (nextIndex < startIndexOfRow) {
      nextIndex = endIndexOfRow; 
    }
  }

  items[nextIndex].focus();
  lastFocusedItem = items[nextIndex];
}

function changeVerticalFocus(move, items){
  const itemsPerRow = 4;
  const totalItems = items.length;
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  const currentColumn = currentIndex % itemsPerRow;
  const totalRows = Math.ceil(totalItems / itemsPerRow);

  // Calculate the new row, incorporating wrapping
  const currentRow = Math.floor(currentIndex / itemsPerRow);
  let newRow = (currentRow + move + totalRows) % totalRows;

  const newIndex = newRow * itemsPerRow + currentColumn;

  // Check if the new index is within the bounds of total items and the column exists in the new row
  if (newIndex < totalItems && Math.floor(newIndex / itemsPerRow) === newRow) {
    items[newIndex].focus();
    lastFocusedItem = items[newIndex];
  } 
}

function getItemsPerRow(items) {
  let rowTop = items[0].offsetTop;
  let count = 0;
  for (let item of items) {
    if (item.offsetTop === rowTop) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

interactionManager.keyboard.on({
  keys: ['E'],//L1
  callback: () => {
    if(!mainContainer.classList.contains('initial')) mainContainer.classList.add('initial')
    Array.from(headerNavItems).find((item) => item.classList.contains('current')).focus();
    changeFocus(1, headerNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['Q'], //R1
  callback: () => {
    if(!mainContainer.classList.contains('initial')) mainContainer.classList.add('initial')
    Array.from(headerNavItems).find((item) => item.classList.contains('current')).focus();
    changeFocus(-1, headerNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_LEFT'],
  callback: () => {
    if(!mainContainer.classList.contains('initial')){
      if(!lastFocusedItem){
        gridItems[0].focus()
      }else{
        lastFocusedItem.focus
      }
      changeHorizontalFocus(-1, gridItems);
    }
  },
  type: ['press']
})  
interactionManager.keyboard.on({
  keys: ['ARROW_RIGHT'],
  callback: () => {
    if(!mainContainer.classList.contains('initial')){
      changeHorizontalFocus(1, gridItems);
    }
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_DOWN'],
  callback: () => {
    if(!mainContainer.classList.contains('initial')){
      changeVerticalFocus(1, gridItems);
      return
    } 
    sideNavIconsCont.querySelector('.current').focus()
    changeFocus(1, sideNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ARROW_UP'],
  callback: () => {
    if(!mainContainer.classList.contains('initial')){
      changeVerticalFocus(-1, gridItems);
      return
    } 
    sideNavIconsCont.querySelector('.current').focus()
    changeFocus(-1, sideNavItems);
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['ESC'], // O playstation button
  callback: () => {
    collapseSideNav()
    mainContainer.classList.add('initial')
    sideNavIconsCont.querySelector('.current').focus()
  },
  type: ['press']
})  

interactionManager.keyboard.on({
  keys: ['Enter'],
  callback: (event) => {
    if(event.target.parentElement.classList.contains('side-nav-links') || event.target.parentElement.classList.contains('nav-links')){
      enterInnerMenu();
    }
  },
  type: ['press'],
})

interactionManager.keyboard.on({
  keys: ['F'], //X playstation button
  callback: (event) => {
    if(event.target.parentElement.classList.contains('side-nav-links')){
      enterInnerMenu();
    }
  },
  type: ['press'],
})
