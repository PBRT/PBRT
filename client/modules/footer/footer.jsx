var s = getStyle();

export default class Footer extends React.Component{
  constructor(props) {
    super(props);
    this.animateComp = this.animateComp.bind(this);
  }
  animateComp(ref, active, event) {
    if ((this.context.isTouchDevice && event === 'touch') ||
      (!this.context.isTouchDevice && event === 'mouse')) {
      $(React.findDOMNode(this.refs[ref])).velocity({opacity: active ? 1 : 0.7}, {duration: 2 * UI.duration});
    }
  }
  render() {
    return (
      <div style={this.context.s(s.footer)}>
        <div style={this.context.s(s.col)}>
          <div style={this.context.s(s.name)} className='small text-white'>Pierre Beard</div>
          <div className='small text-white' style={this.context.s(s.name)}>2017 London</div>
        </div>
        <div style={this.context.s(s.colImages)} className='text-right'>
          <a
            style={s.link}
            onMouseEnter={this.animateComp.bind(null, 'git', true, 'mouse')}
            onMouseLeave={this.animateComp.bind(null, 'git', false, 'mouse')}
            onTouchStart={this.animateComp.bind(null, 'git', true, 'touch')}
            onTouchEnd={this.animateComp.bind(null, 'git', false, 'touch')}
            ref='git'
            href='https://github.com/PBRT'
            target='_blank'>
            <img style={_.extend(this.context.s(s.icon), {marginLeft: 0})} src={require('./assets/Github.svg')} />
          </a>
          <a
            style={s.link}
            onMouseEnter={this.animateComp.bind(null, 'medium', true, 'mouse')}
            onMouseLeave={this.animateComp.bind(null, 'medium', false, 'mouse')}
            onTouchStart={this.animateComp.bind(null, 'medium', true, 'touch')}
            onTouchEnd={this.animateComp.bind(null, 'medium', false, 'touch')}
            ref='medium'
            href='https://medium.com/@PierreBeard'
            target='_blank'>
            <img style={this.context.s(s.icon)} src={require('./assets/Medium.svg')} />
          </a>
          <a
            style={s.link}
            ref='twit'
            onMouseEnter={this.animateComp.bind(null, 'twit', true, 'mouse')}
            onMouseLeave={this.animateComp.bind(null, 'twit', false, 'mouse')}
            onTouchStart={this.animateComp.bind(null, 'twit', true, 'touch')}
            onTouchEnd={this.animateComp.bind(null, 'twit', false, 'touch')}
            href='https://twitter.com/PBRT_real'
            target='_blank'>
            <img style={this.context.s(s.icon)} src={require('./assets/Twitter.svg')} />
          </a>
          <a
            ref='linked'
            style={s.link}
            onMouseEnter={this.animateComp.bind(null, 'linked', true, 'mouse')}
            onMouseLeave={this.animateComp.bind(null, 'linked', false, 'mouse')}
            onTouchStart={this.animateComp.bind(null, 'linked', true, 'touch')}
            onTouchEnd={this.animateComp.bind(null, 'linked', false, 'touch')}
            href='https://uk.linkedin.com/pub/pierre-beard/62/690/4b0'
            target='_blank'>
            <img style={this.context.s(s.icon)} src={require('./assets/Linkedin.svg')} />
          </a>
        </div>
      </div>
    );
  }
}

Footer.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    footer: {
      backgroundColor: UI.darkBlue,
      display: 'inline-block',
      width: '100%',
      padding: '30px 25px 10px',
      tablet: {
        padding: '60px 25px 20px',
      },
      desktop: {
        padding: '60px 25px 20px',
      },
    },
    col: {
      width: '100%',
      display: 'block',
      textAlign: 'center',
      tablet: {
        float: 'none',
        width: '50%',
        display: 'inline-block',
        textAlign: 'left',
      },
      desktop: {
        float: 'none',
        width: '50%',
        display: 'inline-block',
        textAlign: 'left',
      },
    },
    colImages: {
      width: '100%',
      display: 'block',
      textAlign: 'center',
      verticalAlign: 'text-bottom',
      marginTop: 30,
      marginBottom: 20,
      tablet: {
        marginBottom: 0,
        float: 'none',
        width: '50%',
        display: 'inline-block',
        textAlign: 'right',
      },
      desktop: {
        marginBottom: 0,
        float: 'none',
        width: '50%',
        display: 'inline-block',
        textAlign: 'right',
      },
    },
    name: {
      marginBottom: 12,
      fontSize: 14,
      tablet: {
        marginBottom: 5
      },
      desktop: {
        marginBottom: 5,
      },
    },
    link: {
      opacity: 0.7,
    },
    icon: {
      width: 30,
      marginLeft: 30,
      tablet: {
        width: 25,
        marginLeft: 20,
      },
      desktop: {
        width: 30,
        marginLeft: 20,
      },
    },
  };
};
