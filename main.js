const productsList = document.querySelector('.list-group-flush');
const addItemForm = document.querySelector('.add-form');
const updateItemForm = document.querySelector('.update-form');
const titleInput = document.querySelector('#exampleInputEmail5');
const descriptionInput = document.querySelector('#exampleInputEmail6');
const priceInput = document.querySelector('#exampleInputEmail7');
const sizeInput = document.querySelector('#exampleInputEmail8');
const url = 'http://localhost:3000/products';
let output = '';
let currentProduct;
let information = {
    title: "",
    description: "",
    price: "",
    size: ""
};


const fetchItems = (items) => {
    items.forEach(item => {

        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', item.id);
        listItem.classList.add('list-group-item');


        const spanTitleElement = document.createElement('span');
        spanTitleElement.className = 'item-title mr-1';
        const spanTitleText = document.createTextNode(item.title);
        spanTitleElement.appendChild(spanTitleText);

        listItem.appendChild(spanTitleElement);

        const spanDescriptionElement = document.createElement('span');
        spanDescriptionElement.className = 'item-description mr-1';
        const spanDescriptionText = document.createTextNode(item.description);
        spanDescriptionElement.appendChild(spanDescriptionText);

        listItem.appendChild(spanDescriptionElement);

        const spanPriceElement = document.createElement('span');
        spanPriceElement.className = 'item-price mr-1';
        const spanPriceText = document.createTextNode(item.price);
        spanPriceElement.appendChild(spanPriceText);

        listItem.appendChild(spanPriceElement);

        const spanSizeElement = document.createElement('span');
        spanSizeElement.className = 'item-size mr-1';
        const spanSizeText = document.createTextNode(item.size);
        spanSizeElement.appendChild(spanSizeText);

        listItem.appendChild(spanSizeElement);

        const editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('data-id', item.id);
        editButton.classList.add('btn', 'btn-primary', 'ml-2');
        const editButtonText = document.createTextNode('Edit');
        editButton.appendChild(editButtonText);

        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('data-id', item.id);
        deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
        const deleteButtonText = document.createTextNode('Delete');
        deleteButton.appendChild(deleteButtonText);

        listItem.appendChild(deleteButton);
        productsList.appendChild(listItem);

        editButton.addEventListener('click', (e) => {

                titleInput.value = item.title;
                console.log(titleInput.value);
                descriptionInput.value = item.description;
                priceInput.value = item.price;
                sizeInput.value = item.size;
                currentProduct = item;
            }
        )
        deleteButton.addEventListener('click', (e) => {
            currentProduct = item;
            deleteData(item.id);
        })
    });
};


//inlocuit then uri cu async await
//GET METHOD
async function getMethod() {
    let response = await fetch(url, {
        method: 'GET'
    });
    let data = await response.json();
    return data;
}

async function updateMethod() {
    let response = await fetch(`${url}/${currentProduct.id}`, {
        method: 'PUT',
        headers:
            {
                'Content-type': 'application/json; charset=UTF-8'
            },
        body: JSON.stringify({
            title: titleInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            size: sizeInput.value
        })
    })

    let data = response.json();
    return data;
}

async function postMethod() {
    let response = await fetch(url, {
        method: 'POST',
        headers:
            {
                'Content-type': 'application/json; charset=UTF-8'
            },
        body: JSON.stringify(information)
    })
    const data = response.json();
    return data;
}

async function deleteMethod(url, id) {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    let data = await response.json();
    return data;
}


const updateProductSubmit = (e) => {
    e.preventDefault();
    updateMethod()
        .then(() => {
                console.log("data changed");
                getMethod()
                    .then((data) => {
                        fetchItems(data);
                    })
                    .catch((error) =>
                        console.log(error)
                    );

                e.target.reset();
            }
        )
};

const loadingData = (event) => {
    let inputData = event.target.value;
    const key = event.target.dataset.toggle;
    information[key] = inputData;
}

const addProduct = (e) => {
    e.preventDefault();
    postMethod()
        .then(data => {
            const dataArray = [];
            dataArray.push(data);
            fetchItems(dataArray);
        })
};

const deleteData = (id) => {
    deleteMethod(url, id)
        .then(() => {
            console.log("Data deleted");
            const productToBeRemoved = document.querySelector(`.list-group-item[data-id='${currentProduct.id}']`);
            productToBeRemoved.remove();
        })
}
getMethod()
    .then((data) => {
        fetchItems(data);
    })
    .catch((error) =>
        console.log(error)
    );
