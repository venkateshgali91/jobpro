import Tile from 'components/atoms/Tile';
import { UserContext } from 'providers/user/context';
import { useContext } from 'react';
import { useModals } from 'providers/modals/context';
import SettingsTileHeader from 'components/molecules/SettingsTileHeader';
import SettingsTileRecord from 'components/molecules/SettingsTileRecord';
import FirstNameModal from 'pages/SettingsPage/partials/modals/AccountData/FirstNameModal';
import LastNameModal from 'pages/SettingsPage/partials/modals/AccountData/LastNameModal';
import ChangePasswordModal from 'pages/SettingsPage/partials/modals/AccountData/ChangePasswordModal';
import PhoneNumberModal from 'components/organisms/AccountData/PhoneNumberModal';
import ChangeSkillSetModal from './ChangeSkillSetModal';
import ChangeCVModal from './ChangeCvModal';
import ChangeYopModal from './ChangeYopModal';
import ChangeQualificationModal from './ChangeQualificationModal';
import './style.scss';

const AccountData = () => {
  const { userData } = useContext(UserContext);
  const { openModal } = useModals();

  return (
    <Tile shadow="light">
      <div className="account-data">
        <SettingsTileHeader title="Account settings" />
        <SettingsTileRecord
          label="First name"
          value={userData.firstName}
          button={
            !userData.firstName
              ? {
                  text: 'Add',
                  onClick: () => openModal(<FirstNameModal action="Add" />),
                }
              : undefined
          }
        />
        <SettingsTileRecord
          label="Last name"
          value={userData.lastName}
          button={
            !userData.lastName
              ? {
                  text: 'Add',
                  onClick: () => openModal(<LastNameModal action="Add" />),
                }
              : undefined
          }
        />
        <SettingsTileRecord className="tile__record" label="Email" value={userData.email} />
        <SettingsTileRecord
          label="Password"
          value="*******"
          valueType="password"
          button={{ text: 'Update', onClick: () => openModal(<ChangePasswordModal />) }}
        />
        <SettingsTileRecord
          label="Phone number"
          value={userData.phoneNumber || ''}
          button={
            !userData.phoneNumber
              ? {
                  text: 'Add',
                  onClick: () => openModal(<PhoneNumberModal action="Add" />),
                }
              : undefined
          }
        />
        <SettingsTileRecord
          label="Skill Set"
          value={userData.skillset || ''}
          button={
            !userData.skillset
              ? {
                  text: 'Add',
                  onClick: () => openModal(<ChangeSkillSetModal action="Add" />),
                }
              : {
                  text: 'Update',
                  onClick: () =>
                    openModal(<ChangeSkillSetModal action="Update" defaultValue={userData.skillset} />),
                }
          }
        />
        <SettingsTileRecord
          label="CV"
          value={userData.cv || 'No CV uploaded'}
          button={
            !userData.cv
              ? {
                  text: 'Add',
                  onClick: () => openModal(<ChangeCVModal action="Add" />),
                }
              : {
                  text: 'Update',
                  onClick: () =>
                    openModal(<ChangeCVModal action="Update" defaultValue={userData.cv} />),
                }
          }
        />

        <SettingsTileRecord
          label="Year of Passing"
          value={userData.yop || ''}
          button={
            !userData.yop
              ? {
                  text: 'Add',
                  onClick: () => openModal(<ChangeYopModal action="Add" />),
                }
              : undefined
          }
        />
        <SettingsTileRecord
          label="Qualification"
          value={userData.quali || ''}
          button={
            !userData.quali
              ? {
                  text: 'Add',
                  onClick: () => openModal(<ChangeQualificationModal action="Add" />),
                }
              : undefined
          }
        />
      </div>
    </Tile>
  );
};

export default AccountData;
