import React from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';

import './search-form.scss';
import SpeechRecognitionForm from 'components/speech-recognition-form';

const defaultProps = {
  searchTerm: '',
  placeholder: 'Nunca dejes de buscar'
};

class SearchForm extends React.Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      searchTerm: props.searchTerm
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectSearchTerm = this.onSelectSearchTerm.bind(this);
  }

  componentDidUpdate(preProps) {
    if (preProps.searchTerm !== this.props.searchTerm) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ searchTerm: this.props.searchTerm });
    }
  }

  onChange(event) {
    const searchTerm = event.target.value;
    const { onChange } = this.props;

    this.setState({ searchTerm }, () => onChange && onChange(searchTerm));
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { onSubmit } = this.props;
    const searchTerm = this.state.searchTerm.trim();
    onSubmit && searchTerm && onSubmit(searchTerm);
  }

  onSelectSearchTerm(searchTerm) {
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    const { onSubmit } = this.props;
    this.setState({ searchTerm }, () => onSubmit && onSubmit(searchTerm));
  }

  render() {
    const { placeholder, formClassName } = this.props;
    const { searchTerm } = this.state;

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
            name="search"
            type="text"
            autoFocus
          />
          <InputGroup.Append>
            {/* <SpeechRecognitionForm /> */}
            <InputGroup.Text className="search-form__speech">
              <SpeechRecognitionForm onSubmit={this.onSelectSearchTerm} />
            </InputGroup.Text>
            <Button type="submit" className="search-form__submit">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

SearchForm.defaultProps = defaultProps;

export default SearchForm;
