// Generate Random Coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
function createMap(){
    // Center map on the US
    var map = L.map('map').setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Generate 3 sets of random coordinates
    const markers = [
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
    ];

    // Function to fetch and display locality information for each marker
    markers.forEach((coords, index) => {
        const marker = L.marker([coords.lat, coords.lng]).addTo(map);
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lng}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality || "Unknown locality";
                // Add locality text below the map
                const markerText = document.createElement('p');
                markerText.textContent = `Marker ${index + 1}: (${coords.lat}, ${coords.lng}) - Locality: ${locality}`;
                document.body.appendChild(markerText);
            })
            .catch(error => console.error('Error fetching locality:', error));
    });
}

window.onload = createMap;
