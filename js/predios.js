function addCultivo_raps() {

    var url = 'datos/cultivo_raps.geojson';

    map.addSource('cultivo_raps', { type: 'geojson', data: url});

         map.addLayer({
    'id': 'cultivo_inicial',
    'type': 'fill',
    'source': 'cultivo_raps',
    'layout': {
    },
    'paint': {
    'fill-color': '#ff0000',
    }
    });

} 
async function filterCultivo_raps(value) {
    var url = 'datos/cultivo_raps.geojson';
    
    var resultado= await fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        //console.log('Respuesta', data);
        return data;
    })
    console.log(resultado.features.length)
    var filtrado
if(value!=''){
    filtrado=resultado.features.filter(function(item){
    
        return item.properties.COMUNA.toLowerCase()==value.toLowerCase()
    })
}else{
    filtrado=resultado.features
}
console.log("filtrado:",resultado.features )
resultado.features=filtrado
    map.addSource('filtrocomuna', { type: 'geojson', data: resultado});

         map.addLayer({
    'id': 'cultivo_filtrado',
    'type': 'fill',
    'source': 'filtrocomuna',
    'layout': {
    },
    'paint': {
    'fill-color': '#ff0000',
    }
    });
map.removeLayer('cultivo_inicial')
} 
