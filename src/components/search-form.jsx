import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';

const propTypes = {
  searchTerm: PropTypes.string,
  placeholder: PropTypes.string,
  formClassName: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  searchTerm: '',
  placeholder: '',
  formClassName: '',
  onChange: null,
  onSubmit: null
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

    const { searchTerm } = this.state;
    const { onSubmit } = this.props;

    onSubmit && onSubmit(searchTerm);
  }

  render() {
    const { placeholder, formClassName } = this.props;
    const { searchTerm } = this.state;

    return (
      <Form className={formClassName} onSubmit={this.onSubmit}>
        <InputGroup>
          <FormControl
            value={searchTerm}
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
