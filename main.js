const productsList = document.querySelector('.list-group-flush');
const addItemForm = document.querySelector('.add-form');
const updateItemForm = document.querySelector('.update-form');
const titleInput = document.querySelector('#exampleInputEmail5');
const descriptionInput = document.querySelector('#exampleInputEmail6');
const priceInput = document.querySelector('#exampleInputEmail7');
const sizeInput = document.querySelector('#exampleInputEmail8');
const url = 'http://localhost:3000/products';
let output = '';


const fetchItems = (items) => {
    items.forEach(item => {
        output += `<li class="list-group-item"><span class="item-id">${item.id}</span> <span class="item-title">${item.title}</span> <span class="item-description">${item.description}</span> <span class="item-price">${item.price}</span> <span class="item-size">${item.size} </span><button type="button" id="edit-post" data-id="${item.id}" class="btn btn-primary ml-2"> Edit</button> <button type="button" id="delete-post" class="btn btn-danger">Delete</button></li>`;
    });
    productsList.innerHTML = output;
};

//GET METHOD
fetch(url)
    .then(response => response.json())
    .then((data) => {
        fetchItems(data);
    })
    .catch((error) => {
        console.log(error);
    })

const information = {
    title: "",
    description: "",
    price: "",
    size: ""
};

let informationArray = [];


const loadingData = (event) => {
    let inputData = event.target.value;
    const key = event.target.dataset.toggle;
    information[key] = inputData;
    informationArray.push(inputData);
}


addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers:
            {
                'Content-type': 'application/json; charset=UTF-8'
            },
        body: JSON.stringify({
            title: informationArray[0],
            description: informationArray[1],
            price: informationArray[2],
            size: informationArray[3]
        })
    })
        .then(resp => resp.json())
        .then(data => {
            const dataArray = [];
            dataArray.push(data);
            fetchItems(dataArray);
        })
    informationArray = [];
})


const deleteData = (id, url) => {
    return fetch(`${url}/${id}`, {
        method: 'delete'
    }).then(response =>
        response.json().then(json => {
            return json;
        })
            .then(() => location.reload())
    );
}
productsList.addEventListener('click', (e) => {
    e.preventDefault();
    let id = e.target.parentElement.querySelector('.item-id').textContent;
    let deleteButtonPressed = e.target.id === 'delete-post';
    let editButtonPressed = e.target.id === 'edit-post';

    //Delete request
    if (deleteButtonPressed) {
        deleteData(id, url);
    }
    if (editButtonPressed) {
        const parent = e.target.parentElement;
        console.log(e);
        console.log(parent);

        // for(i=0;i<5;i++){
        //     infoArray.push(textContent[i]);
        // }

        const title = parent.querySelector('.item-title').textContent;
        const description = parent.querySelector('.item-description').textContent;
        const price = parent.querySelector('.item-price').innerText;
        const size = parent.querySelector('.item-size').textContent;
        //
        //
        titleInput.value = title;
        descriptionInput.value = description;
        priceInput.value = price;
        sizeInput.value = size;

    }
    updateItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
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
            .then(resp => resp.json())
            .then(() => location.reload())

    })

});