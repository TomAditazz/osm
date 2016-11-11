var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var Dropzonedemo = require('./Dropzone.js');

var OsmEditer = React.createClass({
  
    componentWillMount() {
      const script = document.createElement("script");

        script.src = "http://openlayers.org/api/OpenLayers.js";
        //script.async = true;

        document.body.appendChild(script);
        console.log(script);
    },
    componentDidMount() {

    },
    initialMap(){
      var lat=50.88;
      var lon=-1.54;
      var zoom=13;
      var map = new OpenLayers.Map ("map", {
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
      var layer = new OpenLayers.Layer.Vector("Polygon", {
          strategies: [new OpenLayers.Strategy.Fixed()],
          protocol: new OpenLayers.Protocol.HTTP({
              url: "test.osm",   //<-- relative or absolute URL to your .osm file
              format: new OpenLayers.Format.OSM()
          }),
          projection: new OpenLayers.Projection("EPSG:4326")
      });
      map.addLayers([layer]);
    },
    onDrop: function (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    },
  render: function(){
    var options={
        baseUrl:'http://127.0.0.1:3000/',
        param:{
            fid:0
        }
    }
    return (
      <div className="col-sm-6">
        <div className="col-sm-12">
          <Dropzonedemo />
          <div id="map">
            <button type="button" onClick={this.initialMap}>Inital Map</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = OsmEditer;