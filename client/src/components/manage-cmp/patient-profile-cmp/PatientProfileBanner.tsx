import React from 'react';

interface BannerProps {
    FirstName?: any;
    LastName?: any;
    UniqueCode?: any;
    NIC?: any;
    DOB?: any;
    Age?: any;
    Address?: any;
    Contact?: any;
}

function PatientProfileBanner({ FirstName, LastName, UniqueCode, NIC, DOB, Age, Address, Contact }: BannerProps) {
    return (
        <div className=" border-l-blue-700 shadow-md flex rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 md:p-9">

            {/*Profile Icon */}
            <div className="w-[138px] h-[133px] pt-[47px] pb-[46px] bg-[#3758f9] justify-center items-center inline-flex">
                <div className="text-center text-[#f8f8f8] text-[28px] font-semibold leading-10">{FirstName}</div>
            </div>

            {/*Patient Primary Details */}
            <div className="flex flex-col p-6 ">
                <div className="text-xl font-bold text-black">{FirstName} {LastName}</div>
                <div className="flex flex-row mt-4">
                    <div className="flex flex-col mr-12">
                        <div className="flex flex-row mt-1">
                            <div className="flex text-sm text-gray-500">NIC</div>
                            <div className="flex text-sm ml-4 text-black font-medium">{NIC}</div>
                        </div>
                        <div className="flex flex-row mt-1">
                            <div className="flex text-sm text-gray-500">Contact Number</div>
                            <div className="flex text-sm ml-4 text-black font-medium">{Contact}</div>
                        </div>
                        <div className="flex flex-row mt-1">
                            <div className="flex text-sm text-gray-500">Address</div>
                            <div className="flex text-sm ml-4 text-black font-medium">{Address}</div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mt-1">
                            <div className="flex text-sm text-gray-500">Date of Birth</div>
                            <div className="flex text-sm ml-4 text-black font-medium">{DOB}</div>
                        </div>
                        <div className="flex flex-row mt-1">
                            <div className="flex text-sm text-gray-500">Age</div>
                            <div className="flex text-sm ml-4 text-black font-medium">{Age}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Patient Unique Code */}
            <div className="flex text-right items-end">
                <div className="flex flex-row mt-1">
                    <div className="flex text-sm text-gray-500">UNIQUE CODE</div>
                    <div className="flex text-sm ml-4 text-gray-500 font-medium">{UniqueCode}</div>
                </div>
            </div>
        </div>
    )
}

export default PatientProfileBanner;