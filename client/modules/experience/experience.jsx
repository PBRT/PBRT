import Section from 'section.jsx';
import {experiences} from './experience.constant.js';
import Item from './item.jsx';
var s = getStyle();

export default class Experience extends React.Component{
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
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
          icon={item.icon}
          date={item.date}
          techs={item.technologies} />
      );
    });
  }
  render() {
    return (
      <div>
        <Section
          title='What I did'
          subtitle='2+ years of experience in web development. MS Degree in Computer Science and embedded systems.'
          isLast={this.props.isLast}
          backgroundColor={UI.lightGrey}>
          <div style={this.context.s(s.itemsContainer)}>
            <div style={_.extend(this.context.s(s.imageContainer), {height: this.context.isDesktop ? 1480 : 1420})}>
              <img style={s.line} src={require('./assets/line.svg')}/>
            </div>
            <div style={this.context.s(s.today)} className='text-blue caption text-bold'>TODAY</div>
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
  isDesktop: React.PropTypes.bool.isRequired,
};
Experience.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    itemsContainer: {
      display: 'inline-block',
      position: 'relative',
      paddingLeft: 10,
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
      marginTop: 0,
      tablet: {
        marginTop: 80,
      },
      desktop: {
        marginTop: 80
      },
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
      top: 30,
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
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'none',
      width: 6,
      tablet: {
        display: 'inherit',
        top: 0,
      },
      desktop: {
        display: 'inherit',
        top: 0,
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
        bottom: 0,
      },
      desktop: {
        display: 'block',
        bottom: -20,
      },
    },
  };
};
