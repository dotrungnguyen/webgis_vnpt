import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import SceneView from '@arcgis/core/views/SceneView'
import TileLayer from '@arcgis/core/layers/TileLayer'


const transportationLayer = new TileLayer({
    url: 'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
    // This property can be used to uniquely identify the layer
    id: 'streets',
    visible: false,
})

const housingLayer = new TileLayer({
    url: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
    id: 'ny-housing',
    opacity: 0.9,
})

const map = new Map({
    basemap: 'oceans',
    layers: [housingLayer],
})


map.add(transportationLayer)

if (this.getCurrentService === 'transportation') {
    transportationLayer.visible = true
}

const view = new SceneView({
    container: this.$el,
    map: map,
    center: this.getMapConfig.center,
    zoom: this.getMapConfig.zoom,
})

view.on('layerview-create', (event) => {
    if (event.layer.id === 'ny-housing') {
        console.log(
            'LayerView for male population created!',
            event.layerView
        )
    }
    if (event.layer.id === 'streets') {
        console.log('LayerView for streets created!', event.layerView)
    }
})

// add a legend widget instance to the view
// and set the style to 'card'. This is a
// responsive style, which is good for mobile devices
export const legend = new Expand({
    content: new Legend({
        view,
        style: 'card'
    }),
    view
});
view.ui.add(legend, 'bottom-left');

// user a layerlist to manage multiple layers
// being added to the map
export const layerList = new Expand({
    content: new LayerList({ view }),
    view
});
view.ui.add(layerList, 'top-right');

// add the bookmarks widget for editing
export const bookmarks = new Expand({
    content: new Bookmarks({
        view,
        editingEnabled: true
    }),
    view
});
view.ui.add(bookmarks, 'bottom-right');

// ----------------------------------
// Public methods
// ----------------------------------

/**
 * Assigns the container element to the View
 * @param container
 */
export async function initialize(container: HTMLDivElement) {
    view.container = container;
    try {
        await view.when();
        console.log('Map and View are ready');
    } catch (error) {
        console.warn('An error in creating the map occurred:', error);
    }
}

