// NASA Image and Video Library API URL
const NASA_API_URL = 'https://images-api.nasa.gov/search';

// Function to handle the search
function searchTerm() {
    const searchQuery = document.getElementById('search-bar').value.trim().toLowerCase();

    if (!searchQuery) {
        alert('Please enter a space term!');
        return;
    }

    // Fetch data from NASA API
    fetch(`${NASA_API_URL}?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
            load3DModel(searchQuery); // Load the corresponding 3D model
        })
        .catch(error => {
            console.error('Error fetching data from NASA API:', error);
            document.getElementById('result-container').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}

// Function to display NASA API search results
function displayResults(data) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous results

    const items = data.collection.items;

    if (items.length === 0) {
        resultContainer.innerHTML = '<p>No results found for your search term.</p>';
        return;
    }

    // Display the first 5 results
    items.slice(0, 5).forEach(item => {
        const title = item.data[0].title || 'No title available';
        const description = item.data[0].description || 'No description available';
        const image = item.links && item.links[0] ? item.links[0].href : '';

        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        resultItem.innerHTML = `
            <h3>${title}</h3>
            <img src="${image}" alt="${title}" style="max-width:300px; height:auto;">
            <p>${description}</p>
        `;

        resultContainer.appendChild(resultItem);
    });
}

// Function to load 3D models based on the search query
function load3DModel(searchQuery) {
    const modelViewer = document.getElementById('planet-viewer');

    // Define URLs for 3D models of common space objects (planets, moons, etc.)
    const models = {
        'mars': 'https://example.com/models/mars.glb',
        'earth': 'https://example.com/models/earth.glb',
        'saturn': 'https://example.com/models/saturn.glb',
        // Add more models here...
    };

    if (models[searchQuery]) {
        modelViewer.src = models[searchQuery]; // Set the model source for the viewer
    } else {
        modelViewer.src = ''; // Clear the model if no matching term is found
        alert('No 3D model available for this term.');
    }
}
