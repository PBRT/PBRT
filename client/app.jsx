import 'bootstrap-webpack';
import './style/app.styl';
import 'velocity-animate';
import Expertise from './modules/expertise/expertise.jsx';
import Method from './modules/method/method.jsx';
import Projects from './modules/projects/projects.jsx';
import Experience from './modules/experience/experience.jsx';
import Heroshot from 'heroshot/heroshot.jsx';
import Footer from './modules/footer/footer.jsx';
import Recognition from './modules/recognition/recognitions.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Contact from './modules/contact/contact.jsx';

// Main class - App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBeenResized: false,
      isMobile: this.isMobile(),
      isTablet: this.isTablet(),
      isDesktop: this.isDesktop(),
      isTouchDevice: this.isTouchDevice(),
      scrollPosition: window.pageYOffset,
    };
    this.scrollTo = this.scrollTo.bind(this);
    this.isMobile = this.isMobile.bind(this);
    this.isTablet = this.isTablet.bind(this);
    this.isDesktop = this.isDesktop.bind(this);
    this.isTouchDevice = this.isTouchDevice(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.debouncedHandleResize = _.debounce(() => {this.handleResize();}, UI.wait);
  }
  getChildContext() {
    return {
      isMobile: this.state.isMobile,
      isTablet: this.state.isTablet,
      isDesktop: this.state.isDesktop,
      isTouchDevice: this.state.isTouchDevice,
      hasBeenResized: this.state.hasBeenResized,
      scrollPosition: this.state.scrollPosition,
      s: this.handleStyle,
    };
  }
  isMobile() {
    return (window.innerWidth < UI.breakpointMobileJS);
  }
  isTablet() {
    return (!this.isMobile() && (window.innerWidth < UI.breakpointTabletJS));
  }
  isDesktop() {
    return (!this.isMobile() && !this.isTablet());
  }
  isTouchDevice() {
    return 'ontouchstart' in window // works on most browsers
      || 'onmsgesturechange' in window; // works on ie10
  }
  handleScroll() {
    this.setState({scrollPosition: window.pageYOffset});
  }
  scrollTo(ref, offset) {
    $(React.findDOMNode(this.refs[ref])).velocity('scroll', {offset: offset, duration: 400, easing: 'easeInOutExpo'});
  }
  handleResize() {
    this.setState({
      isMobile: this.isMobile(),
      isTablet: this.isTablet(),
      isDesktop: this.isDesktop(),
      hasBeenResized: !this.state.hasBeenResized,
    });
  }
  componentDidMount() {
    React.initializeTouchEvents(true);
    this.handleResize();
    window.addEventListener('resize', this.debouncedHandleResize);
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleStyle(style) {
    let mobile = this.getViewportStyle(style);
    let {tablet, desktop} = style;
    let responsiveStyle;

    if (this.state.isMobile) {
      responsiveStyle = _.clone(mobile);
    } else if (this.state.isTablet) {
      responsiveStyle = _.extend(_.clone(mobile), tablet);
    } else if (this.state.isDesktop) {
      responsiveStyle = _.extend(_.clone(mobile), _.clone(tablet), desktop);
    }

    return responsiveStyle;
  }
  getViewportStyle(styleObject) {
    var mobileObject = {};

    // Build mobile style object
    for (var key in styleObject) {
      if (!_.includes(['tablet', 'desktop'], key)) {
        mobileObject[key] = styleObject[key];
      }
    }

    return mobileObject;
  }
  render() {
    return (
      <div>
        <Navbar scrollTo={this.scrollTo}/>
        <Heroshot />
        <Expertise
          ref='expertise'
          isLast={false} />
        <Projects
          isLast={false} />
        <Method
          isLast={false} />
        <Experience
          isLast={false} />
        <Recognition />
        <Contact
          ref='contact'
          isLast={true} />
        <Footer />
      </div>
    );
  }
}

App.childContextTypes = {
  isMobile: React.PropTypes.bool.isRequired,
  isTablet: React.PropTypes.bool.isRequired,
  isDesktop: React.PropTypes.bool.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired,
  hasBeenResized: React.PropTypes.bool.isRequired,
  scrollPosition: React.PropTypes.number.isRequired,
  s: React.PropTypes.func.isRequired,
};

React.render (<App/>,document.body);
