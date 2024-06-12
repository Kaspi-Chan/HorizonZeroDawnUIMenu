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

console.log(sideNav)
sideNavIconsCont.addEventListener('mouseenter', () => {
  sideNav.classList.add('expanded-menu')
  itemDesc.classList.add('expanded-menu')
  itemsGrid.classList.add('expanded-menu')
})
sideNav.addEventListener('mouseleave', () => {
  itemDesc.classList.remove('expanded-menu')
  itemsGrid.classList.remove('expanded-menu')
  sideNav.classList.remove('expanded-menu')
})