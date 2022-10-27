import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { UserIcon } from './Icon';
export const Header = () => {
  const [search, setSearch] = useSearchParams();
  const criteria = search.get('criteria') || '';

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({ criteria: e.target.value });
    console.log(search);
  };
  return (
    <div className="header">
      <Link className="text-[24px] font-bold text-[#383737]" to="/">
        Q & A
      </Link>
      <input
        className="search-box"
        type="text"
        placeholder="Search..."
        onChange={handleSearchInputChange}
      />
      <Link to="/signin">
        <UserIcon />
        <span className="ml-[10px]">Sign In</span>
      </Link>
    </div>
  );
};
