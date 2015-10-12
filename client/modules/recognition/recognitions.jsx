import {recognitions} from './recognition.constant.js';
var s = getStyle();

export default class Recognition extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentLine: 0,
    };
    this.animateLine = this.animateLine.bind(this);
    this.renderReco = this.renderReco.bind(this);
  }
  renderReco() {
    return recognitions.map((item, index) => {
      return (
        <div key={index} style={s.line} ref={'line-' + index}>
          <div style={this.context.s(s.title)} className='body'>{item.text}</div>
          <div style={this.context.s(s.author)} className='caption'>{item.name}</div>
        </div>
      );
    });
  }
  animateLine(index) {
    $(React.findDOMNode(this.refs['line-' + index])).velocity({opacity: 1, bottom: 20}, {
      duration: 400,
      complete: function() {
        $(React.findDOMNode(this.refs['line-' + index])).velocity({opacity: 0, bottom: 50}, {
          duration: 400,
          delay: 3000,
          complete: function() {
            $(React.findDOMNode(this.refs['line-' + index])).velocity({opacity: 0, bottom: -20}, 0);
            this.setState({
              currentLine: (this.state.currentLine === recognitions.length - 1) ? 0 : this.state.currentLine + 1});
          }.bind(this),
        });
      }.bind(this),
    });
  }
  componentDidMount() {
    recognitions.map((item, index) => {
      $(React.findDOMNode(this.refs['line-' + index])).velocity({opacity: 0}, 0);
    });
    this.animateLine(0);
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentLine !== this.state.currentLine) {
      this.animateLine(this.state.currentLine);
    }
  }
  render() {

    return (
      <div style={this.context.s(s.reco)}>
        {!this.context.isMobile ?
          <div className='col-sm-4 no-padding' style={this.context.s(s.container)}>
              <img src={require('./assets/profile.png')} style={this.context.s(s.image)} />
          </div> : ''}
        <div
          className='col-sm-8 text-white'
          style={_.extend(this.context.s(s.container), {verticalAlign: 'bottom', paddingBottom: 30})}>
          {this.renderReco()}
        </div>
      </div>
    );
  }
}

Recognition.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    reco: {
      display: 'table',
      width: '100%',
    },
    container: {
      backgroundColor: UI.darkBlue,
      display: 'table-cell',
      float: 'none',
      height: 200,
      tablet: {
        height: '100%',
      },
      desktop: {
        height: '100%',
      },
    },
    image: {
      width: '100%',
    },
    line: {
      position: 'absolute',
      bottom: -20,
      padding: '0px 20px',
    },
    title: {
      marginBottom: 5,
      tablet: {
        marginBottom: 10,
      },
      desktop: {
        marginBottom: 20,
      },
    },
    author: {},
  };
};

