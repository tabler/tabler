# Maps

Based on `/preview/pages/maps.html` and `/preview/pages/maps-vector.html` in this repository.

Tabler supports various map libraries including jsVectorMap for interactive vector maps.

## jsVectorMap

### Base structure

```html
<div class="card">
  <div class="card-body">
    <div id="map-world" style="height: 400px;"></div>
  </div>
</div>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
  new jsVectorMap({
    selector: '#map-world',
    map: 'world',
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#e9ecef'
      },
      hover: {
        fill: '#206bc4'
      }
    },
    markers: [
      { name: 'United States', coords: [37.09, -95.71] },
      { name: 'United Kingdom', coords: [55.37, -3.43] },
      { name: 'Germany', coords: [51.16, 10.45] }
    ],
    markerStyle: {
      initial: {
        fill: '#d63939',
        stroke: '#fff',
        strokeWidth: 2
      }
    }
  });
});
```

### Map with selected regions

```html
<div id="map-selected" style="height: 400px;"></div>
```

```javascript
new jsVectorMap({
  selector: '#map-selected',
  map: 'world',
  selectedRegions: ['US', 'GB', 'DE', 'FR', 'ES'],
  regionStyle: {
    selected: {
      fill: '#206bc4'
    }
  },
  onRegionClick: function(event, code) {
    console.log('Clicked region:', code);
  }
});
```

### Map with data visualization (choropleth)

```html
<div id="map-data" style="height: 400px;"></div>
```

```javascript
new jsVectorMap({
  selector: '#map-data',
  map: 'world',
  visualizeData: {
    scale: ['#e9ecef', '#206bc4'],
    values: {
      US: 1000,
      GB: 800,
      DE: 700,
      FR: 600,
      ES: 500,
      IT: 450
    }
  }
});
```

### USA map

```html
<div id="map-usa" style="height: 400px;"></div>
```

```javascript
new jsVectorMap({
  selector: '#map-usa',
  map: 'us',
  regionStyle: {
    initial: {
      fill: '#e9ecef'
    },
    hover: {
      fill: '#206bc4'
    }
  }
});
```

### Europe map

```html
<div id="map-europe" style="height: 400px;"></div>
```

```javascript
new jsVectorMap({
  selector: '#map-europe',
  map: 'europe',
  regionStyle: {
    initial: {
      fill: '#e9ecef'
    },
    hover: {
      fill: '#206bc4'
    }
  }
});
```

### Map with tooltips

```javascript
new jsVectorMap({
  selector: '#map-tooltips',
  map: 'world',
  labels: {
    markers: {
      render: function(marker) {
        return marker.name;
      }
    }
  },
  onMarkerClick: function(event, index) {
    console.log('Marker clicked:', this.markers[index].name);
  },
  onRegionTooltipShow: function(event, tooltip, code) {
    tooltip.text(
      tooltip.text() + ' - Custom info here'
    );
  }
});
```

## Google Maps (iframe)

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Location</h3>
  </div>
  <div class="ratio ratio-16x9">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s" 
      width="600" 
      height="450" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy">
    </iframe>
  </div>
</div>
```

## Fullscreen map

```html
<div class="card">
  <div class="card-map card-map-full" style="height: 500px;">
    <div id="map-fullscreen" style="width: 100%; height: 100%;"></div>
  </div>
</div>
```

## Map with sidebar

```html
<div class="row g-0">
  <div class="col-md-4">
    <div class="card card-flush">
      <div class="card-header">
        <h3 class="card-title">Locations</h3>
      </div>
      <div class="list-group list-group-flush overflow-auto" style="max-height: 400px;">
        <a href="#" class="list-group-item list-group-item-action active" onclick="focusMap(0)">
          <div class="font-weight-medium">New York Office</div>
          <div class="text-secondary text-truncate">123 Main St, New York, NY</div>
        </a>
        <a href="#" class="list-group-item list-group-item-action" onclick="focusMap(1)">
          <div class="font-weight-medium">London Office</div>
          <div class="text-secondary text-truncate">456 High St, London, UK</div>
        </a>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div id="map-sidebar" style="height: 400px;"></div>
  </div>
</div>
```

```javascript
var mapSidebar = new jsVectorMap({
  selector: '#map-sidebar',
  map: 'world',
  markers: [
    { name: 'New York Office', coords: [40.71, -74.00] },
    { name: 'London Office', coords: [51.50, -0.12] }
  ]
});

function focusMap(index) {
  mapSidebar.focusOn({
    coords: mapSidebar.markers[index].coords,
    scale: 5,
    animate: true
  });
}
```

## Required libraries

```html
<!-- jsVectorMap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.2/dist/css/jsvectormap.min.css">

<!-- jsVectorMap JS -->
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.2/dist/js/jsvectormap.min.js"></script>

<!-- Map files -->
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.2/dist/maps/world.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.2/dist/maps/us.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.2/dist/maps/europe.js"></script>
```

Or via npm:
```bash
npm install jsvectormap
```

## Available maps

| Map | File | Description |
|-----|------|-------------|
| World | `world.js` | World map with all countries |
| USA | `us.js` | United States map |
| Europe | `europe.js` | European countries |
| Canada | `canada.js` | Canada provinces |
| Australia | `australia.js` | Australia states |
| UK | `uk.js` | United Kingdom |
| France | `france.js` | France regions |
| Germany | `germany.js` | Germany states |
| Russia | `russia.js` | Russia regions |
| China | `china.js` | China provinces |
| India | `india.js` | India states |

## Configuration options

| Option | Type | Description |
|--------|------|-------------|
| `selector` | String | Target element selector |
| `map` | String | Map name (world, us, europe, etc.) |
| `backgroundColor` | String | Map background color |
| `regionStyle` | Object | Region styling |
| `markerStyle` | Object | Marker styling |
| `markers` | Array | Array of marker objects |
| `selectedRegions` | Array | Initially selected regions |
| `visualizeData` | Object | Data for choropleth |
| `focusOn` | Object | Initial focus coordinates |
| `zoomButtons` | Boolean | Show zoom buttons |
| `zoomOnScroll` | Boolean | Zoom on mouse scroll |
| `draggable` | Boolean | Allow map dragging |

## Callbacks

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onRegionClick` | event, code | Region clicked |
| `onRegionSelected` | event, code, isSelected | Region selection changed |
| `onMarkerClick` | event, index | Marker clicked |
| `onViewportChange` | event, scale | Viewport changed |

## Methods

```javascript
// Focus on region
map.focusOn({
  region: 'US',
  animate: true
});

// Focus on coordinates
map.focusOn({
  coords: [40.71, -74.00],
  scale: 5
});

// Select region programmatically
map.select('US');
map.deselect('US');

// Get selected regions
var selected = map.getSelectedRegions();

// Add markers
map.addMarkers([
  { name: 'New Marker', coords: [51.50, -0.12] }
]);

// Remove markers
map.removeMarkers();

// Update size (after container resize)
map.updateSize();
```

## Classes

| Class | Purpose |
|-------|-----------|
| `card-map` | Map container in card |
| `card-map-full` | Full-height map |
| `ratio` / `ratio-16x9` | Responsive aspect ratio |
