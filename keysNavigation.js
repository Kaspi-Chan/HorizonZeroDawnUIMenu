function changeFocus(move, items) {
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  let nextIndex = currentIndex + move;

  if (nextIndex >= items.length) {
    nextIndex -= items.length;
  } else if (nextIndex < 0) {
    nextIndex += items.length;
  }

  items[nextIndex].focus();
  items[currentIndex].classList.remove('current');
  items[nextIndex].classList.add('current');
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

function changeVerticalFocus(move, items) {
  const itemsPerRow = getItemsPerRow(items);
  const totalItems = items.length;
  const currentIndex = Array.from(items).indexOf(document.activeElement);
  const currentColumn = currentIndex % itemsPerRow;
  const totalRows = Math.ceil(totalItems / itemsPerRow);

  const currentRow = Math.floor(currentIndex / itemsPerRow);
  let newRow = (currentRow + move + totalRows) % totalRows;

  const nextIndex = newRow * itemsPerRow + currentColumn;

  if (
    nextIndex < totalItems &&
    Math.floor(nextIndex / itemsPerRow) === newRow
  ) {
    items[nextIndex].focus();
    lastFocusedItem = items[nextIndex];
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

const focusCurrentItem = (collection) => {
  Array.from(collection)
    .find((item) => item.classList.contains('current'))
    .focus();
};

const keyActions = {
  E: () => {
    if (!isInInitial) {
      exitInnerMenu();
    }
    focusCurrentItem(headerNavItems);
    changeFocus(1, headerNavItems);
  },
  Q: () => {
    if (!isInInitial) {
      exitInnerMenu();
    }
    focusCurrentItem(headerNavItems);
    changeFocus(-1, headerNavItems);
  },
  ARROW_LEFT: () => {
    if (!isInInitial) {
      focusLastGridItem();
      changeHorizontalFocus(-1, gridItems);
    }
  },
  ARROW_RIGHT: () => {
    if (!isInInitial) {
      focusLastGridItem();
      changeHorizontalFocus(1, gridItems);
    }
  },
  ARROW_UP: () => {
    if (!isInInitial) {
      changeVerticalFocus(-1, gridItems);
      return;
    } else {
      focusCurrentItem(sideNavItems);
      changeFocus(-1, sideNavItems);
    }
  },
  ARROW_DOWN: () => {
    if (!isInInitial) {
      changeVerticalFocus(1, gridItems);
    } else {
      focusCurrentItem(sideNavItems);
      changeFocus(1, sideNavItems);
    }
  },
  ESC: () => {
    collapseSideNav();
    exitInnerMenu();
  },
  ENTER: (event) => {
    if (
      event.target.parentElement.classList.contains('side-nav-links') ||
      event.target.parentElement.classList.contains('nav-links')
    ) {
      enterInnerMenu();
    }
  },
  F: (event) => {
    if (
      event.target.parentElement.classList.contains('side-nav-links') ||
      event.target.parentElement.classList.contains('nav-links')
    ) {
      enterInnerMenu();
    }
  },
};

Object.keys(keyActions).forEach((key) => {
  interactionManager.keyboard.on({
    keys: [key],
    callback: keyActions[key],
    type: ['press'],
  });
});
