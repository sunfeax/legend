fetch('../data/reviews.json')
  .then(res => res.json())
  .then(reviews => {
    const reviewSwiperWrapper = document.querySelector('.review-swiper .swiper-wrapper')
    const maxLength = 250

    reviews.forEach(review => {
      const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars)

      const isLong = review.text.length > maxLength
      const shortText = isLong ? review.text.slice(0, maxLength) + '...' : review.text

      const slide = document.createElement('div')
      slide.classList.add('swiper-slide')
      slide.innerHTML = `
        <div class="review-content">
          <div class="review-name">${review.name}</div>
          <div class="review-stars">${stars}</div>
          <div class="review-text">${shortText}</div>
          ${isLong ? `<div class="read-more-btn" data-full="${encodeURIComponent(review.text)}">Leer más</div>` : ''}
          <div class="review-date">${review.date}</div>
          ${review.isNew ? '<div class="review-new">Nuevo</div>' : ''}
        </div>
      `

      reviewSwiperWrapper.appendChild(slide)
    });

    new Swiper('.review-swiper', {
      loop: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.review-swiper .swiper-button-next',
        prevEl: '.review-swiper .swiper-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 20,
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more-btn')) {
        const fullText = decodeURIComponent(e.target.dataset.full)
        openModal(fullText)
      }
    })
  })

  .catch(err => {
    console.error('Ошибка при загрузке отзывов:', err)
  })



const modalOverlay = document.getElementById('modalOverlay')

function openModal(fullText) {
  const modalContent = document.getElementById('modalContent')
  modalContent.textContent = fullText
  modalOverlay.style.display = 'flex'
}

function closeModal() {
  modalOverlay.style.display = 'none'
}

modalOverlay.addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal()
  }
})
