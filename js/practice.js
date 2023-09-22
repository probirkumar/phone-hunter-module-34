const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;

    // display show only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhoneFound = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }

    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <h3>Brand : ${phone.brand}</h3>
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <p>Slug : ${phone.slug}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" role="button">Search Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);
    
};

const processSearch = dataLimit => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start spinner
    processSearch(10);
});

// Enter Key Press Event Handler
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        // code for enter
        processSearch(10);
    }
});

// toggle Spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h5>${phone.name}</h5>
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'no Release date'}</p>
        <p>Memory : ${phone.mainFeatures.memory}</p>
        <p>MainFeatures : ${phone.mainFeatures.sensors[0]}</p>
    `;
}

// loadPhones('apple');