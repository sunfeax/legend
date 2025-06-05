document.querySelectorAll('.menu-toggle').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault()

        const submenu = this.nextElementSibling
        const isOpen = submenu.classList.contains('open')

        if (submenu && submenu.classList.contains('collapsible')) {
            if (isOpen) {
                submenu.style.maxHeight = null
                submenu.classList.remove('open')
                return
            } else {
                submenu.style.maxHeight = submenu.scrollHeight + "px"
                submenu.classList.add('open')
            }
        }
    })
})