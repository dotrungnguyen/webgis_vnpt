<template>
  <div class="map-view"></div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'

import Config from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import Graphic from "@arcgis/core/Graphic"
import geometryEngine from "@arcgis/core/geometry/geometryEngine"
import Search from "@arcgis/core/widgets/Search"
import watchUtils from "@arcgis/core/watchUtils"

export default {

  name: "MapView",
    computed: mapGetters([
        'getMapConfig',
    ]),

  mounted() {

    const map = new Map({
      basemap: this.getMapConfig.basemap,
    });

    const view = new MapView({
      container: this.$el,
      map: map,
      center: [100, 13],
      zoom: 5,
    });

    //Add Search widget
    const search = new Search({
      view: view,
    });
    view.ui.add(search, "top-right"); //Add to the map

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
      },
    });
    view.ui.add(locate, "bottom-left");

    const track = new Track({
      view: view,
      graphic: new Graphic({
        symbol: {
          type: "simple-marker",
          size: "12px",
          color: "green",
          outline: {
            color: "#efefef",
            width: "1.5px",
          },
        },
      }),
      useHeadingEnabled: false,
    });
    view.ui.add(track, "top-left");

    const featureLayer = new FeatureLayer({
      url:
        "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
    });

    map.add(featureLayer);

    view.when(() => {
      console.log("view ready ...");
    });

    ///

    // const scene = new WebScene({
    //   portalItem: {
    //     // autocasts as new PortalItem()
    //     id: "0614ea1f9dd043e9ba157b9c20d3c538", // ID of the WebScene on the on-premise portal
    //   },
    // });

    // const view = new SceneView({
    //   map: scene, // The WebScene instance created above
    //   container: this.$el,
    // });

    // scene.when(function() {
    //   // All layers and the basemap have been created
    // });
    // view.when(function() {
    //   // All layer and basemap resources have been loaded and are ready to be displayed
    // });
  },
};
</script>

<style>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/dark/main.css";

</style>