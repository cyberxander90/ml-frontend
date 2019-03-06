/* eslint-disable import/prefer-default-export */

// save-ly get nested props
export const getNestedProps = (obj, props) =>
  props.reduce((acc, currentProp) => acc && acc[currentProp], obj);

// handle axios error to the app
export const handleAxiosError = error => {
  if (!error) {
    return error;
  }
  console.log(error);

  return {
    status:
      getNestedProps(error, ['response', 'statusText']) ||
      getNestedProps(error, ['response', 'status']) ||
      error.message,
    message: getNestedProps(error, ['response', 'data', 'message'])
  };
};
