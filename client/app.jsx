import Expertise from './components/expertise.jsx';
import Breakpoints from './utils/Breakpoints.js';
import UI from './utils/UI.js';

// Main class - App
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: Breakpoints.getDisplay(window.innerWidth),
      isTouchDevice: this.isTouchDevice(),
    };
  }
  getChildContext() {
    return {
      display: this.state.display,
      isTouchDevice: this.state.isTouchDevice,
    };
  }
  isTouchDevice() {
    return 'ontouchstart' in window // works on most browsers
      || 'onmsgesturechange' in window; // works on ie10
  }
  componentDidMount() {
    if (this.state.isTouchDevice) {
      // Instantiate touch events
      React.initializeTouchEvents(true);
    }
    window.addEventListener('resize',
      _.debounce(() => {this.handleResize();}, UI.wait)
    );
  }
  componentWillUnmount() {
    window.removeEventListener('resize',
      _.debounce(() => {this.handleResize();}, UI.wait)
    );
  }
  handleResize() {
    this.setState({display: Breakpoints.getDisplay(window.innerWidth)});
  }
  render() {
    return (
      <div>
        THE APP
        <Expertise />
      </div>
    );
  }
}

App.childContextTypes = {
  display: React.PropTypes.string.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired
};

React.render (
  <App />,
  document.body
);
