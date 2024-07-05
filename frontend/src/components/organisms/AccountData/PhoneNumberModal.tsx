import Input from 'components/molecules/Input';
import Modal from 'components/organisms/Modal';
import useUser from 'hooks/useUser';
import { useModals } from 'providers/modals/context';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { handleApiResponse } from 'utils/handleApiResponse';
import { valid } from 'utils/Validators/validators';
import { validSchemas } from 'utils/Validators/validatorsSchemas';
import { AccountDataModalProps } from '../../../pages/SettingsPage/partials/modals/AccountData/_interface';

const PhoneNumberModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm();
  const { closeModal } = useModals();
  const { updateUser } = useUser();

  const formID = 'phoneNumberForm';

  const onSubmit = async (formValues: FieldValues) => {
    const { phoneNumber } = formValues;

    const response = await updateUser({ phoneNumber });

    handleApiResponse(response, closeModal, methods.setError);
  };

  return (
    <Modal title={`${action} phone number`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="phoneNumber"
            placeholder="Phone number"
            defaultValue={defaultValue}
            validators={{ required: valid.required, ...validSchemas.phone }}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default PhoneNumberModal;
