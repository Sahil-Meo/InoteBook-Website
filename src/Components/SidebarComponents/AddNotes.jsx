import { Edit, Notebook, NotebookPenIcon } from 'lucide-react';
import React, { useState, useContext, useEffect } from 'react';
import { addNewNote, fetchAllNotes } from '../../Api/notesApi';
import { toast } from 'react-toastify';
import { NoteContext } from '../../ContextApi/useContext';
import NoteCard from '../Cards/NoteCard';

const AddNotes = () => {
    const { auth_token } = useContext(NoteContext);
    const [notes, setNotes] = useState([]);
    const [value, setValue] = useState({
        title: '',
        description: '',
        tag: ''
    });

    useEffect(() => {
        const ApiCall = async () => {
            try {
                const res = await fetchAllNotes();
                if (res.status === 200) {
                    setNotes(res.data);
                }
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };
        ApiCall();
    }, []);

    const handleAddNote = async () => {
        if (!value.title || !value.description) {
            toast.error('Title and Description are required');
            return;
        }

        try {
            const response = await addNewNote(value);
            if (response.status === 200) {
                setNotes([response.data, ...notes]);
                setValue({ title: '', description: '', tag: '' });
                toast.success('Note added successfully!');
            }
        } catch (error) {
            console.error('Note add error:', error);
            toast.error('Server error while adding note');
        }
    };

    const handleNoteUpdated = (updatedNote) => {
        setNotes(notes.map(n =>
            n._id === updatedNote._id ? updatedNote : n
        ));
    };

    const handleNoteDeleted = (deletedId) => {
        setNotes(notes.filter(n => n._id !== deletedId));
    };

    const handleCancelNote = () => {
        setValue({ title: '', description: '', tag: '' });
    };

    return (
        <div className="mx-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold sm:mb-5 my-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                Your new notes <Notebook size={34} />:
            </h1>

            <div className="flex flex-col md:flex-row gap-2 sm:gap-4 flex-wrap">
                {notes.map(note => (
                    <NoteCard
                        key={note._id}
                        note={note}
                        onNoteUpdated={handleNoteUpdated}
                        onNoteDeleted={handleNoteDeleted}
                    />
                ))}
            </div>

            <div className="w-full border border-gray-400 sm:my-5 my-2"></div>

            <div className="flex flex-col max-w-full p-2 sm:p-4 m-2 sm:m-0 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                        <NotebookPenIcon size={38} />
                        <input
                            type="text"
                            value={value.title}
                            onChange={(e) => setValue({ ...value, title: e.target.value })}
                            placeholder="Title"
                            className="w-full p-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 bg-white dark:bg-gray-800"
                        />
                    </h1>

                    <textarea
                        value={value.description}
                        onChange={(e) => setValue({ ...value, description: e.target.value })}
                        rows={3}
                        placeholder="Description"
                        className="w-full p-2 text-base dark:text-gray-100 rounded-md resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 bg-white dark:bg-gray-800"
                    />

                    <input
                        type="text"
                        value={value.tag}
                        onChange={(e) => setValue({ ...value, tag: e.target.value })}
                        placeholder="Tag"
                        className="w-full mt-2 p-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="flex items-center justify-end gap-2 w-full mt-4">
                    <button
                        onClick={handleAddNote}
                        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition duration-200"
                    >
                        Add Note <Edit size={16} />
                    </button>

                    <button
                        onClick={handleCancelNote}
                        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-gray-200 text-red-600 hover:bg-gray-300 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNotes;