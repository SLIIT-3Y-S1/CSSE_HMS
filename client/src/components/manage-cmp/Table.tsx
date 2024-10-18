import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function Table() {
    return (
        <div className="font-[sans-serif] overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-blue-700 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-left text-sm font-medium text-white">
                            Name
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                            Email
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                            Role
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                            Joined At
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
              <button className="mr-4" title="Edit">
               

                <FaEdit className="w-5 fill-blue-500 hover:fill-blue-700" />
              </button>
              <button className="mr-4" title="Delete">
               

                <FaTrash className="w-5 fill-red-500 hover:fill-red-700" />
              </button>
            </td>
          </tr>
          </tbody>

            </table>
        </div>


    )
}

export default Table