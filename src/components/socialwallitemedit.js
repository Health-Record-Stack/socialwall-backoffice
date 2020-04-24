import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { htmlEncode } from 'htmlencode';
import decode from 'decode-html';

import 'react-datepicker/dist/react-datepicker.css';

const SocialwallItemEdit = ({
  item,
  handleHTMLUpdate,
  handleTimeUpdate,
  handleSubmit,
}) => (
  <form>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>HTML Content</Form.Label>
      <Form.Control
        as="textarea"
        rows="6"
        value={decode(item.html)}
        onChange={(event) => handleHTMLUpdate(htmlEncode(event.target.value))}
      />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Created On</Form.Label>
      <DatePicker
        selected={moment(item.createdon).toDate()}
        onChange={handleTimeUpdate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="form-control"
      />
    </Form.Group>
    <button type="button" onClick={handleSubmit}>
      Save
    </button>
  </form>
);

SocialwallItemEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTimeUpdate: PropTypes.func.isRequired,
  handleHTMLUpdate: PropTypes.func.isRequired,
  item: PropTypes.shape({
    createdon: PropTypes.string,
    _id: PropTypes.string,
    type: PropTypes.string,
    html: PropTypes.string,
    links: PropTypes.object,
  }).isRequired,
};

export default SocialwallItemEdit;
