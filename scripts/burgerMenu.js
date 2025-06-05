const hamMenu = document.getElementById('ham-menu')
const offScreenMenu = document.getElementById('off-screen-menu')

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active')
    offScreenMenu.classList.toggle('active')
})

function closeMenu() {
    hamMenu.classList.remove('active')
    offScreenMenu.classList.remove('active')
}

document.addEventListener('click', function (e) {
    if (
        !offScreenMenu.contains(e.target) &&
        !hamMenu.contains(e.target)
    ) {
        closeMenu()
    }
})