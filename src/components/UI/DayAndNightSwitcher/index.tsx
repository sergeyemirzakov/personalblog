import { KeyboardEvent } from 'react';

interface DayAndNightSwitcherProps {
  colorMode: string;
  onChange: () => void;
}

const DayAndNightSwitcher = ({ colorMode, onChange }: DayAndNightSwitcherProps) => {
  if (!colorMode) return null;

  const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onChange();
  };

  return (
    <div
      role='button'
      onKeyDown={onKeyDownHandler}
      tabIndex={0}
      className='toggleWrapper'
    >
      <input
        readOnly
        type='checkbox'
        className='dn'
        id='dn'
        onChange={onChange}
        tabIndex={-1}
        checked={colorMode !== 'light'}
      />
      <label htmlFor='dn' className='toggle'>
        <span className='toggle__handler'>
          <span className='crater crater--1'></span>
          <span className='crater crater--2'></span>
          <span className='crater crater--3'></span>
        </span>
        <span className='star star--1'></span>
        <span className='star star--2'></span>
        <span className='star star--3'></span>
        <span className='star star--4'></span>
      </label>
    </div>
  );
};

export default DayAndNightSwitcher;
