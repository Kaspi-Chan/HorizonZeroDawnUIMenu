const mainContainer = document.querySelector('.main-content');
const sideNav = document.querySelector('.side-nav');
const sideNavIconsCont = document.querySelector('.side-nav-links');
const itemDesc = document.querySelector('.items-desc');
const itemsGrid = document.querySelector('.items-grid');
const gridItems = itemsGrid.querySelectorAll('.grid-item');
const headerNav = document.querySelector('.nav-links');
const headerNavItems = headerNav.querySelectorAll('li');
const sideNavItems = sideNavIconsCont.querySelectorAll('li');
const footerBackButton = document.querySelector(
  '.controller-input-container.--back > span'
);
const footerSelectButton = document.querySelector(
  '.controller-input-container.--select > span'
);
let isInInitial = mainContainer.classList.contains('initial');
let lastFocusedItem;

function setInitial(state) {
  if (state) {
    mainContainer.classList.add('initial');
    isInInitial = true;
  } else {
    mainContainer.classList.remove('initial');
    isInInitial = false;
  }
}

function getLongestLiElementWidth(elementsArr) {
  const longestLink = elementsArr.reduce((acc, current) => {
    return acc.offsetWidth > current.offsetWidth ? acc : current;
  }, elementsArr[0].offsetWidth);

  return longestLink.offsetWidth;
}

function switchCurrentBtn(event) {
  const clickedBtn =
    event.type === 'click' ? event.currentTarget : event.target;
  const siblingBtns = Array.from(clickedBtn.parentElement.children);
  siblingBtns.forEach((button) => {
    button.classList.remove('current');
  });
  clickedBtn.classList.add('current');
}

function expandSideNav() {
  if (isInInitial) return;
  const menuLinks = Array.from(
    sideNavIconsCont.querySelectorAll('.side-nav-link > span')
  );
  const longestElementWidth = getLongestLiElementWidth(menuLinks);

  sideNav.style.paddingRight = `calc(5rem + ${Math.ceil(longestElementWidth / 2)}px)`;
  sideNav.classList.add('expanded-menu');
  itemDesc.classList.add('expanded-menu');
  itemsGrid.classList.add('expanded-menu');
}

function collapseSideNav() {
  if (isInInitial) return;
  sideNav.style.paddingRight = '5rem';
  itemDesc.classList.remove('expanded-menu');
  itemsGrid.classList.remove('expanded-menu');
  sideNav.classList.remove('expanded-menu');
}

function initiallyFocusHeaderElement() {
  const currentElement = headerNav.querySelector('.current');
  currentElement.focus();
}

function enterInnerMenu() {
  setInitial(false);
  Array.from(gridItems).forEach((gridItem) =>
    gridItem.setAttribute('tabindex', '0')
  );
  focusLastGridItem();
}

function exitInnerMenu() {
  setInitial(true);
  Array.from(gridItems).forEach((gridItem) =>
    gridItem.removeAttribute('tabindex')
  );
  sideNavIconsCont.querySelector('.current').focus();
}

function focusLastGridItem() {
  if (!lastFocusedItem) {
    gridItems[0].focus();
  } else {
    lastFocusedItem.focus();
  }
}

Array.from(sideNavIconsCont.children).forEach((iconBtn) => {
  iconBtn.addEventListener('click', (event) => {
    switchCurrentBtn(event);
    enterInnerMenu();
  });
});

Array.from(headerNav.children).forEach((navLink) => {
  navLink.addEventListener('click', (event) => {
    switchCurrentBtn(event);
    exitInnerMenu();
  });
});

Array.from(gridItems).forEach((gridItem) => {
  gridItem.addEventListener('mouseenter', (event) => {
    if (isInInitial) return;
    event.currentTarget.focus();
    lastFocusedItem = event.currentTarget;
  });
});

itemsGrid.addEventListener('click', enterInnerMenu);
sideNavIconsCont.addEventListener('mouseenter', expandSideNav);
sideNav.addEventListener('mouseleave', collapseSideNav);
footerBackButton.addEventListener('click', exitInnerMenu);
footerSelectButton.addEventListener('click', enterInnerMenu);

document.addEventListener('DOMContentLoaded', () => {
  initiallyFocusHeaderElement();
});
