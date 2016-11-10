var React = require('react');
var ListContainer = require('./components/ListContainer');
var OsmEditer = require('./components/OsmEditer');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          ts
          <ListContainer />
          <OsmEditer />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)