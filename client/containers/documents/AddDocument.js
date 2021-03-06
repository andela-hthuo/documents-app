import humps from 'humps';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { addDocument } from 'app/actions/DocumentActions';
import DocumentForm from 'app/components/documents/DocumentForm';
import createForm from 'app/containers/util/createForm';
import authenticate from 'app/containers/util/authenticate';

export function submit(values) {
  return new Promise((resolve, reject) => {
    const { addDocument: boundAddDocument } = this.props;
    boundAddDocument(humps.decamelizeKeys(values)).then(() => {
      const { error, pushToHistory, document: doc } = this.props;
      if (!error) {
        pushToHistory(`/documents/${doc}`);
        resolve();
      } else {
        this.showSnackbar(error.error);
        this.setState({
          errors: Object.assign({}, this.state.errors, error.messages),
        });
        reject(error.error);
      }
    });
  });
}

export const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 100) {
    errors.title = 'Title is too long';
  }
  if (!values.content) {
    errors.content = 'Required';
  } else if (values.content.length > 10000000) {
  // 10 million is a good estimate of where the text is pushing close to the
  // 16mb limit by MongoDB
    errors.content = 'Content is too long';
  }
  return errors;
};

export const AddDocument = authenticate(createForm(
  submit,
  validate
)(DocumentForm));

export const mapStateToProps = state => state.addDocument;

export default connect(
  mapStateToProps, {
    pushToHistory: push,
    addDocument,
  }
)(AddDocument);
