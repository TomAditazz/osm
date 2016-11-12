var React = require('react');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
    onDrop: function (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Accepted files: ', acceptedFiles[0].preview);
      console.log('Rejected files: ', rejectedFiles);
      var lat=50.88;
      var lon=-1.54;
      var zoom=13;

      map = new OpenLayers.Map ("map", {
        controls:[
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.Attribution()],
        maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
        maxResolution: 156543.0399,
        numZoomLevels: 19,
        units: 'm',
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
      });
      map.addLayer(new OpenLayers.Layer.OSM());
 
      var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      
      map.setCenter (lonLat, zoom);
      //Initialise the vector layer using OpenLayers.Format.OSM
      layer = new OpenLayers.Layer.Vector("Site", {
          strategies: [new OpenLayers.Strategy.Fixed()],
          protocol: new OpenLayers.Protocol.HTTP({
              url: acceptedFiles[0].preview,   //<-- relative or absolute URL to your .osm file
              format: new OpenLayers.Format.OSM()
          }),
          projection: new OpenLayers.Projection("EPSG:4326")
      });
      console.log(layer);
      map.addLayers([layer]);

    },

    render: function () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
});

module.exports = DropzoneDemo;