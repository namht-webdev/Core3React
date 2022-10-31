import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState, FormEvent } from 'react';
import { UserIcon } from './Icon';
export const Header = () => {
  const [search, setSearch] = useSearchParams();
  const criteria = search.get('criteria') || '';
  const navigate = useNavigate();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({ criteria: e.target.value });
  };
  const handleSeachSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?criteria=${criteria}`);
  };
  return (
    <div className="header">
      <Link className="text-[24px] font-bold text-[#383737]" to="/">
        Q & A
      </Link>
      <form onSubmit={handleSeachSubmit}>
        <input
          className="search-box"
          type="text"
          placeholder="Search..."
          onChange={handleSearchInputChange}
        />
      </form>
      <Link to="/signin">
        <UserIcon />
        <span className="ml-[10px]">Sign In</span>
      </Link>
    </div>
  );
};
