let hoveredFeatureName = null;
mapboxgl.accessToken = 'pk.eyJ1IjoidGFvMTExIiwiYSI6ImNscmhwYnZiYzAxOGsybHFwNmpuejJ3c2MifQ.vLBBTCmtfm24TD5ltR4Tew';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-73.9350, 40.7300],
    zoom: 11
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search for Park by Name',
    countries: 'us',
    bbox: [-74.2591, 40.4774, -73.7004, 40.9176] // Optional: Add bounding box for New York City
});

map.addControl(geocoder, 'top-right');
geocoder.on('result', (e) => {
    map.flyTo({
        center: e.result.geometry.coordinates,
        zoom: 16
    });
});

// Add navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

function getYearFromSliderValue(sliderValue) {
    const years = [2000, 2005, 2010, 2015, 2020, 2025];
    return years[sliderValue];
}

function createColorAxis() {
    const colors = [
        { year: 1686, color: '#28a745' },  // Green
        { year: 2000, color: '#ff5733' },  // Red-Orange
        { year: 2005, color: '#ffc300' },  // Yellow
        { year: 2010, color: '#c70039' },  // Red
        { year: 2015, color: '#900c3f' },  // Maroon
        { year: 2020, color: '#581845' },  // Purple
        { year: 2025, color: '' }   // Blue
    ];

    const colorScaleDiv = document.getElementById('color-scale');
    const yearScaleDiv = document.getElementById('year-scale');

    colors.forEach((item) => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = item.color;
        colorScaleDiv.appendChild(colorDiv);

        const yearSpan = document.createElement('span');
        yearSpan.textContent = item.year;
        yearScaleDiv.appendChild(yearSpan);
    });
}



map.on('load', () => {
    map.addSource('polygons', {
        'type': 'geojson',
        'data': 'js/Updated_Parks_Properties.geojson'
    });
    map.addLayer({
        'id': 'polygons-fill',
        'type': 'fill',
        'source': 'polygons',
        'layout': {},
        'paint': { 
            'fill-color': [
                'step', ['number', ['get', 'year']],
                '#28a745', // Default color (Green for 0-1999)
                2000, '#ff5733', // Red-Orange for 2000-2003
                2005, '#ffc300', // Yellow for 2004-2007
                2010, '#c70039', // Red for 2008-2011
                2015, '#900c3f', // Maroon for 2012-2015
                2020, '#581845', // Purple for 2016-2019
                2025, '#007bff'  // Blue for 2020 onwards
            ],
            'fill-opacity': 0.7
        }
        
    });

    map.addLayer({
        'id': 'polygons-fill-hover',
        'type': 'fill',
        'source': 'polygons',
        'layout': {},
        'paint': {
            'fill-color': '#20229D',
            'fill-opacity': 0.9
        },
        'filter': ['==', 'signname', '']
    });

    // Update park visibility based on slider's initial position
    updateParkVisibility(getYearFromSliderValue(document.getElementById('slider').value));

    // Start the timeline animation
    toggleAnimation();

    // Create the color axis
    createColorAxis();
});

// Update year on slider change
document.getElementById('slider').addEventListener('input', (e) => {
    const year = getYearFromSliderValue(parseInt(e.target.value));
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);
});

// Hover event to display park details
map.on('mouseenter', 'polygons-fill', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const parkName = e.features[0].properties.signname;
    document.getElementById('park-name').textContent = parkName;

    const propertyType = e.features[0].properties.typegategory;
    document.getElementById('Property-Type').textContent = propertyType;

    const acres = e.features[0].properties.acres;
    document.getElementById('acres-value').textContent = acres;

    const url = e.features[0].properties.URL;
    const urlDiv = document.getElementById('URL-2');
    urlDiv.href = url;
    urlDiv.textContent = `Visit ${parkName} Website`;
    urlDiv.style.color = '#E67DBA';

    hoveredFeatureName = parkName;
    map.setFilter('polygons-fill-hover', ['==', 'signname', hoveredFeatureName]);
});

map.on('mouseleave', 'polygons-fill', () => {
    map.getCanvas().style.cursor = '';

    if (hoveredFeatureName !== null) {
        map.setFilter('polygons-fill-hover', ['==', 'signname', '']);
        hoveredFeatureName = null;
    }
});

// Update park visibility based on the selected year
function updateParkVisibility(year) {
    map.setFilter('polygons-fill', ['<', 'year', year]);
    if (hoveredFeatureName !== null) {
        map.setFilter('polygons-fill-hover', ['all', ['<', 'year', year], ['==', 'signname', hoveredFeatureName]]);
    } else {
        map.setFilter('polygons-fill-hover', ['all', ['<', 'year', year], ['==', 'signname', '']]);
    }
}

// Slider animation
let animationInterval;
let isAnimating = false;
let isFlytoAnimating = false;
let popup = new mapboxgl.Popup();

function animateSlider() {
    if (!isAnimating) return;

    let slider = document.getElementById('slider');
    let sliderValue = parseInt(slider.value);

    if (sliderValue < parseInt(slider.max)) {
        sliderValue++;
    } else {
        sliderValue = parseInt(slider.min);
    }

    slider.value = sliderValue;
    const year = getYearFromSliderValue(slider.value);
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);

    if (isFlytoAnimating && parkData[year]) {
        const park = parkData[year];
        map.flyTo({ center: [park.lng, park.lat], zoom: 12.8 });
        popup.setLngLat([park.lng, park.lat])
            .setHTML(`
                <div style="color: #F9A094;">
                    <h2>${park.name}</h2>
                    <p>Year Established: ${park.year}</p>
                    <p>${park.des}</p>
                    ${park.img ? `<img src="${park.img}" alt="img" style="width: 200px; height: auto;">` : ''}
                </div>
            `).addTo(map);
    }

    animationInterval = setTimeout(animateSlider, 1600);
}

// Update year and park visibility
function updateYearAndParkVisibility() {
    let slider = document.getElementById('slider');
    const year = getYearFromSliderValue(slider.value);
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);
}

document.getElementById('slider').addEventListener('input', (e) => {
    updateYearAndParkVisibility();

    if (isAnimating) {
        clearTimeout(animationInterval);
        animateSlider();
    }
});

function toggleAnimation() {
    isAnimating = !isAnimating;
    const animationButton = document.getElementById('animationButton');

    if (isAnimating) {
        animateSlider();
        animationButton.textContent = 'Stop';
    } else {
        clearTimeout(animationInterval);
        animationButton.textContent = 'Start';
    }
}
function flyToAnimation() {
    //开始时isFlytoAnimating为false
    //点击按钮触发这个函数isFlytoAnimating为ture
    isFlytoAnimating = !isFlytoAnimating;
    const flytoAnimationButton = document.getElementById('flytoAnimationButton');

    //只有当时间轴变化isAnimating=true时点击FlyTo Start 按钮才会变成stop.
    //时间轴stop时，点击FlyTo Start 按钮没有效果
    if (isFlytoAnimating && isAnimating) {

        flytoAnimationButton.textContent = 'FlyTo Stop';
    } 
    //修复了点击时间轴stop后，点击flyto start后再点击时间轴start后flyto自动开启的bug
    else if(isAnimating===false&& isFlytoAnimating===true){
        isFlytoAnimating = false;
        flytoAnimationButton.textContent = 'FlyTo Start';
    }
    else {

        flytoAnimationButton.textContent = 'FlyTo Start';
        //点了stop之后，把地图缩小
        map.flyTo({
            center: [-73.9350, 40.7300],
            zoom: 11
        });
        //关闭popup
        popup.remove();
    }
}


const parkData = {
    2005: {
        name: "Brooklyn Bridge Park",
        lat: 40.692343292350614,
        lng: -74.000326329254023,
        img: "https://www.nycgovparks.org/photo_gallery/full_size/23697.jpg",
        year: 2001,
        des: "This treasure of a park offers breathtaking views of Lower Manhattan’s panoramic skyline and the New York Harbor.",
        acres: 85,
        type: "Recreational",
        url: "https://www.brooklynbridgepark.org/"
    },
    2010: {
        name: "Bushwick Inlet Park",
        lat: 40.72529522383293,
        lng: -73.961676276079459,
        year: 2007,
        des: "Bushwick Inlet Park is the centerpiece of the Greenpoint-Williamsburg Waterfront.",
        img: "https://www.nycgovparks.org/photo_gallery/full_size/24722.jpg",
        acres: 30,
        type: "Waterfront",
        url: "https://www.nycgovparks.org/parks/bushwick-inlet-park"
    },
    2015: {
        name: "North 5th Street Pier and Park",
        lat: 40.720819938170763,
        lng: -73.964076507013516,
        year: 2008,
        img: "https://www.nycgovparks.org/photo_gallery/full_size/24466.jpg",
        des: "With spectacular views of the East River, and easy access to the North Williamsburg NYC Ferry stop, this park is a popular destination for photo seekers.",
        acres: 5,
        type: "Pier",
        url: "https://www.nycgovparks.org/parks/north-5th-street-pier-and-park"
    },
    2020: {
        name: "Jacob's Ladder Playground",
        lat: 40.704965008097162,
        lng: -73.9666338343863,
        img: "https://www.nycgovparks.org/photo_gallery/full_size/18984.jpg",
        year: 2012,
        des: "Parks acquired two parcels in the target area and developed plans for two different recreation facilities, one for active play and one for passive enjoyment.",
        acres: 2,
        type: "Playground",
        url: "https://www.nycgovparks.org/parks/jacobs-ladder-playground"
    },
    2025: {
        name: "Greenpoint Landing",
        lat: 40.737762120042802,
        lng: -73.958522398745188,
        year: 2018,
        img: "https://greenpointlanding.com/wp-content/uploads/2021/02/201105_LR_2BS_Exteriors_0001@2x.jpg",
        des: "Located in Greenpoint, one of Brooklyn’s most vibrant neighborhoods.",
        acres: 3,
        type: "Landing",
        url: "https://greenpointlanding.com/"
    }
};
