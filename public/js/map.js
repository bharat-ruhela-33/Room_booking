


mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    // You can add layers to the predetermined slots within the Standard style basemap.
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 9,
});



  
const marker =new mapboxgl.Marker({ color:"red"})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        `<h4> </h4><p> Location will be provide after booling</p>`
    )
)

.addTo(map);


