import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);


  // className="animate__animated animate__fadeIn"
  return (
    <div className='journal__main-content animate__animated animate__fadeIn'>
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
