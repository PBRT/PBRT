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
          subtitle={item.subtitle} />
      );
    });
  }
  render() {

    return (
      <div>
        <Section
          title='What I did'
          subtitle='2+ years of experience in web development. Coming from a MS Degree in Computer Science'
          isLast={this.props.isLast}
          backgroundColor={UI.lightGrey}>
          <div style={this.context.s(s.itemsContainer)}>
            {this.renderItems()}
          </div>
        </Section>
      </div>
    );
  }
}

Experience.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
Experience.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    itemsContainer: {
      display: 'block',
      tablet: {
        display: 'table',
        marginBottom: 80,
      },
      desktop: {
        display: 'table',
        marginBottom: 80,
      },
    },
    button: {
      padding: '0 20px',
    },
  };
};
