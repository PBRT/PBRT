var s = getStyle();

export default class Heroshot extends React.Component{
  constructor(props) {
    super(props);
    this.cacheImage = this.cacheImage.bind(this);
    this.state = {
      height: window.innerHeight - 20,
      pathWidth: 400,
    };
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevContext.hasBeenResized !== this.context.hasBeenResized) {
      this.setState({
        height: window.innerHeight - 20,
        pathWidth: ($(React.findDOMNode(this.refs.container)).width() * 0.5)
      });
    }
  }
  componentDidMount() {
    this.cacheImage();
    this.setState({pathWidth: ($(React.findDOMNode(this.refs.container)).width() * 0.5)});
  }
  cacheImage() {
    let bgImg = new Image();
    bgImg.onload = function(){
      this.props.imageReady();
      $(React.findDOMNode(this.refs.container)).css({backgroundImage: 'url(' + bgImg.src + ')'});
    }.bind(this);
    bgImg.src = require('./assets/background.jpg');
  }
  render() {
    let path = 'M0,0 H' + this.state.pathWidth;
    return (
      <div ref='container' style={_.extend(this.context.s(s.container), {height: this.state.height})}>
        <div style={this.context.s(s.overlay)}></div>
        <div style={s.name} className='title-negative text-center'>Pierre Beard</div>
        <div className='text-center subtitle' style={s.subtitle}>Front End Developer</div>
        <div style={this.context.s(s.lineContainer)}>
          <svg width='100%' height='5px'>
            <path d={path} className='lineHero' stroke={UI.whiteBg} strokeWidth='5' fill='#2980B9'/>
          </svg>
        </div>
      </div>
    );
  }
}

Heroshot.contextTypes = {
  s: React.PropTypes.func.isRequired,
  hasBeenResized: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {
      minHeight: 300,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      position: 'relative',
      WebkitFilter: 'saturate(4)',
    },
    name: {
      paddingTop: 160,
      position: 'relative',
      color: UI.whiteBg,
    },
    subtitle: {
      position: 'relative',
      color: UI.whiteBg,
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#34495e',
      opacity: 0.3,
    },
    lineContainer: {
      position: 'absolute',
      width: '50%',
      left: '50%',
      transform: 'translate3d(-50%, 0, 0)',
    },
  };
};

