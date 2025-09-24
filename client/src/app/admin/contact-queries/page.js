"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect, useState, useCallback, useMemo } from "react";
>>>>>>> completed
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "@/redux/slices/contactSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

<<<<<<< HEAD
=======
const CONTACTS_PER_PAGE = 5;
const CSV_HEADERS = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Message", key: "message" },
  { label: "Date", key: "date" },
];
const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

>>>>>>> completed
const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
<<<<<<< HEAD
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
=======
    direction: SORT_DIRECTIONS.ASC,
  });
  const [currentPage, setCurrentPage] = useState(1);
>>>>>>> completed

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

<<<<<<< HEAD
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
      toast.success("Contact deleted successfully!");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredContacts = sortedContacts.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // CSV Headers (Include phone explicitly)
  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Message", key: "message" },
    { label: "Date", key: "date" },
  ];

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-3xl font-bold text-center mb-6'
=======
  const handleDelete = useCallback(
    (id) => {
      if (confirm("Are you sure you want to delete this contact?")) {
        dispatch(deleteContact(id));
        toast.success("Contact deleted successfully!");
      }
    },
    [dispatch]
  );

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === SORT_DIRECTIONS.ASC
          ? SORT_DIRECTIONS.DESC
          : SORT_DIRECTIONS.ASC,
    }));
  }, []);

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue)
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? -1 : 1;
      if (aValue > bValue)
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? 1 : -1;
      return 0;
    });
  }, [contacts, sortConfig]);

  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return sortedContacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.message?.toLowerCase().includes(term) ||
        contact.phone?.toLowerCase().includes(term)
    );
  }, [sortedContacts, searchTerm]);

  const paginationData = useMemo(() => {
    const indexOfLastContact = currentPage * CONTACTS_PER_PAGE;
    const indexOfFirstContact = indexOfLastContact - CONTACTS_PER_PAGE;
    const currentContacts = filteredContacts.slice(
      indexOfFirstContact,
      indexOfLastContact
    );
    const totalPages = Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE);

    return {
      currentContacts,
      indexOfLastContact,
      totalPages,
      hasNext: indexOfLastContact < filteredContacts.length,
      hasPrev: currentPage > 1,
    };
  }, [filteredContacts, currentPage]);

  const tableHeaders = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "message", label: "Message" },
      { key: "date", label: "Date" },
    ],
    []
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => (paginationData.hasNext ? prev + 1 : prev));
  }, [paginationData.hasNext]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-6"
>>>>>>> completed
      >
        Contact List
      </motion.h1>

<<<<<<< HEAD
      <div className='flex justify-between mb-4'>
        <input
          type='text'
          placeholder='Search contacts...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 border rounded-md w-full max-w-md'
        />
        <CSVLink
          data={contacts}
          headers={csvHeaders}
          filename='contacts.csv'
          className='bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary ml-4'
=======
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md flex-1 max-w-md"
        />
        <CSVLink
          data={contacts}
          headers={CSV_HEADERS}
          filename="contacts.csv"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary text-center whitespace-nowrap"
>>>>>>> completed
        >
          Export CSV
        </CSVLink>
      </div>

<<<<<<< HEAD
      {loading ? (
        <p className='text-center text-lg'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>Error: {error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-gray-200'>
                <th
                  className='p-3 cursor-pointer'
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  className='p-3 cursor-pointer'
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortConfig.key === "email"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  className='p-3 cursor-pointer'
                  onClick={() => handleSort("phone")}
                >
                  Phone{" "}
                  {sortConfig.key === "phone"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  className='p-3 cursor-pointer'
                  onClick={() => handleSort("message")}
                >
                  Message{" "}
                  {sortConfig.key === "message"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  className='p-3 cursor-pointer'
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  {sortConfig.key === "date"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact, index) => (
                <motion.tr
                  key={contact._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='border-b hover:bg-gray-100'
                >
                  <td className='p-3 text-center'>{contact.name}</td>
                  <td className='p-3 text-center'>{contact.email}</td>
                  <td className='p-3 text-center'>{contact.phone}</td>
                  <td className='p-3 text-center'>{contact.message}</td>
                  <td className='p-3 text-center'>
                    {dayjs(contact.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td className='p-3 text-center'>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='flex justify-center mt-4'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50'
        >
          Prev
        </button>
        <span className='px-4 py-2 mx-1'>{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastContact < filteredContacts.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastContact >= filteredContacts.length}
          className='px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50'
=======
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="p-3 cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() => handleSort(header.key)}
                >
                  {header.label}{" "}
                  {sortConfig.key === header.key &&
                    (sortConfig.direction === SORT_DIRECTIONS.ASC ? "↑" : "↓")}
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginationData.currentContacts.map((contact, index) => (
              <motion.tr
                key={contact._id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 text-center">{contact.name || "-"}</td>
                <td className="p-3 text-center">{contact.email || "-"}</td>
                <td className="p-3 text-center">{contact.phone || "-"}</td>
                <td
                  className="p-3 text-center max-w-xs truncate"
                  title={contact.message}
                >
                  {contact.message || "-"}
                </td>
                <td className="p-3 text-center">
                  {contact.createdAt
                    ? dayjs(contact.createdAt).format("DD-MM-YYYY hh:mm A")
                    : "-"}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                    aria-label={`Delete ${contact.name}`}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={handlePrevPage}
          disabled={!paginationData.hasPrev}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {paginationData.totalPages || 1}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!paginationData.hasNext}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
>>>>>>> completed
        >
          Next
        </button>
      </div>
<<<<<<< HEAD
=======

      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {paginationData.currentContacts.length} of{" "}
        {filteredContacts.length} contacts
      </div>
>>>>>>> completed
    </div>
  );
};

export default ContactList;
