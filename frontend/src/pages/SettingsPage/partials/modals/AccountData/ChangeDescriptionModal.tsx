import Modal from 'components/organisms/Modal'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { handleApiResponse } from 'utils/handleApiResponse'
import { AccountDataModalProps } from './_interface'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useModals } from 'providers/modals/context'
import useUser from 'hooks/useUser'

const ChangeDescriptionModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const formID = 'descriptionForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { description } = formValues

    const response = await updateUser({ description })

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title={`${action} your description`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="description"
            placeholder="Aadhar Card Number"
            defaultValue={defaultValue}
            validators={{ maxLength: valid.maxLength(12) }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ChangeDescriptionModal
