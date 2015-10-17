var s = getStyle();
import {spring} from 'react-motion';
import {Motion} from 'react-motion';
var Modal = require('react-modal');
import ModalContainer from './modal-container.jsx';
import Tech from './tech.jsx';

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.renderTechs = this.renderTechs.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      isHover: false,
      modalIsOpen: false,
    };
  }
  handleModal(val) {
    $('body').css('overflow', val ? 'hidden' : 'scroll');
    this.setState({modalIsOpen: val});
  }
  renderTechs() {
    return this.props.item.techs.map((item, index) => {
      return (
        <Tech
          item={item}
          key={index}
          techsColor={this.props.item.techsColor} />
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
  componentDidUpdate(prevProps, prevState, prevContext) {
    if((prevContext.isDesktop !== this.context.isDesktop) && !this.context.isDesktop) {
      this.handleModal(false);
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
            <Modal
              style={{overlay: {backgroundColor: 'none', overflow: 'hidden'}}}
              closeTimeoutMS={150}
              className="Modal__Bootstrap modal-dialog"
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.handleModal.bind(null, false)}>
              <ModalContainer
                handleModal={this.handleModal}
                item={this.props.item}/>
            </Modal>
          <Motion {...this.getSpringProps()}>
            {tweenCollection => {
              let styleImage = _.extend(this.context.s(s.img), {
                transform: 'scale(' + (this.context.isDesktop ? tweenCollection.scale : 1) + ')',
                opacity: this.context.isDesktop ? tweenCollection.imageOpacity : 1,
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
                    <a
                      href={this.props.item.link}
                      target='_blank'>
                      <img
                        style={styleImage}
                        src={require('./assets/' + this.props.item.imageSrc)} />
                    </a>
                    {!this.context.isDesktop ?
                      <div style={this.context.s(s.infoContainer)}>
                        <div style={this.context.s(s.title)}>{this.props.item.name}</div>
                        <div style={this.context.s(s.subtitle)}>{this.props.item.description}</div>
                        <div style={this.context.s(s.skills)}>
                          {this.renderTechs()}
                        </div>
                      </div> : ''
                    }
                    <div style={this.context.s(s.overlay)} onClick={this.handleModal.bind(null, true)}>
                      <div className='text-center text-white' style={styleTitle}>{this.props.item.name}</div>
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
      height: 320,
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
      cursor: 'pointer',
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
      width: '100%',
      maxWidth: 180,
      tablet: {
        maxWidth: 300,
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
  item: React.PropTypes.object.isRequired,
};
