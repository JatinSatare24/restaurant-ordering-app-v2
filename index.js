import { menuArray } from './data.js'

const itemsContainer = document.getElementById('itemsBox')
const checkoutDetails = document.getElementById('checkoutDetails')
let totalPrice = 0
let ordersArr = []


document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        addItems(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItems(e.target.dataset.remove)
    } else if (e.target.id === 'completeOrder') {
        document.getElementById('paymentCard').style.display = 'flex'
    } else if (e.target.id === 'pay') {
        pay()

    }
})

function pay() {
    document.getElementById('paymentCard').style.display = 'none'
    document.getElementById('checkoutContainer').style.display = 'none'
    document.getElementById('acknowledge').style.display = 'flex'

    const displayName = document.getElementById('name').value

    document.getElementById('acknowledge').innerHTML = `<p>Thanks, ${displayName}! Your order is on its way!</p>`

}

function addItems(itemId) {


    const targetObj = menuArray.find(function (singleItem) {
        return singleItem.id === Number(itemId)
    })

    ordersArr.push(targetObj)

    checkoutDetails.innerHTML = ''
    totalPrice = 0

    ordersArr.forEach(function (item) {
        totalPrice += item.price;
        checkoutDetails.innerHTML += `
                <div id="orderedItems">
                    <h1>${item.name}</h1>
                    <span><i class="fa fa-minus" aria-hidden="true" data-remove=${item.id}></i></span>
                    <h2>$${item.price}</h2>
                </div>`;
    });


    document.getElementById('price').innerText = `$${totalPrice}`
    document.getElementById('checkoutContainer').style.display = 'flex'

}


function removeItems(itemId) {
    const indexToRemove = ordersArr.findIndex(item => item.id === itemId)
    ordersArr.splice(indexToRemove, 1)

    checkoutDetails.innerHTML = ''
    totalPrice = 0

    ordersArr.forEach(function (item) {
        totalPrice += item.price;
        checkoutDetails.innerHTML += `
                <div id="orderedItems">
                    <h1>${item.name}</h1>
                    <span><i class="fa fa-minus" aria-hidden="true" data-remove=${item.id}></i></span>
                    <h2>$${item.price}</h2>
                </div>`;
    });

    document.getElementById('price').innerText = `$${totalPrice}`
    document.getElementById('checkoutContainer').style.display = 'flex'

}

function getItemsHtml() {
    const itemsHtml = menuArray.map(function (item) {
        return ` <section class="item">

                    <div class="item-start">
                        <p>${item.emoji}</p>
                    </div>

                     <div class="item-mid">
                        <h1>${item.name}</h1>
                        <p>${item.ingredients.join(', ')}</p>
                        <h2>$${item.price}</h2>
                    </div>

                     <div class="item-end">
                        <span class='addItemToCart'><i class="fa fa-plus fa-2x" aria-hidden="true" data-add = ${item.id}></i></span>
                    </div>
                
            </section>`
    })

    return itemsHtml
}


function render() {
    itemsContainer.innerHTML = getItemsHtml()
}

render()





