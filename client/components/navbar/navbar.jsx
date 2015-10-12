var s = getStyle();
import {spring, Motion} from 'react-motion';

export default class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.getSpringProps = this.getSpringProps.bind(this);
    this.state = {
      isVisible: false,
    };
  }
  getSpringProps() {
    return {
      defaultStyle: {
        top: -60,
      },
      style:{
        top: spring(this.state.isVisible ? 0 : -60),
      },
    };
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevContext.scrollPosition !== this.context.scrollPosition) {
      this.setState({isVisible: (this.context.scrollPosition > 600)});
    }
  }
  render() {

    return (
      <Motion {...this.getSpringProps()}>
        {interpolated => {
          return (
            <div style={_.extend(s.navbar, {transform: 'translateY(' + interpolated.top + 'px)'})}>
              <div style={this.context.s(s.sub)}>
                <div style={this.context.s(s.subsub)}>
                  <div style={s.logo}>
                    <img
                      src={require('./assets/logo.jpg')}
                      style={this.context.s(s.img)}
                      onClick={this.props.scrollTo.bind(null, 'expertise', 0)}/>
                  </div>
                  <div style={s.contact} onClick={this.props.scrollTo.bind(null, 'contact', -60)}>Contact</div>
                </div>
              </div>
            </div>
          );
        }}
      </Motion>
    );
  }
}

Navbar.contextTypes = {
  s: React.PropTypes.func.isRequired,
  scrollPosition: React.PropTypes.number.isRequired,
};

Navbar.propTypes = {
  scrollTo: React.PropTypes.func.isRequired,
};

function getStyle() {
  return {
    navbar: {
      position: 'fixed',
      backgroundColor: 'white',
      width: '100%',
      zIndex: 10,
      boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.3)',
    },
    sub: {
      maxWidth: UI.widthMobile,
      margin: 'auto',
      tablet: {
        maxWidth: UI.widthTablet,
      },
      desktop: {
        maxWidth: UI.widthDesktop,
      },
    },
    subsub: {
      display: 'table',
      width: '100%',
      height: 60,
      padding: '0px 15px',
      tablet: {
        padding: 0,
      },
      desktop: {
        padding: 0,
      },
    },
    logo: {
      display: 'table-cell',
      width: '30%',
      textAlign: 'left',
      padding: '10px 0px',
      verticalAlign: 'middle',
    },
    contact: {
      display: 'table-cell',
      width: '70%',
      textAlign: 'right',
      padding: 10,
      padding: '10px 0px',
      verticalAlign: 'middle',
      cursor: 'pointer',
    },
    img: {
      width: 30,
      cursor: 'pointer',
      tablet: {
        width: 45,
      },
      desktop: {
        width: 45,
      },
    },
  };
};

