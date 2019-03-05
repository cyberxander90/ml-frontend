import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import SpeechRecognition from 'react-speech-recognition';
import { Translate } from 'react-localize-redux';

import './speech-recognition-form.scss';

class SpeechRecognitionForm extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { isModalOpen: false };

    this.onCancel = this.onCancel.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  onCancel() {
    this.close();
  }

  onAccept() {
    const { transcript, onSubmit } = this.props;
    this.close();
    onSubmit && onSubmit(transcript);
  }

  openModal() {
    this.props.resetTranscript();
    this.props.startListening();
    this.setState({ isModalOpen: true });
  }

  close() {
    this.props.resetTranscript();
    this.props.stopListening();
    this.setState({ isModalOpen: false });
  }

  render() {
    const { browserSupportsSpeechRecognition, transcript } = this.props;
    return (
      <React.Fragment>
        {browserSupportsSpeechRecognition && (
          <Image
            className="speech__icon"
            src="/assets/speech.png"
            alt="speech"
            onClick={this.openModal}
          />
        )}
        <Modal show={this.state.isModalOpen} onHide={this.onCancel}>
          <Modal.Header>
            <Modal.Title>
              <Translate id="speech.text" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              className="speech__active-icon"
              src="/assets/speech.png"
              alt="speech"
            />
            {transcript}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onCancel}>
              <Translate id="speech.cancel" />
            </Button>
            <Button variant="primary" onClick={this.onAccept}>
              <Translate id="speech.accept" />
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SpeechRecognition({
  autoStart: false
})(SpeechRecognitionForm);
