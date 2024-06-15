const mainContainer = document.querySelector('.main-content');
const sideNav = document.querySelector('.side-nav');
const sideNavIconsCont = document.querySelector('.side-nav-links')
const itemDesc = document.querySelector('.items-desc')
const itemsGrid = document.querySelector('.items-grid')
const headerNav = document.querySelector('.nav-links')
const gridItems =  itemsGrid.querySelectorAll('.grid-item')
const headerNavItems = headerNav.querySelectorAll('li');
const sideNavItems = sideNavIconsCont.querySelectorAll('li');
let lastFocusedItem;

const getLongestLiElementWidth = (elementsArr) => {
  const longestLink = elementsArr.reduce((acc, current) => {
    return acc.offsetWidth > current.offsetWidth ? acc : current
  }, elementsArr[0].offsetWidth)

  return longestLink.offsetWidth;
}

const switchCurrentBtn = (event) => {
  const clickedBtn = event.type === 'click' ? event.currentTarget : event.target;
  const siblingBtns = Array.from(clickedBtn.parentElement.children);
  siblingBtns.forEach((button) => {
    button.classList.remove('current');
  })    
  clickedBtn.classList.add('current');
}

const expandSideNav = () => {
  if(mainContainer.classList.contains('initial')) return;
  const menuLinks = Array.from(sideNavIconsCont.querySelectorAll('.side-nav-link > span'))
  const longestElementWidth = getLongestLiElementWidth(menuLinks)

  sideNav.style.paddingRight = `calc(5rem + ${Math.ceil(longestElementWidth / 2)}px)`;
  sideNav.classList.add('expanded-menu')
  itemDesc.classList.add('expanded-menu')
  itemsGrid.classList.add('expanded-menu')
}

const collapseSideNav = () => {
  if(mainContainer.classList.contains('initial')) return;
  sideNav.style.paddingRight = '5rem';
  itemDesc.classList.remove('expanded-menu')
  itemsGrid.classList.remove('expanded-menu')
  sideNav.classList.remove('expanded-menu')
}

const initiallyFocusHeaderElement = () => {
  const currentElement = headerNav.querySelector('.current')
  currentElement.focus(); 
}

const enterInnerMenu = () => {
  mainContainer.classList.remove('initial')
  Array.from(gridItems).forEach((gridItem) => gridItem.setAttribute('tabindex', '0'))
  focusLastGridItem()
}

const exitInnerMenu = () => {
  mainContainer.classList.add('initial')
  Array.from(gridItems).forEach((gridItem) => gridItem.removeAttribute('tabindex'))
  sideNavIconsCont.querySelector('.current').focus()
}

function focusLastGridItem(){
  if(!lastFocusedItem){
    gridItems[0].focus()
  }else{
    lastFocusedItem.focus()
  }
}

Array.from(sideNavIconsCont.children).forEach((iconBtn) => {
  iconBtn.addEventListener('click', (event) => {
    switchCurrentBtn(event)
    enterInnerMenu();
  })
})

Array.from(headerNav.children).forEach((navLink) => {
  navLink.addEventListener('click', (event) => {
    switchCurrentBtn(event)
    exitInnerMenu()
  })
})

Array.from(gridItems).forEach((gridItem) => {
  gridItem.addEventListener('mouseenter', (event) => {
    if(mainContainer.classList.contains('initial')) return
    event.currentTarget.focus()
    lastFocusedItem = event.currentTarget
  })
})

itemsGrid.addEventListener('click', enterInnerMenu)
sideNavIconsCont.addEventListener('mouseenter', expandSideNav)
sideNavIconsCont.addEventListener('focusin', expandSideNav)
sideNav.addEventListener('mouseleave', collapseSideNav)
sideNav.addEventListener('focusout', collapseSideNav)   

document.addEventListener("DOMContentLoaded", () => {
  initiallyFocusHeaderElement();
});