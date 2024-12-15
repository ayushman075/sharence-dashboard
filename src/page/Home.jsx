import { Input, Pagination, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { CSVLink } from 'react-csv';
import { MdOutlineDownload } from "react-icons/md";

const Home = () => {
  
      const [data,setData] = useState([]);
      const [searchFilters, setSearchFilters] = useState({
        name: "",
        email: "",
        address: "",
        contactNumber: "",
      });
      const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(3);
      const [loading,setLoading] = useState(false);


      const headers = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Email Updated At", key: "emailUpdatedAt" },
        { label: "Email Updated IP", key: "emailUpdatedFromIP" },
        { label: "Address", key: "address" },
        { label: "Address Updated At", key: "addressUpdatedAt" },
        { label: "Address Updated IP", key: "addressUpdatedFromIP" },
        { label: "Contact Number", key: "contactNumber" },
        { label: "Contact Number Updated At", key: "contactNumberUpdatedAt" },
        { label: "Contact Number Updated IP", key: "contactNumberUpdatedFromIP" },
      ];

    
      useEffect(()=>{
        setLoading(true);
        axiosInstance.get('details/all').then((res)=>{
            if(res.data.statusCode<400){
                console.log(res.data.data.userDetails)
                const transformedData = res.data.data.userDetails.map((item) => ({
                  name: item.user?.fullName || "N/A",
                  email: item.email || "N/A",
                  emailUpdatedAt: item.emailUpdatedAt? new Date(item.emailUpdatedAt).toLocaleString() : "N/A",
                  emailUpdatedFromIP: item.emailUpdatedFromIP || "N/A",
                  address: item.address || "N/A",
                  addressUpdatedAt: item.addressUpdatedAt? new Date(item.addressUpdatedAt).toLocaleString() : "N/A",
                  addressUpdatedFromIP: item.addressUpdatedFromIP || "N/A",
                  contactNumber: item.contactNumber || "N/A",
                  contactNumberUpdatedAt: item.contactNumberUpdatedAt? new Date(item.contactNumberUpdatedAt).toLocaleString() :"N/A",
                  contactNumberUpdatedFromIP: item.contactNumberUpdatedFromIP || "N/A",
                }));
                
           
          
                  setData(transformedData);
            
            } else{
              console.log(res);
              toast.error(res.data.message);
            }
          }).catch((err)=>{
            console.error(err);
            toast.error(err?.response?.data?.message||'Error occurred while getting Details.')
          }).finally(()=>{
            setLoading(false);
          })
      },[])


      // Filtered data based on search inputs
      const filteredData = data?.filter((row) =>
        Object.keys(searchFilters).every((key) =>
          row[key]?.toLowerCase().includes(searchFilters[key]?.toLowerCase())
        )
      );
    
      // Pagination
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      const startIndex = (currentPage - 1) * rowsPerPage;
      const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    
      // Handle search input changes
      const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters({ ...searchFilters, [name]: value });
        setCurrentPage(1); // Reset to the first page on search
      };
    
  return (
    <div className="p-6 bg-blue-0 min-h-screen">
        <Navbar/>
    <h2 className="text-2xl font-bold text-center mb-3 text-gray-700">User Details</h2>
    <div className='p-2 bg-blue-500 w-40 text-center rounded-lg text-white hover:bg-blue-600 my-3'>
    <CSVLink data={data} headers={headers} className='flex gap-x-2 text-center w-full' filename='Sharence_Data'><MdOutlineDownload size={25} className='flex-col items-center h-full '/> Download CSV</CSVLink>
    </div>
    {/* Table and Filters */}
    <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg bg-blue-50">
      <table className="table-auto w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-4 text-left text-gray-600">
              <input
                type="text"
                placeholder="Search Name"
                name="name"
                value={searchFilters.name}
                onChange={handleSearchChange}
                className="w-full p-2 border bg-blue-50 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </th>
            <th className="p-4 text-left  text-gray-600">
              <input
                type="text"
                placeholder="Search Email"
                name="email"
                value={searchFilters.email}
                onChange={handleSearchChange}
                className="w-full p-2 border bg-blue-50 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </th>
            <th></th>
            <th className="p-4 text-left text-gray-600">
              <input
                type="text"
                placeholder="Search Address"
                name="address"
                value={searchFilters.address}
                onChange={handleSearchChange}
                className="w-full p-2 border bg-blue-50 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </th>
            <th></th>
            <th className="p-4 text-left text-gray-600">
              <input
                type="text"
                placeholder="Search Number"
                name="contactNumber"
                value={searchFilters.contactNumber}
                onChange={handleSearchChange}
                className="w-full p-2 border bg-blue-50 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </th>
            <th></th>
          </tr>
          <tr className="text-gray-700">
            <th className="p-4 text-center font-semibold">Name</th>
            <th className="p-4 text-center font-semibold">Email</th>
            <th className="p-4 text-center font-semibold">Email Update Details</th>
            <th className="p-4 text-center font-semibold">Address</th>
            <th className="p-4 text-center font-semibold">Address Update Details</th>
            <th className="p-4 text-center font-semibold">Contact No.</th>
            <th className="p-4 text-center font-semibold">Contact No. Update Details</th>

          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-blue-100">
              <td className="p-4 text-center border-b">{row.name}</td>
              <td className="p-4 text-center border-b">{row.email}</td>
              <td className="p-4 text-center border-b">{row.emailUpdatedAt+" "+row.emailUpdatedFromIP}</td>
              <td className="p-4 text-center border-b">{row.address}</td>
              <td className="p-4 text-center border-b">{row.addressUpdatedAt+" "+row.addressUpdatedFromIP}</td>
              <td className="p-4 text-center border-b">{row.contactNumber}</td>
              <td className="p-4 text-center border-b">{row.contactNumberUpdatedAt+" "+row.contactNumberUpdatedFromIP}</td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination and Rows per Page */}
    <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center">
        <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page
          }}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div className="flex items-center mt-4 md:mt-0">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-400 text-white hover:bg-blue-500"
          }`}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-400 text-white hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  )
}

export default Home
