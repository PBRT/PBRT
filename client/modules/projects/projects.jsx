import Section from 'section.jsx';
import Item from './item.jsx';

var Masonry = require('react-masonry-component')(React);
import {list} from './projects.constant.js';

export default class Projects extends React.Component{
  constructor(props) {
    super(props);
    this.renderProjects = this.renderProjects.bind(this);
  }
  renderProjects() {
    return list.map((item, index) => {
      return (
        <Item
          key={index}
          isLast={(list.length -1) === index}
          item={item}/>
      );
    });
  }
  render() {

    return (
      <div>
        <Section
          title='Projects'
          subtitle=
            'I love my job. I build professional products by day and do my own hacks whenever I get a spare minute.'
          isLast={this.props.isLast}
          backgroundColor={UI.lightGrey}>
          <Masonry className={'row'}>
            {this.renderProjects()}
          </Masonry>
        </Section>
      </div>
    );
  }
}

Projects.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};
