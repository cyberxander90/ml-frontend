import React from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';

import './search-form.scss';

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
  }

  componentDidUpdate(preProps) {
    console.log('here');
    if (preProps.searchTerm !== this.props.searchTerm) {
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

  render() {
    const { placeholder, formClassName } = this.props;
    const { searchTerm } = this.state;

    return (
      <Form className={`search-form ${formClassName}`} onSubmit={this.onSubmit}>
        <InputGroup>
          <FormControl
            className="search-form__input"
            value={searchTerm}
            placeholder={placeholder}
            onChange={this.onChange}
          />
          <InputGroup.Append>
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
