import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const GoalForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.goal?.id)
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
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.goal?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="completionDeadline"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completion deadline
        </Label>

        <DatetimeLocalField
          name="completionDeadline"
          defaultValue={formatDatetime(props.goal?.completionDeadline)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="completionDeadline" className="rw-field-error" />

        <Label
          name="completionDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completion date
        </Label>

        <DatetimeLocalField
          name="completionDate"
          defaultValue={formatDatetime(props.goal?.completionDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="completionDate" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.goal?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="observation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Observation
        </Label>

        <TextField
          name="observation"
          defaultValue={props.goal?.observation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="observation" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GoalForm
