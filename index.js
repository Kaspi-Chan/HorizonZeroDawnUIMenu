const rootElement = document.getElementsByTagName('html')[0];

function resize() {
  const windowWidth = window.innerWidth;
  const scaleFactorX = windowWidth / 800;

  const fontSize = 10 * scaleFactorX;

  rootElement.style.fontSize = `${fontSize}px`;
}

resize();

window.addEventListener('resize', resize);


const sideNav = document.querySelector('.side-nav');
const sideNavIconsCont = document.querySelector('.side-nav-links')
const itemDesc = document.querySelector('.items-desc')
const itemsGrid = document.querySelector('.items-grid')

const getLongestLiElementWidth = (elementsArr) => {
  const longestLink = elementsArr.reduce((acc, current) => {
    return acc.offsetWidth > current.offsetWidth ? acc : current
  }, elementsArr[0].offsetWidth)

  return longestLink.offsetWidth;
}

sideNavIconsCont.addEventListener('mouseenter', () => {
  const menuLinks = Array.from(sideNavIconsCont.querySelectorAll('.side-nav-link > span'))
  const longestElementWidth = getLongestLiElementWidth(menuLinks)

  sideNav.style.paddingRight = `calc(5rem + ${Math.ceil(longestElementWidth / 2)}px)`;
  sideNav.classList.add('expanded-menu')
  itemDesc.classList.add('expanded-menu')
  itemsGrid.classList.add('expanded-menu')
})

sideNav.addEventListener('mouseleave', () => {
  sideNav.style.paddingRight = '5rem';
  itemDesc.classList.remove('expanded-menu')
  itemsGrid.classList.remove('expanded-menu')
  sideNav.classList.remove('expanded-menu')
})

