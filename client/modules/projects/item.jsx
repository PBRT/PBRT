var s = getStyle();
import {spring} from 'react-motion';
import {Motion} from 'react-motion';
import Tech from './tech.jsx';

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.renderTechs = this.renderTechs.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      isHover: false
    };
  }
  renderTechs() {
    return this.props.techs.map((item, index) => {
      return (
        <Tech
          item={item}
          key={index}
          techsColor={this.props.techsColor} />
      );
    });
  }
  getSpringProps() {
    return {
      defaultStyle: {
        scale: 1.15,
        marginTop: 15,
        imageOpacity: 1,
        opacity: 0,
      },
      style:{
        scale: spring(this.state.isHover ? 1 : 1.15),
        marginTop: spring(this.state.isHover ? 12 : 15),
        imageOpacity: spring(this.state.isHover ? 0.1 : 1),
        opacity: spring(this.state.isHover ? 1 : 0)
      },
    };
  }
  handleHover(active) {
    if (!this.context.isTouchDevice && this.context.isDesktop) {
      this.setState({isHover: active});
    }
  }
  render() {

    return (
      <div
        ref='container'
        onMouseEnter={this.handleHover.bind(null, true)}
        onMouseLeave={this.handleHover.bind(null, false)}
        className='col-md-4 col-sm-6 col-xs-12'
        style={this.context.s(s.container)}
        target='_blank'>
        <Motion {...this.getSpringProps()}>
          {tweenCollection => {
            let styleImage = _.extend(this.context.s(s.img), {
              transform: 'scale(' + tweenCollection.scale + ')',
              opacity: tweenCollection.imageOpacity,
            });
            let styleTitle = _.extend(this.context.s(s.title), {
              marginTop: tweenCollection.marginTop + '%',
              opacity: tweenCollection.opacity,
            });
            let styleSubtitle = _.extend(this.context.s(s.subtitle), {
              opacity: tweenCollection.opacity,
            });
            return (
              <div style={this.context.s(s.subcontainer)}>
                <div
                  style={this.context.s(s.containerImage)}
                  onMouseOver={this.handleHover.bind(null, true)}
                  onMouseOut={this.handleHover.bind(null, false)}>
                  <img
                    style={styleImage}
                    src={this.props.imageSrc} />
                  {!this.context.isDesktop ?
                    <div style={this.context.s(s.infoContainer)}>
                      <div style={this.context.s(s.title)}>{this.props.title}</div>
                      <div style={this.context.s(s.subtitle)}>{this.props.description}</div>
                      <div style={this.context.s(s.skills)}>
                        {this.renderTechs()}
                      </div>
                    </div> : ''
                  }
                  <div style={this.context.s(s.overlay)}>
                    <div className='text-center text-white' style={styleTitle}>{this.props.title}</div>
                    <div style={styleSubtitle}>
                      <div style={this.context.s(s.subtitleText)}>See more</div>
                    </div>
                  </div>
                </div>
             </div>
            );
          }}
        </Motion>
      </div>
    );
  }
}

function getStyle() {
  return {
    container: {
      textAlign: 'center',
      padding: 20,
      height: 370,
      tablet: {
        height: 370,
      },
      desktop: {
        height: 'initial',
      },
    },
    subcontainer: {
      position: 'relative',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      desktop: {
        backgroundColor: '#2f3238',
      },
    },
    containerImage: {
      position: 'relative',
      backgroundColor: 'transparent',
      desktop: {
        backgroundColor: '#17819c',
      },
    },
    title: {
      textAlign: 'center',
      fontSize: UI.desktopSM,
      marginTop: 20,
      tablet: {
        textAlign: 'left',
      },
      desktop: {
        textAlign: 'center',
        marginTop: 0,
      },
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 14,
      cursor: 'pointer',
      position: 'relative',
      color: UI.darkGrey,
      tablet: {
        textAlign: 'left',
      },
      desktop: {
        position: 'absolute',
        left: '50%',
        top: '47%',
        color: UI.whiteBg,
      },
    },
    subtitleText: {
      position: 'relative',
      left: '-50%',
      padding: '10px 20px',
      border: '3px solid white',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      desktop: {
        display: 'block',
      },
    },
    img: {
      cursor: 'pointer',
      position: 'relative',
      verticalAlign: 'middle',
      width: 300,
      tablet: {
        width: 275,
      },
      desktop: {
        width: 270,
      },
    },
    infoContainer: {
      maxWidth: 300,
      margin: 'auto',
      tablet: {
        maxWidth: 316,
      },
    },
    tech: {
      padding: '5px 10px',
      display: 'inline-block',
      borderRadius: 2,
      color: UI.whiteBg,
      marginRight: 5,
      marginBottom: 5,
      textDecoration: 'none',
      fontSize: 12,
    },
    skills: {
      textAlign: 'center',
      margin: '10px 0px 30px',
      tablet: {
        textAlign: 'left',
      },
    },
  };
};

Item.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
  isTablet: React.PropTypes.bool.isRequired,
  isDesktop: React.PropTypes.bool.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired,
};
Item.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
  imageSrc: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  techs: React.PropTypes.array.isRequired,
};
