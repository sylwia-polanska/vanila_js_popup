const jsonMockedData = {
  "product": {
    "id": 1,
    "name": "Konsola MICROSOFT XBOX ONE S 500GB + FIFA 19",
    "code": "10000053",
    "icon": "\/data\/gfx\/icons\/large\/7\/0\/7.jpg",
    "link": "\/pl\/products\/xbox-4-slim-7.html",
    "product_type": "product_item"
  },
  "sizes": {
    "unit": "szt.",
    "unit_single": "szt.",
    "unit_plural": "szt.",
    "unit_fraction": "sztuka",
    "unit_precision": "0",
    "unit_sellby": 1,
    "items": {
      "U": {
        "type": "U",
        "name": "Ram 32 GB",
        "amount": 1,
        "status": "Produkt dostępny",
        "price": 125.00
      },
      "V": {
        "type": "V",
        "name": "Ram 64 GB",
        "amount": 12,
        "status": "Produkt dostępny",
        "price": 159.00
      },
      "W": {
        "type": "W",
        "name": "Ram 128 GB",
        "amount": 0,
        "status": "Produkt niedostępny",
        "price": 199.00
      }
    }
  },
  "multiversions": [{
    "id": "1",
    "name": "Wariant",
    "items": {
      "1-1": {
        "enabled": true,
        "selected": true,
        "products": [{
          "product_id": 7,
          "version_priority": "1",
          "url": "\/pl\/products\/xbox-7.html",
          "price_difference": "0.00"
        }],
        "values": {
          "61": {
            "id": 61,
            "name": "Srebrny"
          }
        },
        "values_id": "61"
      },
      "1-2": {
        "enabled": true,
        "products": [{
          "product_id": 8,
          "version_priority": "2",
          "url": "\/pl\/products\/xbox-4-slim-8.html",
          "price_difference": "-5.00"
        }],
        "values": {
          "60": {
            "id": 60,
            "name": "Czarny"
          }
        },
        "values_id": "60"
      },
      "1-3": {
        "enabled": true,
        "products": [{
          "product_id": 27,
          "version_priority": "2",
          "url": "\/pl\/products\/xbox-4-slim-27.html",
          "price_difference": "-10.00"
        }],
        "values": {
          "59": {
            "id": 59,
            "name": "Biały"
          }
        },
        "values_id": "59"
      }
    }
  }]

}

function openPopup() {
  togglePopup()
  displayProduct()
}

function togglePopup() {
  let displayChange = document.getElementById('productPopup')
  displayChange.classList.toggle('visible')
  let overlay = document.getElementById('popupOverlay')
  overlay.classList.toggle('visible')
}

function onClose() {
  togglePopup()
}

const images = [
  'assets/images/product/1.png',
  'assets/images/product/2.jpg',
  'assets/images/product/3.jpg',
  'assets/images/product/4.jpg'
]

let currentPhotoIndex = 0
let selectedProductSizeAmount = jsonMockedData.sizes.items.U.amount
let productQuantity = 1

function prevPhoto() {
  if (currentPhotoIndex >= 1) {
    const productPhoto = document.getElementById('photo')
    productPhoto.src = images[--currentPhotoIndex]
  }
}

function nextPhoto() {
  if (currentPhotoIndex < images.length - 1) {
    const productPhoto = document.getElementById('photo')
    productPhoto.src = images[++currentPhotoIndex]
  }
}

function displayProduct() {
  let productNameElement = document.getElementById('productName')
  productNameElement.innerHTML = jsonMockedData.product.name

  let productPriceElement = document.getElementById('productPrice')
  productPriceElement.innerHTML = jsonMockedData.sizes.items.U.price + ' zł'

  fillColorVariants()

  displayAvailability()

  changeSizeDependencies(jsonMockedData.sizes.items.U.name)
}

function onChangeSize(event) {
  const buttons = document.querySelectorAll('#productSizeVariants button')
  buttons.forEach(function (button) {
    button.classList.remove('active')
  })
  const clickedButton = event.target
  clickedButton.classList.add('active')
  changeSizeDependencies(clickedButton.textContent)
}

function fillColorVariants() {
  let colorVariant = document.getElementById('colorVariant')
  let colors = []
  colors.push(jsonMockedData.multiversions[0].items['1-1'].values[61].name)
  colors.push(jsonMockedData.multiversions[0].items['1-2'].values[60].name)
  colors.push(jsonMockedData.multiversions[0].items['1-3'].values[59].name)

  colorVariant.innerHTML = ''
  colors.forEach(color => {
    colorVariant.innerHTML += `<option>${color}</option>`
  })
}

function displayAvailability() {
  let availabilityElement = document.getElementById('availability')
  let availabilityDefaultStatus = jsonMockedData.sizes.items.U.status
  availabilityElement.innerHTML = availabilityDefaultStatus
  addAvailabilityIcon(availabilityDefaultStatus)
}

function changeSizeDependencies(sizeName) {
  let productPriceElement = document.getElementById('productPrice')
  let productAvailabilityElement = document.getElementById('availability')
  let sizes = jsonMockedData.sizes.items
  for (var key in sizes) {
    if (sizes.hasOwnProperty(key)) {

      let size = sizes[key]
      if(size.name === sizeName){
        productPriceElement.innerHTML = size.price + ' zł'
        productAvailabilityElement.innerHTML = size.status
        selectedProductSizeAmount = size.amount
        addAvailabilityIcon(size.status)
        if(size.status === 'Produkt dostępny'){
          document.getElementById('shipment').classList.add('visibleInLine')
        } else{
          document.getElementById('shipment').classList.remove('visibleInLine')
        }
      }
    }
  }
}

function decreaseQuantity(){
  if (productQuantity > 1){
    document.getElementById('quantity').innerHTML = --productQuantity
  }
}

function increaseQuantity(){
  if (productQuantity < selectedProductSizeAmount){
    document.getElementById('quantity').innerHTML = ++productQuantity
  }
}

function addAvailabilityIcon(statusText){
  let availabilityElement = document.getElementById('availability')
  let img = document.createElement("img")
  if (statusText === 'Produkt dostępny') {
    img.src = 'assets/images/icons/available.svg'
  } else {
    img.src = 'assets/images/icons/not-available.svg'
  }
  availabilityElement.prepend(img)
}