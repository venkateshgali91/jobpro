import React, { useState } from 'react';
import Modal from 'components/organisms/Modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useModals } from 'providers/modals/context';
import useUser from 'hooks/useUser';
import { handleApiResponse } from 'utils/handleApiResponse';
import { AccountDataModalProps } from '../../../pages/SettingsPage/partials/modals/AccountData/_interface';

const ChangeCVModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm();
  const { closeModal } = useModals();
  const { updateUser } = useUser();
  const [cvPdf, setCvPdf] = useState<File | null>(null);

  const formID = 'cvForm';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCvPdf(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();

    if (cvPdf) {
      formData.append('cv', cvPdf);
    } else {
      alert('No file selected');
      return;
    }

    try {
      const response = await updateUser(formData);
      handleApiResponse(response, closeModal, methods.setError);
    } catch (error) {
      console.error('Error updating CV:', error);
      alert('Failed to update CV');
    }
  };

  return (
    <Modal title={`${action} your CV`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="file"
              name="cv"
              accept=".pdf"
              onChange={handleFileChange}
              placeholder="Upload PDF file"
              className="form-control"
            />
            {defaultValue && <p>Current CV: {defaultValue}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            {action}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ChangeCVModal;
