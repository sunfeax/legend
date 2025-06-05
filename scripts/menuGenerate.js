const lang = 'es'

function createItemWithImg(item) {
    const name = item.translations[lang].name
    const description = item.translations[lang].description
    const price = item.price + ' €'
    const image = item.image

    const wrapper = document.createElement('div');
    wrapper.className = 'item-with-img';
    wrapper.innerHTML = `
        <div class="container-img">
            <a href="${image}">
                <img class="menu-img" src="${image}" alt="${name}">
            </a>
        </div>
        <div class="item-info flex-column">
            <div class="item-info-n-p">
                <span class="item-name">${name}</span>
                <span class="item-price">${price}</span>
            </div>
            <p class="item-description">${description}</p>
        </div>
    `
    return wrapper
}


function createSimpleItem(item) {
    const name = item.translations[lang].name
    const price = item.price + ' €'

    const wrapper = document.createElement('div');
    wrapper.className = 'item';
    wrapper.innerHTML = `
        <span class="item-name">${name}</span>
        <span class="item-price">${price}</span>
    `
    return wrapper
}


function createEspecialItem(item) {
    const name = item.translations[lang].name
    const desc = item.translations[lang].description
    const price1 = item.priceCopa !== undefined ? `${item.priceCopa} €` : '';
    const price2 = item.priceDecanter !== undefined ? `${item.priceDecanter} €` : '';
    const block = document.createElement('div')
    block.className = 'item'
    block.innerHTML = `
        <span class="item-name">${name}</span>
        <span class="item-price">${price1}</span>
        <span class="item-price">${price2}</span>
    `

    if (desc && desc.trim() !== '') {
        const p = document.createElement('p')
        p.className = 'item-description'
        p.textContent = desc
        return [block, p]
    }

    return [block]
}


function createTeBlock(data) {
    const tea = data.filter(i => i.category === 'te')
    const teEspecial = tea.filter(i => i.translations[lang].subsection === 'TÉ ESPECIAL');
    const teClasico = tea.filter(i => i.translations[lang].subsection === 'TÉ CLÁSICO');

    if (teEspecial.length > 0 || teClasico.length > 0) {
        const container = document.getElementById('te')
        if (!container) return
        const h4esp = document.createElement('h4')
        const h4cl = document.createElement('h4')

        h4esp.className = 'submenu-title'
        h4esp.textContent = teEspecial[0].translations[lang].subsection
        container.appendChild(h4esp)     

        teEspecial.forEach(item => {
            const blocks = createSimpleItem(item)
            container.appendChild(blocks)
        })
        
        h4cl.className = 'submenu-title'
        h4cl.textContent = teClasico[0].translations[lang].subsection
        container.appendChild(h4cl)
        teClasico.forEach(item => {
            const blocks = createSimpleItem(item)
            container.appendChild(blocks)
        })
        const p = document.createElement('p')
        p.className = 'item-description'
        p.textContent = teClasico[0].translations[lang].description
        container.appendChild(p)
    }
}


function createSmoothiesBlock(data) {
    const smoothiesExtra = data.filter(i => i.category === 'smoothies-extra')
    if (smoothiesExtra.length > 0) {
        const container = document.getElementById('smoothies-extra')
        const h4 = document.createElement('h4')
        h4.className = 'submenu-extra-title'
        h4.textContent = smoothiesExtra[0].translations[lang].subsection || ''
        container.appendChild(h4)                
        smoothiesExtra.forEach(item => {
            const blocks = createSimpleItem(item)
            container.appendChild(blocks)
        })
    }
}


function createHookahBlock(item) {
    const block = document.createElement('div')
    block.className = 'hookah-item'
    block.setAttribute('id', item.type)
    block.innerHTML = `
        <div class="hookah-image-container">
            <img src="${item.content}" alt="${item.translations[lang].name}">
        </div>
        <div class="hookah-info flex-column">
            <div class="hookah-name-price">
                <h3 class="hookah-item-name">${item.translations[lang].name}</h3>
                <span class="item-price">${item.price} €</span>
            </div>
            <p class="item-description">${item.translations[lang].description}</p>
        </div>
        `
    return [block]
}


fetch('../data/menu.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const category = item.category
            const container = document.getElementById(category)

            if (!container) {
                console.warn(`El contenidor con id='${category}' no se ha encontrado en HTML.`)
                return
            }

            if (category === 'smoothies-extra' || category === 'te') {
                return
            } else if (category === 'cocteles-especiales' || category === 'cocteles-especiales-temporada' || category === 'sangria' || category === 'cerveza') {
                const blocks = createEspecialItem(item)
                blocks.forEach(elem => container.appendChild(elem))
            } else if (category === 'cachimba') {
                const blocks = createHookahBlock(item)
                blocks.forEach(elem => container.appendChild(elem))
            } else {
                const element = item.image
                ? createItemWithImg(item)
                : createSimpleItem(item)
                container.appendChild(element)
            }
        })

        createSmoothiesBlock(data)
        createTeBlock(data)

    })

    .catch(err => {
        console.error('Error: ', err)
    })