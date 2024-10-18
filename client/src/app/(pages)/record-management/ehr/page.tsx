import Table from '@/components/manage-cmp/Table';
import React from 'react';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';

const ManageEHRPage = () => {
    return (
        <div className='flex-col'>
            <div className='text-3xl text-gray-500'>
                Patient Health Records
            </div>
            <div className=' flex flex-row-reverse'>
                <div className="flex mb-5 px-3 py-3 rounded-md border-2 border-gray-300 overflow-hidden w-1/5">
                    <input type="text" placeholder="Search for a patient"
                        className="w-full outline-none bg-transparent text-gray-600 text-sm" />
                    <FaSearch className="text-gray-600" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-700 whitespace-nowrap">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                First Name
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Last Name
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                NIC
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Contact
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                        <tr className="even:bg-blue-50">
                            <td className="p-4 text-sm text-black">
                                John Doe
                            </td>
                            <td className="p-4 text-sm text-black">
                                john@example.com
                            </td>
                            <td className="p-4 text-sm text-black">
                                Admin
                            </td>
                            <td className="p-4 text-sm text-black">
                                2022-05-15
                            </td>
                            <td className="p-4">

                                <button className="mr-4 flex text-blue-500 hover:text-blue-700 fill-blue-500 hover:fill-blue-700 ">
                                    <div className='mr-2'>View</div>
                                    <FaEdit className="text-xl " />
                                </button>

                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageEHRPage;