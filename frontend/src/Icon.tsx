import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export const UserIcon = () => {
  return (
    <div className="inline-block w-3 opacity-[0.6]">
      <FontAwesomeIcon icon={faUser} />
    </div>
  );
};
