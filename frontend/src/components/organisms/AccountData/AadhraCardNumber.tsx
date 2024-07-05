import Input from 'components/molecules/Input';
import Modal from 'components/organisms/Modal';
import useUser from 'hooks/useUser';
import { useModals } from 'providers/modals/context';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { handleApiResponse } from 'utils/handleApiResponse';
import { validSchemas } from 'utils/Validators/validatorsSchemas';
import { AccountDataModalProps } from '../../../pages/SettingsPage/partials/modals/AccountData/_interface';

const AadharCardNumberModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm({
    defaultValues: {
      aadhar_card: defaultValue || '',
    },
  });

  const { closeModal } = useModals();
  const { updateUser } = useUser();
  const formID = 'AadharCardNumberForm';

  const onSubmit = async (formValues: FieldValues) => {
    const { aadhar_card } = formValues;

    try {
      const response = await updateUser({ aadhar_card });
      handleApiResponse(response, closeModal, methods.setError);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal title={`${action} Aadhar Card Number`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            placeholder="Aadhar Card Number"
            validators={validSchemas.phone}
            {...methods.register('aadhar_card')}
          />
          <button type="submit">{action}</button>
        </form>
      </FormProvider>
      <div>
        <strong>Entered Aadhar Card Number:</strong> {methods.watch('aadhar_card')}
      </div>
    </Modal>
  );
};

export default AadharCardNumberModal;
