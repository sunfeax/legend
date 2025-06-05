const scrollTopBtn = document.querySelector('.scroll-top-btn')

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('active', window.scrollY > 300)
})

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})