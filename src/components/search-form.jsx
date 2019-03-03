import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';

const propTypes = {
  placeholder: PropTypes.string,
  formClassName: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  placeholder: '',
  formClassName: '',
  onChange: null,
  onSubmit: null
};

class SearchForm extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      searchText: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const searchText = event.target.value;
    const { onChange } = this.props;

    this.setState({ searchText }, () => onChange && onChange(searchText));
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { searchText } = this.state;
    const { onSubmit } = this.props;

    onSubmit && onSubmit(searchText);
  }

  render() {
    const { placeholder, formClassName } = this.props;
    const { searchText } = this.state;

    return (
      <Form className={formClassName} onSubmit={this.onSubmit}>
        <InputGroup>
          <FormControl
            value={searchText}
            placeholder={placeholder}
            onChange={this.onChange}
          />
          <InputGroup.Append>
            <Button type="submit">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

SearchForm.defaultProps = defaultProps;
SearchForm.propTypes = propTypes;

export default SearchForm;
