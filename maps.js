<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"> </script> <style> #map{position:absolute;top:0;bottom:0;left:0;right:0} </style>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>repl.it</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</div>

<script >


  
  var map =L.map('map').setView([5,5],1);
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ukGCjnVFrNfXp31qcnOQ',{
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }).addTo(map);
  
   
  var marker=L.marker([10,10]).addTo(map);
</script>
