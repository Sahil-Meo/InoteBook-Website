import React, { useEffect, useState } from 'react';
import { fetchAllNotes } from '../../Api/notesApi';

const AnalyzeTable = () => {
     const [selectedFilter, setSelectedFilter] = useState('Last 30 days');
     const [searchQuery, setSearchQuery] = useState('');
     const [showDropdown, setShowDropdown] = useState(false);
     const [selectedRows, setSelectedRows] = useState([]);
     const [Notes, setNotes] = useState([])

     useEffect(() => {
          const ApiCall = async () => {
               try {
                    const res = await fetchAllNotes();
                    if (res.status === 200) {
                         setNotes(res.data);
                    } else {
                         console.error("Failed to fetch notes");
                    }
               } catch (err) {
                    console.error("Error fetching notes:", err);
               }
          };
          ApiCall();
     }, []);

     const filterOptions = [
          'Last day',
          'Last 7 days',
          'Last 30 days',
          'Last month',
          'Last year'
     ];

     const toggleRowSelection = (id) => {
          setSelectedRows(prev =>
               prev.includes(id)
                    ? prev.filter(rowId => rowId !== id)
                    : [...prev, id]
          );
     };

     const toggleAllRows = (e) => {
          if (e.target.checked) {
               setSelectedRows(Notes.map(note => note._id));
          } else {
               setSelectedRows([]);
          }
     };

     const formatDate = (dateString) => {
          const options = { year: 'numeric', month: 'short', day: 'numeric' };
          return new Date(dateString).toLocaleDateString(undefined, options);
     };

     const truncateDescription = (description) => {
          if (!description) return '';
          const words = description.split(' ');
          if (words.length > 3) {
               return words.slice(0, 3).join(' ') + '...';
          }
          return description;
     };

     const filteredNotes = Notes.filter(note => {
          const searchLower = searchQuery.toLowerCase();
          const titleMatch = note.title?.toLowerCase().includes(searchLower) || false;
          const descMatch = note.description?.toLowerCase().includes(searchLower) || false;
          let tagMatch = false;
          if (Array.isArray(note.tag)) {
               tagMatch = note.tag.some(t => t?.toLowerCase().includes(searchLower));
          } else if (typeof note.tag === 'string') {
               tagMatch = note.tag.toLowerCase().includes(searchLower);
          }

          return titleMatch || descMatch || tagMatch;
     });

     return (
          <div className="">
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                         <div className="relative">
                              <button
                                   id="dropdownRadioButton"
                                   onClick={() => setShowDropdown(!showDropdown)}
                                   className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                   type="button"
                              >
                                   <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                   </svg>
                                   {selectedFilter}
                                   <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                   </svg>
                              </button>


                              {showDropdown && (
                                   <div
                                        id="dropdownRadio"
                                        className="z-100 absolute mt-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                                   >
                                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                             {filterOptions.map(option => (
                                                  <li key={option}>
                                                       <div
                                                            className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                                            onClick={() => {
                                                                 setSelectedFilter(option);
                                                                 setShowDropdown(false);
                                                            }}
                                                       >
                                                            <input
                                                                 id={`filter-radio-${option}`}
                                                                 type="radio"
                                                                 checked={selectedFilter === option}
                                                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                 readOnly
                                                            />
                                                            <label htmlFor={`filter-radio-${option}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300">
                                                                 {option}
                                                            </label>
                                                       </div>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                              )}
                         </div>

                         {/* Search Input */}
                         <div className="relative">
                              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                   <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <input
                                   type="text"
                                   id="table-search"
                                   className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search notes..."
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                              />
                         </div>
                    </div>

                    {/* Table */}
                    {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                   <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                             <input
                                                  id="checkbox-all-search"
                                                  type="checkbox"
                                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                  checked={selectedRows.length === Notes.length && Notes.length > 0}
                                                  onChange={toggleAllRows}
                                             />
                                             <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div>
                                   </th>
                                   <th scope="col" className="px-6 py-3">Note Title</th>
                                   <th scope="col" className="px-6 py-3">Description</th>
                                   <th scope="col" className="px-6 py-3">Tags</th>
                                   <th scope="col" className="px-6 py-3">Status</th>
                                   <th scope="col" className="px-6 py-3">Created At</th>
                              </tr>
                         </thead>
                         <tbody>
                              {filteredNotes.map((note) => (
                                   <tr
                                        key={note._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                   >
                                        <td className="w-4 p-4">
                                             <div className="flex items-center">
                                                  <input
                                                       id={`checkbox-table-search-${note._id}`}
                                                       type="checkbox"
                                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                       checked={selectedRows.includes(note._id)}
                                                       onChange={() => toggleRowSelection(note._id)}
                                                  />
                                                  <label htmlFor={`checkbox-table-search-${note._id}`} className="sr-only">checkbox</label>
                                             </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                             {note.title}
                                        </th>
                                        <td className="px-6 py-4" title={note.description}>
                                             {truncateDescription(note.description)}
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex flex-wrap gap-1">
                                                  {Array.isArray(note.tag) ? (
                                                       note.tag.map((t, index) => (
                                                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                 {t}
                                                            </span>
                                                       ))
                                                  ) : (
                                                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                            {note.tag}
                                                       </span>
                                                  )}
                                             </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             {note.complete ? (
                                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                       Completed
                                                  </span>
                                             ) : (
                                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                       Pending
                                                  </span>
                                             )}
                                        </td>
                                        <td className="px-6 py-4">
                                             <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                  {formatDate(note.createdAt)}
                                             </span>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table> */}

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                   <tr>
                                        <th scope="col" className="p-4 sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                                             <div className="flex items-center">
                                                  <input
                                                       id="checkbox-all-search"
                                                       type="checkbox"
                                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                       checked={selectedRows.length === Notes.length && Notes.length > 0}
                                                       onChange={toggleAllRows}
                                                  />
                                                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                             </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[150px]">Title</th>
                                        <th scope="col" className="px-6 py-3 hidden md:table-cell">Description</th>
                                        <th scope="col" className="px-6 py-3 hidden sm:table-cell">Tags</th>
                                        <th scope="col" className="px-6 py-3 hidden xs:table-cell">Status</th>
                                        <th scope="col" className="px-6 py-3 hidden lg:table-cell">Created</th>
                                   </tr>
                              </thead>


                              <tbody>
                                   {filteredNotes.map((note) => (
                                        <tr
                                             key={note._id}
                                             className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >

                                             <td className="w-4 p-4 sticky left-0 bg-white dark:bg-gray-800 z-10">
                                                  <div className="flex items-center">
                                                       <input
                                                            id={`checkbox-table-search-${note._id}`}
                                                            type="checkbox"
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            checked={selectedRows.includes(note._id)}
                                                            onChange={() => toggleRowSelection(note._id)}
                                                       />
                                                       <label htmlFor={`checkbox-table-search-${note._id}`} className="sr-only">checkbox</label>
                                                  </div>
                                             </td>


                                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white min-w-[150px]">
                                                  {note.title}

                                                  <div className="md:hidden mt-1 space-y-1">
                                                       <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {truncateDescription(note.description, 40)}
                                                       </div>
                                                       <div className="flex flex-wrap gap-1">
                                                            {Array.isArray(note.tag) ? (
                                                                 note.tag.slice(0, 2).map((t, index) => (
                                                                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                           {t}
                                                                      </span>
                                                                 ))
                                                            ) : (
                                                                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                      {note.tag}
                                                                 </span>
                                                            )}
                                                       </div>
                                                       <div className="text-xs">
                                                            {note.complete ? (
                                                                 <span className="text-green-600 dark:text-green-400">✓ Completed</span>
                                                            ) : (
                                                                 <span className="text-yellow-600 dark:text-yellow-400">◌ Pending</span>
                                                            )}
                                                            <span className="text-gray-400 dark:text-gray-500 ml-2">
                                                                 {formatDate(note.createdAt, true)}
                                                            </span>
                                                       </div>
                                                  </div>
                                             </th>


                                             <td className="px-6 py-4 hidden md:table-cell" title={note.description}>
                                                  {truncateDescription(note.description)}
                                             </td>


                                             <td className="px-6 py-4 hidden sm:table-cell">
                                                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                       {Array.isArray(note.tag) ? (
                                                            note.tag.map((t, index) => (
                                                                 <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                      {t}
                                                                 </span>
                                                            ))
                                                       ) : (
                                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                 {note.tag}
                                                            </span>
                                                       )}
                                                  </div>
                                             </td>


                                             <td className="px-6 py-4 hidden xs:table-cell">
                                                  {note.complete ? (
                                                       <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                            Completed
                                                       </span>
                                                  ) : (
                                                       <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                            Pending
                                                       </span>
                                                  )}
                                             </td>


                                             <td className="px-6 py-4 hidden lg:table-cell whitespace-nowrap">
                                                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                       {formatDate(note.createdAt)}
                                                  </span>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default AnalyzeTable;