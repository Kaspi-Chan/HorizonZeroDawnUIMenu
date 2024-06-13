const mainContainer = document.querySelector('.main-content');
const sideNav = document.querySelector('.side-nav');
const sideNavIconsCont = document.querySelector('.side-nav-links')
const itemDesc = document.querySelector('.items-desc')
const itemsGrid = document.querySelector('.items-grid')
const headerNav = document.querySelector('.nav-links')

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

const initiallyFocusMenuElement = () => {
  const currentElement = headerNav.querySelector('.current')
  currentElement.focus(); 
}

const enterInnerMenu = () => {
  mainContainer.classList.remove('initial')
}

Array.from(sideNavIconsCont.children).forEach((iconBtn) => {
  iconBtn.addEventListener('click', (event) => {
    switchCurrentBtn(event)
    enterInnerMenu();
  })
})

Array.from(headerNav.children).forEach((iconBtn) => {
  iconBtn.addEventListener('click', switchCurrentBtn)
})

sideNavIconsCont.addEventListener('mouseenter', expandSideNav)
sideNavIconsCont.addEventListener('focusin', expandSideNav)
sideNav.addEventListener('mouseleave', collapseSideNav)
sideNav.addEventListener('focusout', collapseSideNav)   

interactionManager.keyboard.on({
  keys: ['Enter'],
  callback: (event) => {
    switchCurrentBtn(event) 
    if(event.target.parentElement.classList.contains('side-nav-links')) enterInnerMenu();
  },
  type: ['press'],
})

interactionManager.keyboard.on({
  keys: ['F'],
  callback: (event) => {
    switchCurrentBtn(event) 
    if(event.target.parentElement.classList.contains('side-nav-links')) enterInnerMenu();
  },
  type: ['press'],
})

document.addEventListener("DOMContentLoaded", () => {
  initiallyFocusMenuElement();
});