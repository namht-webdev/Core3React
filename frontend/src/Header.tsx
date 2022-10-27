import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { UserIcon } from './Icon';
export const Header = () => {
  const [SearchParams] = useSearchParams();
  const criteria = SearchParams.get('criteria') || '';
  const [search, setSearch] = useState(criteria);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  return (
    <div className="header">
      <Link className="text-[24px] font-bold text-[#383737]" to="/">
        Q & A
      </Link>
      <form>
        <input
          className="search-box"
          type="text"
          placeholder="Search..."
          onChange={handleSearchInputChange}
          value={search}
        />
      </form>
      <Link to="/signin">
        <UserIcon />
        <span className="ml-[10px]">Sign In</span>
      </Link>
    </div>
  );
};
