import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const MeetingForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.meeting?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="datetime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Datetime
        </Label>

        <DatetimeLocalField
          name="datetime"
          defaultValue={formatDatetime(props.meeting?.datetime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="datetime" className="rw-field-error" />

        <Label
          name="observations"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Observations
        </Label>

        <TextField
          name="observations"
          defaultValue={props.meeting?.observations}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="observations" className="rw-field-error" />

        <Label
          name="deliverable"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Deliverable
        </Label>

        <TextField
          name="deliverable"
          defaultValue={props.meeting?.deliverable}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="deliverable" className="rw-field-error" />

        <Label
          name="cancellationReason"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cancellation reason
        </Label>

        <TextField
          name="cancellationReason"
          defaultValue={props.meeting?.cancellationReason}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="cancellationReason" className="rw-field-error" />

        <Label
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>

        <TextField
          name="location"
          defaultValue={props.meeting?.location}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="location" className="rw-field-error" />

        <Label
          name="studentAgreement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Student agreement
        </Label>

        <CheckboxField
          name="studentAgreement"
          defaultChecked={props.meeting?.studentAgreement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="studentAgreement" className="rw-field-error" />

        <Label
          name="advisorAgreement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Advisor agreement
        </Label>

        <CheckboxField
          name="advisorAgreement"
          defaultChecked={props.meeting?.advisorAgreement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="advisorAgreement" className="rw-field-error" />

        <Label
          name="advisorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Advisor id
        </Label>

        <NumberField
          name="advisorId"
          defaultValue={props.meeting?.advisorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="advisorId" className="rw-field-error" />

        <Label
          name="coadvisorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Coadvisor id
        </Label>

        <NumberField
          name="coadvisorId"
          defaultValue={props.meeting?.coadvisorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="coadvisorId" className="rw-field-error" />

        <Label
          name="studentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Student id
        </Label>

        <NumberField
          name="studentId"
          defaultValue={props.meeting?.studentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="studentId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MeetingForm
