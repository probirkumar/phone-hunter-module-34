const loadPhones = (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    // Display 10 Phone Only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // Display no Phones Found
    const noPhoneFound = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }
    // Display All Phones

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <h3>Brand: ${phone.brand}</h3>
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                    <p class="card-text">Slug: ${phone.slug}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // searching stop
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';
}

document.getElementById('btn-search').addEventListener('click', function () {
    // searching start
    processSearch(10);
});

// Enter Key press Event Handler
document.getElementById('search-field').addEventListener('keypress', function (event) {
    // console.log(e.key)
    if (event.key === 'Enter') {
        // code for enter
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
};

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    phoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release : ${phone.releaseDate ? phone.releaseDate : 'Release Date not Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'Storage not Found'}</p>
        <p>BlueTooth : ${phone.others ? phone.others.Bluetooth : 'not found'}</p>
    `;
}


loadPhones('apple');