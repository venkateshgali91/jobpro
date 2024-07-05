import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import Tile from 'components/atoms/Tile'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import { useModals } from 'providers/modals/context'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
//import ChangeSkillSetModal from 'pages/SettingsPage/partials/modals/AccountData/ChangeSkillSetModal' // Ensure this is the correct path or create this modal if needed
import ChangeSkillSetModal from './ChangeSkillSetModal';
export interface SkillSetDataProps {
  className?: string
}

const SkillSetData = ({ className }: SkillSetDataProps) => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="skill-set-data" className={className} shadow="light">
      <SettingsTileHeader title="Skill Set" />
      <SettingsTileRecord
        label="Skill Set"
        value={userData.skillset || ''} // Updated field name from description to skills
        button={
          !userData.skillset // Updated field name from description to skills
            ? {
                text: 'Add',
                onClick: () => openModal(<ChangeSkillSetModal action="Add" />) // Updated modal to ChangeSkillSetModal
              }
            : undefined
        }
      />
    </Tile>
  )
}

export default SkillSetData
