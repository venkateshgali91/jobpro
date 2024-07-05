import Input from 'components/molecules/Input';
import Modal from 'components/organisms/Modal';
import useUser from 'hooks/useUser';
import { useModals } from 'providers/modals/context';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { handleApiResponse } from 'utils/handleApiResponse';
import { AccountDataModalProps } from '../../../pages/SettingsPage/partials/modals/AccountData/_interface';

const ChangeSkillSetModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm();
  const { closeModal } = useModals();
  const { updateUser } = useUser();

  const formID = 'skillSetForm';

  const onSubmit = async (formValues: FieldValues) => {
    const { skillset } = formValues;

    const response = await updateUser({ skillset });

    handleApiResponse(response, closeModal, methods.setError);
  };

  return (
    <Modal title={`${action} skill set`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="skillset"
            placeholder="Skill set"
            defaultValue={defaultValue}
            validators={{ required: true }}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ChangeSkillSetModal;
