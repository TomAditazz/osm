var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

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

  render: function(){
    return (
      <div className="col-sm-6">
        <div className="col-sm-12">
          <div id="map">
            <button type="button" onClick={this.initalMap}>Inital Map</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = OsmEditer;