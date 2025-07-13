import { Notebook } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { NoteContext } from '../../ContextApi/useContext';
import { fetchAllNotes } from '../../Api/notesApi';
import NoteCard from '../Cards/NoteCard';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const { auth_token } = useContext(NoteContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetchAllNotes();
        if (res.status === 200) {
          setNotes(res.data);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteUpdated = (updatedNote) => {
    setNotes(notes.map(n =>
      n._id === updatedNote._id ? updatedNote : n
    ));
  };

  const handleNoteDeleted = (deletedId) => {
    setNotes(notes.filter(n => n._id !== deletedId));
  };

  return (
    <div className='mx-2'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold sm:mb-5 my-2  flex items-center gap-2 text-gray-800 dark:text-gray-100'>
        All your notes here <Notebook size={34} />:
      </h1>

      <div className="flex flex-wrap flex-col md:flex-row gap-2 sm:gap-4">
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onNoteUpdated={handleNoteUpdated}
            onNoteDeleted={handleNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default AllNotes;