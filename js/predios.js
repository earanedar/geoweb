function addCultivo_raps() {

    var url = 'datos/cultivo_raps.geojson';

    map.addSource('cultivo_raps', { type: 'geojson', data: url});

    map.addLayer({
        'id': 'cultivo_inicial',
        'type': 'line',
        'source': 'cultivo_raps',
        'layout': {
        },
        'paint': {
            'line-color': '#ff0000',
            'line-width': 2
        }
    });
}
async function filterCultivo_raps(value) {
    var url = 'datos/cultivo_raps.geojson';
  
    var resultado = await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
  
    var filtrado;
    if (value != '') {
      filtrado = resultado.features.filter(function (item) {
        return item.properties.COMUNA.toLowerCase() == value.toLowerCase();
      });
    } else {
      filtrado = resultado.features;
    }
  
    resultado = { type: 'FeatureCollection', features: filtrado };
  
    // Eliminar la fuente y la capa anterior antes de agregar la nueva capa filtrada
    if (map.getLayer('cultivo_filtrado')) {
      map.removeLayer('cultivo_filtrado');
    }
    
    if (map.getSource('filtrocomuna')) {
      map.removeSource('filtrocomuna');
    }
    
    map.addSource('filtrocomuna', { type: 'geojson', data: resultado });
    
    map.addLayer({
      id: 'cultivo_filtrado',
      type: 'fill',
      source: 'filtrocomuna',
      layout: {},
      paint: {
        'fill-color': '#ff0000',
      },
    });
    
     // Calcular cantidad de registros por comuna y actualizar la tabla
     var tabla = document.getElementById('tabla-cultivos');
     tabla.innerHTML = ''; // Limpiar tabla
     var cantidades = {};
     filtrado.forEach(function (filtrado) {
       var comuna = filtrado.properties.COMUNA;
       if (!cantidades[comuna]) {
         cantidades[comuna] = 0;
       }
       cantidades[comuna]++;
     });
     Object.keys(cantidades).forEach(function (comuna) {
       var row = tabla.insertRow();
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       cell1.innerHTML = comuna;
       cell2.innerHTML = cantidades[comuna];
     });
   
    // Eliminar la capa inicial
    map.removeLayer('cultivo_inicial');
  }
  

 


  
   
  