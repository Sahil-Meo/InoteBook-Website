import { Notebook, Edit, Trash2Icon, Save } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateNote, deleteNote } from '../../Api/notesApi';

const NoteCard = ({
     note,
     onNoteUpdated,
     onNoteDeleted
}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [editData, setEditData] = useState({
          title: note.title,
          description: note.description
     });

     const handleUpdate = async () => {
          try {
               const response = await updateNote(note._id, editData);

               if (response.status === 200) {
                    setIsEditing(false);
                    onNoteUpdated(response.data);
                    toast.success('Note updated successfully!');
               } else {
                    toast.error('Update failed');
               }
          } catch (error) {
               console.error('Update error:', error);
               toast.error('Failed to update note');
          }
     };

     const handleDelete = async () => {
          try {
               const response = await deleteNote(note._id);

               if (response.status === 200) {
                    onNoteDeleted(note._id);
                    toast.success('Note deleted successfully!');
               } else {
                    toast.error('Delete failed');
               }
          } catch (error) {
               console.error('Delete error:', error);
               toast.error('Failed to delete note');
          }
     };

     const handleEditToggle = () => {
          if (isEditing) {
               handleUpdate();
          } else {
               setIsEditing(true);
               setEditData({
                    title: note.title,
                    description: note.description
               });
          }
     };

     return (
          <div className="flex flex-col max-w-2xl md:min-w-[635px] sm:p-4 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
               <div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                         <Notebook />
                         <input
                              type="text"
                              value={isEditing ? editData.title : note.title}
                              readOnly={!isEditing}
                              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                              className={`
              w-full p-2 text-base rounded-md
              ${isEditing ? 'border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300' : 'border-transparent focus:outline-none focus:ring-0'}
              text-gray-900 dark:text-gray-100
              ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}
            `}
                         />
                    </h1>

                    <textarea
                         value={isEditing ? editData.description : note.description}
                         readOnly={!isEditing}
                         onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                         rows={isEditing ? 4 : 2}
                         className={`
            w-full p-2 text-base rounded-md resize-none
            ${isEditing ? 'border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300' : 'border-transparent focus:outline-none focus:ring-0'}
            text-gray-900 dark:text-gray-100
            ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}
          `}
                    />
               </div>

               <div className="flex items-center justify-end gap-2 w-full mt-4">
                    <button
                         onClick={handleEditToggle}
                         className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded ${isEditing
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                              } transition duration-200`}
                    >
                         {isEditing ? (
                              <>
                                   Save <Save size={16} />
                              </>
                         ) : (
                              <>
                                   Edit <Edit size={16} />
                              </>
                         )}
                    </button>

                    <button
                         onClick={handleDelete}
                         className="text-sm flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 px-3 py-1.5 rounded-md transition-all duration-200"
                    >
                         Delete <Trash2Icon size={14} />
                    </button>
               </div>
          </div>
     );
};

export default NoteCard;