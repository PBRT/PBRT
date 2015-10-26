import Section from 'section.jsx';
import Button from 'button.jsx';
var s = getStyle();

export default class Contact extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isNameError: false,
      isNameBlur: false,
      isNameVirgin: true,
      isNameFocus: false,
      mail: '',
      isMailError: false,
      isMailBlur: false,
      isMailVirgin: true,
      isMailFocus: false,
      text: '',
      isTextError: false,
      isTextBlur: false,
      isTextVirgin: true,
      isTextFocus: false,
      isGlobalError: false,
      isLoading: false,
      isSent: false,
    };
    this.submit = this.submit.bind(this);
    this.checkError = this.checkError.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleNameFocus = this.handleNameFocus.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handleMailBlur = this.handleMailBlur.bind(this);
    this.handleMailFocus = this.handleMailFocus.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextBlur = this.handleTextBlur.bind(this);
    this.handleTextFocus = this.handleTextFocus.bind(this);
  }
  submit() {
    if (this.checkError()) {
      this.setState({
        isNameError: this.state.name.length === 0,
        isMailError: ((this.state.mail.length === 0) || this.testMail(this.state.mail)),
        isTextError: this.state.text.length === 0,
      });
    } else {
      this.setState({isLoading: true});
      $.post('/mail', {
        name: this.state.name,
        email: this.state.mail,
        details: this.state.text,
      }, res  => {
        if (res.error) {
          this.setState({isGlobalError: true});
        } else {
          this.setState({
            isLoading: false,
            name: '',
            mail: '',
            text: '',
            isNameVirgin: true,
            isMailVirgin: true,
            isTextVirgin: true,
            isSent: true,
          });
        }
      });
    }
  }
  checkError() {
    return (
      this.state.name.length === 0 ||
      this.state.mail.length === 0 ||
      this.testMail(this.state.mail) ||
      this.state.text.length === 0
    );
  }
  handleNameChange(event) {
    this.setState({
      name: event.target.value,
      isNameVirgin: false,
      isNameError: !(event.target.value.length > 0)
    });
  }
  handleNameFocus() {
    this.setState({isNameFocus: true});
  }
  handleNameBlur() {
    this.setState({
      isNameFocus: false,
      isNameBlur: true,
      isNameError: (!(this.state.name.length > 0) && !this.state.isNameVirgin)
    });
  }
  handleMailChange(event) {
    this.setState({
      mail: event.target.value,
      isMailVirgin: false,
      isMailError: !(event.target.value.length > 0) || this.testMail(event.target.value)
    });
  }
  handleMailBlur() {
    this.setState({
      isMailBlur: true,
      isMailFocus: false,
      isMailError: ((!(this.state.mail.length > 0) || this.testMail(this.state.mail)) && !this.state.isMailVirgin)
    });
  }
  testMail(email) {
    var rule = /^([\w-+.]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return !rule.test(email);
  }
  handleMailFocus() {
    this.setState({isMailFocus: true});
  }
  handleTextChange(event) {
    this.setState({
      text: event.target.value,
      isTextVirgin: false,
      isTextError: !(event.target.value.length > 0)
    });
  }
  handleTextBlur() {
    this.setState({
      isTextBlur: true,
      isTextFocus: false,
      isTextError: (!(this.state.text.length > 0)  && !this.state.isTextVirgin)
    });
  }
  handleTextFocus() {
    this.setState({isTextFocus: true});
  }
  componentDidMount() {
    $(React.findDOMNode(this.refs['name-error'])).velocity('slideUp', 0);
    $(React.findDOMNode(this.refs['mail-error'])).velocity('slideUp', 0);
    $(React.findDOMNode(this.refs['text-error'])).velocity('slideUp', 0);
    $(React.findDOMNode(this.refs['global-error'])).velocity('slideUp', 0);
    $(React.findDOMNode(this.refs['done'])).velocity('fadeOut', 0);
    $(React.findDOMNode(this.refs['spinner'])).velocity('fadeOut', 0);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isNameError !== this.state.isNameError) {
      $(React.findDOMNode(this.refs['name-error'])).velocity(this.state.isNameError ? 'slideDown' : 'slideUp', 400);
    }
    if (prevState.isMailError !== this.state.isMailError) {
      $(React.findDOMNode(this.refs['mail-error'])).velocity(this.state.isMailError ? 'slideDown' : 'slideUp', 400);
    }
    if (prevState.isTextError !== this.state.isTextError) {
      $(React.findDOMNode(this.refs['text-error'])).velocity(this.state.isTextError ? 'slideDown' : 'slideUp', 400);
    }
    if (prevState.isGlobalError !== this.state.isGlobalError) {
      $(React.findDOMNode(this.refs['global-error'])).velocity(this.state.isGlobalError ? 'slideDown' : 'slideUp', 400);
    }
    if (prevState.isLoading !== this.state.isLoading) {
      $(React.findDOMNode(this.refs['button'])).velocity({opacity: this.state.isLoading ? 0.7 : 1});
      $(React.findDOMNode(this.refs['spinner'])).velocity(this.state.isLoading ? 'fadeIn' : 'fadeOut', 200);
      $(React.findDOMNode(this.refs['text-button'])).velocity({opacity: this.state.isLoading ? 0 : 1}, 200);
    }
    if ((prevState.isSent !== this.state.isSent) && this.state.isSent){
      $(React.findDOMNode(this.refs['form'])).velocity('fadeOut', {duration: 400, complete: function() {
        $(React.findDOMNode(this.refs['done'])).velocity('fadeIn', 400);
      }.bind(this)});
    }
  }
  render() {

    let nameStyle = this.state.isNameFocus ?
      _.extend(this.context.s(s.input), this.state.isNameError ? s.error : s.focus) :
      this.state.isNameError ? _.extend(this.context.s(s.input), s.error) : this.context.s(s.input);

    let mailStyle = this.state.isMailFocus ?
      _.extend(this.context.s(s.input), this.state.isMailError ? s.error : s.focus) :
      this.state.isMailError ? _.extend(this.context.s(s.input), s.error) : this.context.s(s.input);

    let textStyle = this.state.isTextFocus ?
      _.extend(this.context.s(s.textArea), this.state.isTextError ? s.error : s.focus) :
      this.state.isTextError ? _.extend(this.context.s(s.textArea), s.error) : this.context.s(s.textArea);

    return (
      <div>
        <Section
          title='Contact me'
          subtitle='Drop me a line and lets meet for a coffee!'
          isLast={this.props.isLast}
          backgroundColor={UI.whiteBg}>
          <div style={this.context.s(s.container)} ref='form'>
            <div style={this.context.s(s.inputGroup)}>
              <input
                className='caption'
                placeholder='Your name'
                style={nameStyle}
                onChange={this.handleNameChange}
                onFocus={this.handleNameFocus}
                onBlur={this.handleNameBlur} />
              <div ref='name-error' className='caption' style={this.context.s(s.errorMsg)}>
                Please give me your full name
              </div>
            </div>
            <div style={this.context.s(s.inputGroup)}>
              <input
                className='caption'
                placeholder='Your mail'
                style={mailStyle}
                onChange={this.handleMailChange}
                onFocus={this.handleMailFocus}
                onBlur={this.handleMailBlur} />
              <div ref='mail-error' className='caption' style={this.context.s(s.errorMsg)}>
                I just need a real mail for contacting you
              </div>
            </div>
            <div style={_.extend(this.context.s(s.inputGroup), {marginBottom: 40})}>
              <textArea
                className='caption'
                placeholder='Tell me everything'
                style={textStyle}
                onChange={this.handleTextChange}
                onFocus={this.handleTextFocus}
                onBlur={this.handleTextBlur} />
              <div ref='text-error' className='caption' style={this.context.s(s.errorMsg)}>
                Some text might be helpful
              </div>
            </div>
            <div
              ref='global-error'
              className='caption'
              style={_.extend(this.context.s(s.errorMsg), {marginBottom: 20})}>
              Something went wrong, please double check the informations
            </div>
            <div className='text-center' style={s.but} ref='button'>
              <Button
                containerClass='containerSpinner'
                action={this.submit}>
                <div className='spinner' style={s.spinner} ref='spinner'>
                  <div className='rect1'></div>
                  <div className='rect2'></div>
                  <div className='rect3'></div>
                  <div className='rect4'></div>
                  <div className='rect5'></div>
                </div>
                <span className='text-white text-center headline' ref='text-button' style={s.button}>Send</span>
              </Button>
            </div>
          </div>
          <div className='text-center' ref='done'>
            <span className='text-green text-center headline'>Thank you!</span>
          </div>
        </Section>
      </div>
    );
  }
}

Contact.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
Contact.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {
    },
    errorMsg: {
      display: 'block',
      margin: 'auto',
      width: 250,
      marginTop: 10,
      color: UI.darkRed,
      tablet: {
        width: 400,
      },
      desktop: {
        width: 600,
      },
    },
    inputGroup: {
      marginBottom: 20,
      tablet: {
        marginBottom: 40,
      },
      desktop: {
        marginBottom: 40,
      },
    },
    input: {
      display: 'block',
      margin: 'auto',
      width: 250,
      padding: '10px 20px',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      border: '1px solid',
      outline: 'none',
      borderColor: UI.keyline,
      tablet: {
        width: 400,
      },
      desktop: {
        width: 600,
      },
    },
    textArea: {
      display: 'block',
      margin: 'auto',
      width: 250,
      height: 300,
      padding: '10px 20px',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      border: '1px solid',
      outline: 'none',
      borderColor: UI.keyline,
      tablet: {
        width: 400,
      },
      desktop: {
        width: 600,
      },
    },
    focus: {
      outline: '2px solid',
      outlineColor: UI.darkGreen,
    },
    error: {
      outline: '2px solid',
      outlineColor: UI.darkRed,
    },
    spinner: {
      position: 'absolute',
      margin: 0,
      left: 0,
      width: '100%',
    },
    but: {
      position: 'relative',
    },
  };
};
