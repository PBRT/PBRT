var s = getStyle();
import {spring, Motion} from 'react-motion';

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.getSpringProps = this.getSpringProps.bind(this);
    this.state = {
      isVisible: false,
    };
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevContext.scrollPosition !== this.context.scrollPosition) {
      if (this.context.scrollPosition > $(React.findDOMNode(this)).position().top + 100) {
        this.setState({isVisible: true});
      }
    }
  }
  getSpringProps() {
    return {
      defaultStyle: {
        top: 40,
        opacity: 0,
      },
      style:{
        opacity: spring(this.state.isVisible ? 1 : 0),
        top: spring(this.state.isVisible ? 0 : 40),
      },
    };
  }
  render() {

    var containerStyle = !this.context.isMobile ? _.extend(this.context.s(s.container), {
      paddingLeft: (this.props.position === 0) ? 0 : 20,
      paddingRight: (this.props.position === 2) ? 0 : 20}) :
      _.extend(this.context.s(s.container), {padding: 0});

    return (
      <Motion {...this.getSpringProps()}>
        {interpolated => {
          let contain = _.extend(containerStyle, {
            opacity: interpolated.opacity,
            transform: 'translateY(' + interpolated.top + 'px)',
          });

          return (
            <div style={contain} className='col-xs-12 col-sm-4'>
              <div className='text-center' style={this.context.s(s.imageContainer)}>
                <img
                  src={require('./assets/' + this.props.imageSrc)}
                  style={this.context.s(s.image)} />
              </div>
              <div className='headline text-center' style={this.context.s(s.title)}>{this.props.title}</div>
              <div className='body text-grey' style={this.context.s(s.subtitle)}>{this.props.subtitle}</div>
            </div>
          );
        }}
      </Motion>
    );
  }
}

Item.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
  scrollPosition: React.PropTypes.number.isRequired,
};
Item.propTypes = {
  imageSrc: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  position: React.PropTypes.number.isRequired,
};

function getStyle() {
  return {
    container: {
      marginBottom: 50,
      tablet: {
        marginBottom: 0,
      },
      desktop: {
        marginBottom: 0,
      },
    },
    title: {
      margin: '15px 0 10px',
      desktop: {
        margin: '30px 0 15px',
      },
    },
    subtitle: {
      textAlign: 'center',
      tablet: {
        textAlign: 'left',
      },
      desktop: {
        textAlign: 'left',
      },
    },
    image: {
      width: '100%',
      maxWidth: 240,
      tablet: {
        maxWidth: 180,
      },
      desktop: {
        maxWidth: 210,
      },
    },
    imageContainer: {
    },
  };
};
