var s = getStyle();

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.renderSkills = this.renderSkills.bind(this);
    this.getContainerClass = this.getContainerClass.bind(this);
    this.getContainerStyle = this.getContainerStyle.bind(this);
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
      marginBottom: this.props.isLast ? 0 : 100,
      padding: this.context.isMobile ? 0 :
        this.props.isLeft ? '0px 40px 0px 0px' : '0px 0px 0px 40px'
    });
  }
  renderSkills() {
    return this.props.techs.map((item, index) => {
      var coma = (index === this.props.techs.length - 1) ? '.' : ', ';
      return (
        <div style={s.tech}>{item}{coma}</div>
      );
    });
  }
  render() {

    return (
      <div className={this.getContainerClass()} style={this.getContainerStyle()}>
        <div style={this.context.s(s.title)} className='body'>
          {this.props.title}
        </div>
        <div style={this.context.s(s.subtitle)} className='caption text-grey'>
          {this.props.subtitle}
        </div>
        <div style={this.context.s(s.skills)} className='small text-blue'>
          {this.renderSkills()}
        </div>
      </div>
    );
  }
}

Item.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
};
Item.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
  isLeft: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {},
    title: {
    },
    subtitle: {
    },
    skills: {
      marginTop: 5,
    },
    tech: {
      display: 'inline',
    },
  };
};
