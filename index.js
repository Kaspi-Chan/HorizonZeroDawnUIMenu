const rootElement = document.getElementsByTagName('html')[0];

function resize() {
    const windowWidth = window.innerWidth;
    const scaleFactorX = windowWidth / 800;

    const fontSize = 10 * scaleFactorX;

    rootElement.style.fontSize = `${fontSize}px`;
}

resize();

window.addEventListener('resize', resize);