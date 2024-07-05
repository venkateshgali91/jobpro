import Input from 'components/molecules/Input';
import Modal from 'components/organisms/Modal';
import useUser from 'hooks/useUser';
import { useModals } from 'providers/modals/context';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { handleApiResponse } from 'utils/handleApiResponse';
import { valid } from 'utils/Validators/validators';
import { AccountDataModalProps } from '../../../pages/SettingsPage/partials/modals/AccountData/_interface';

const ChangeYopModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm();
  const { closeModal } = useModals();
  const { updateUser } = useUser();

  const formID = 'yopForm';

  const onSubmit = async (formValues: FieldValues) => {
    const { yop } = formValues;

    const response = await updateUser({ yop });

    handleApiResponse(response, closeModal, methods.setError);
  };

  return (
    <Modal title={`${action} Year of Passing`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="yop"
            placeholder="Year of Passing"
            defaultValue={defaultValue}
            validators={{ required: valid.required }}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ChangeYopModal;
