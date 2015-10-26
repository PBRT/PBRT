var s = getStyle();

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
    this.renderSkills = this.renderSkills.bind(this);
    this.getContainerClass = this.getContainerClass.bind(this);
    this.getContainerStyle = this.getContainerStyle.bind(this);
    this.getIconStyle = this.getIconStyle.bind(this);
  }
  getContainerClass() {
    return this.context.isMobile ?
      'col-xs-12 text-left no-padding' :
      this.props.isLeft ?
        'col-sm-6 text-right no-padding' :
        'col-sm-6 col-sm-offset-6 text-left no-padding';
  }
  getContainerStyle() {
    return _.extend(this.context.s(s.container), {
      marginBottom: this.props.isLast ? 0 : (this.context.isMobile ? 50 : 100),
      marginLeft: this.context.isMobile ? 0 : this.props.isLeft ? 0: 30,
      marginRight: this.context.isMobile ? 0 : this.props.isLeft ? 30: 0,
    });
  }
  getIconStyle() {
    return _.extend(this.context.s(s.icon), {
      left: this.context.isMobile ? -22 : this.props.isLeft ? 'initial' : -22,
      right: this.context.isMobile ? 'initial' : this.props.isLeft ? -18 : 'initial',
    });
  }
  renderSkills() {
    return this.props.techs.map((item, index) => {
      var coma = (index === this.props.techs.length - 1) ? '.' : ', ';
      return (
        <div key={index} style={s.tech}>{item}{coma}</div>
      );
    });
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if ((prevContext.scrollPosition !== this.context.scrollPosition) && !this.state.isVisible){
      if(this.context.scrollPosition > ($(React.findDOMNode(this)).offset().top - 500)) {
        $(React.findDOMNode(this.refs.container)).velocity({translateX: 0, opacity: 1}, {duration: 400});
        this.setState({isVisible: true});
      }
    }
  }
  componentDidMount() {
    $(React.findDOMNode(this.refs.container)).velocity(
      {translateX: this.context.isMobile ? '0px' : this.props.isLeft ? '-100px' : '100px', opacity: 0}, {duration: 0});
  }
  render() {

    return (
      <div ref='container' style={{position: 'relative'}} className={this.getContainerClass()}>
        <div style={this.getIconStyle()}>
          <img style={s.imgIcon} src={require('./assets/' + this.props.icon)}/>
        </div>
        <div style={this.getContainerStyle()}>
          <div style={this.context.s(s.title)} className='body'>
            {this.props.title}
          </div>
          <div style={this.context.s(s.date)} className='caption text-grey'>{this.props.date}</div>
          <div style={this.context.s(s.subtitle)} className='caption text-grey'>
            {this.props.subtitle}
          </div>
          <div style={this.context.s(s.skills)} className='small text-blue'>
            {this.renderSkills()}
          </div>
        </div>
      </div>
    );
  }
}

Item.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
  scrollPosition: React.PropTypes.number.isRequired,
};
Item.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
  isLeft: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {
      backgroundColor: UI.whiteBg,
      padding: 25,
      borderRadius: 4,
      border: '2px solid',
      borderWidth: 2,
      borderColor: UI.lightBlue,
      boxShadow: 'none',
      tablet: {
        borderWidth: 0,
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
      },
      desktop: {
        borderWidth: 0,
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
      },
    },
    imgIcon: {
      width: 40,
    },
    title: {
      marginBottom: 10,
    },
    subtitle: {
    },
    skills: {
      marginTop: 5,
    },
    tech: {
      display: 'inline',
    },
    icon: {
      position: 'absolute',
      top: 15,
    },
    date: {
      marginTop: 5,
      marginBottom: 5,
    },
  };
};
