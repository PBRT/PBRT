import Section from 'section.jsx';
import {experiences} from './experience.constant.js';
import Item from './item.jsx';
var s = getStyle();

export default class Experience extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      lineHeight: 700,
    };
    this.renderItems = this.renderItems.bind(this);
    this.computeLineHeight = this.computeLineHeight.bind(this);
  }
  renderItems() {
    return experiences.map((item, index) => {
      return (
        <Item
          key={index}
          isLast={(experiences.length - 1) === index}
          isLeft={index % 2 === 0}
          title={item.title}
          subtitle={item.subtitle}
          techs={item.technologies} />
      );
    });
  }
  computeLineHeight() {
    return ($(React.findDOMNode(this.refs.container)).height() + 100);
  }
  componentDidMount() {
    this.setState({lineHeight: this.computeLineHeight()});
  }
  componentDidUpdate(nextProps, nextState, nextContext) {
    if (this.context.hasBeenResized !== nextContext.hasBeenResized) {
      this.setState({lineHeight: this.computeLineHeight()});
    }
  }
  render() {

    return (
      <div>
        <Section
          title='What I did'
          subtitle='2+ years of experience in web development. Coming from a MS Degree in Computer Science'
          isLast={this.props.isLast}
          backgroundColor={UI.lightGrey}>
          <div ref='container' style={this.context.s(s.itemsContainer)}>
            <div style={this.context.s(s.today)} className='text-blue caption text-bold'>TODAY</div>
            <div style={_.extend(this.context.s(s.imageContainer), {height: this.state.lineHeight})}>
              <img style={s.line} src={require('./assets/line.svg')}/>
            </div>
            <div style={this.context.s(s.items)}>
              {this.renderItems()}
            </div>
            <div style={this.context.s(s.first)} className='text-blue caption text-bold'>2013</div>
          </div>
        </Section>
      </div>
    );
  }
}

Experience.contextTypes = {
  s: React.PropTypes.func.isRequired,
  hasBeenResized: React.PropTypes.bool.isRequired,
};
Experience.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    itemsContainer: {
      display: 'inline-block',
      position: 'relative',
      paddingLeft: 30,
      marginTop: 10,
      tablet: {
        display: 'table',
        paddingBottom: 80,
        paddingLeft: 0,
      },
      desktop: {
        display: 'table',
        paddingBottom: 80,
        paddingLeft: 0,
      },
    },
    items: {
      marginTop: 40,
    },
    button: {
      padding: '0 20px',
    },
    imageContainer: {
      position: 'absolute',
      left: 20,
      display: 'none',
      left: '50%',
      transform: 'translateX(-50%)',
      tablet: {
        display: 'block',
      },
      desktop: {
        display: 'block',
      },
    },
    line: {
      height: '100%',
    },
    today: {
      position: 'absolute',
      top: -30,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'none',
      tablet: {
        display: 'block',
        top: -20,
      },
      desktop: {
        display: 'block',
        top: -40,
      },
    },
    first: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: -60,
      display: 'none',
      tablet: {
        display: 'block',
        bottom: -40
      },
      desktop: {
        display: 'block',
        bottom: -60
      },
    },
  };
};
