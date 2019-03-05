import React from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  ListGroup,
  Image
} from 'react-bootstrap';

import './search-form.scss';
import SpeechRecognitionForm from 'components/speech-recognition-form';
import enhanceWithClickOutside from 'react-click-outside';
import { getProductOptions } from 'services/products';

const defaultProps = {
  searchTerm: '',
  placeholder: 'Nunca dejes de buscar'
};

class SearchForm extends React.Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      searchTerm: props.searchTerm,
      isListOptionsActive: false,
      options: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectSearchTerm = this.onSelectSearchTerm.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ searchTerm: this.props.searchTerm });
    }
  }

  onChange(event) {
    const searchTerm = event.target.value;
    const { onChange } = this.props;

    const hastToFindOptions = searchTerm.trim() != this.state.searchTerm.trim();
    const newState = { searchTerm };
    if (hastToFindOptions) {
      newState.options = [];
    }

    this.setState(newState, () => {
      onChange && onChange(searchTerm);

      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => {
        this.updateOptions(searchTerm);
      }, 400);
    });
    // todo update options
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { onSubmit } = this.props;
    const searchTerm = this.state.searchTerm.trim();
    searchTerm && onSubmit && onSubmit(searchTerm);
    this.setState({ isListOptionsActive: false });
  }

  onSelectSearchTerm(searchTerm) {
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    const { onSubmit } = this.props;
    this.setState(
      { searchTerm, isListOptionsActive: false },
      () => onSubmit && onSubmit(searchTerm)
    );
  }

  onClick() {
    this.setState({ isListOptionsActive: true });
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.setState({ isListOptionsActive: false });
    }
  }

  handleClickOutside() {
    this.setState({ isListOptionsActive: false });
  }

  updateOptions(searchTerm) {
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    getProductOptions(searchTerm).then(({ data }) => {
      if (this.state.searchTerm !== searchTerm) {
        return;
      }
      this.setState({
        options: data.suggested_queries.map(item => item.q)
      });
    });
  }

  renderOptions(options) {
    return options.map(option => (
      <ListGroup.Item
        key={option}
        onClick={() => this.onSelectSearchTerm(option)}
      >
        <div className="search-form__option-item">
          <Image
            className="search-form__option-img"
            src="/assets/search.png"
            alt="search"
          />
          <span className="search-form__option-value">{option}</span>
        </div>
      </ListGroup.Item>
    ));
  }

  render() {
    const { placeholder, formClassName } = this.props;
    const { searchTerm, options, isListOptionsActive } = this.state;
    const optionListClass = `search-form__options ${isListOptionsActive &&
      options.length > 0 &&
      'search-form__options--visible'}`;

    return (
      <Form
        action="/items"
        className={`search-form ${formClassName}`}
        onSubmit={this.onSubmit}
      >
        <InputGroup>
          <p>{this.props.transcript}</p>
          <FormControl
            className="form-control search-form__input"
            value={searchTerm}
            placeholder={placeholder}
            onChange={this.onChange}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
          />
          <InputGroup.Append>
            <InputGroup.Text className="search-form__speech">
              <SpeechRecognitionForm onSubmit={this.onSelectSearchTerm} />
            </InputGroup.Text>
            <Button
              variant="light"
              type="submit"
              className="search-form__submit"
              style={{ color: 'transparent' }}
            >
              Search
            </Button>
          </InputGroup.Append>

          <ListGroup className={optionListClass}>
            {this.renderOptions(options)}
          </ListGroup>
        </InputGroup>
      </Form>
    );
  }
}

SearchForm.defaultProps = defaultProps;

export default enhanceWithClickOutside(SearchForm);
