import daughter from '../../assets/role/daughter.svg';
import father from '../../assets/role/father.svg';
import mother from '../../assets/role/mother.svg';
import son from '../../assets/role/son.svg';
import { FAMILY_ROLE } from '../../constants/family';
import { UserRole } from '../../types/family';

interface FamilyRoleProps {
  myRole: string;
  setMyRole: React.Dispatch<React.SetStateAction<UserRole | ''>>;
}

const RoleIcon = {
  아빠: father,
  엄마: mother,
  아들: son,
  딸: daughter,
};

const FamilyRole = ({ myRole, setMyRole }: FamilyRoleProps) => {
  const clickRoleCard = (value: UserRole) => {
    setMyRole(value);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {FAMILY_ROLE.map((role: UserRole, index: number) => {
        return (
          <div
            className={`flex items-center justify-center gap-3 rounded-3xl border border-primary-30 px-5 py-7 font-ryurue text-ryurue-base ${myRole == role ? 'bg-primary-30' : 'bg-primary-10'}`}
            key={index}
            onClick={() => clickRoleCard(role)}
          >
            <img src={RoleIcon[role as UserRole]} alt={`${role}-icon`} />
            <div>{role}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FamilyRole;
