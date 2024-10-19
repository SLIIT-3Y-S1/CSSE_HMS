'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QRCodeComponent from '../../../components/_digital-card-issuance/QrCode';


const DigitalCardHomePage = () => {

  const [userID, setUserID] = useState<string | null>(null);
  const [patientID, setPatientID] = useState<string | null>(null);

  // patient detials
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [address, setAddress] = useState('');

  const [qr, setQr] = useState(false);
  const [hasQr, setHasQr] = useState(false);

  const getUserID = async () => {
    let userID = localStorage.getItem('userID');
    setUserID(userID);
    
    if (!userID) {
      window.location.href = '/login'; 
    }

    setUserDetails();

    return userID || 'default-user-id';
  };
  
  const setUserDetails = async () => {
    let userID = localStorage.getItem('userID');

    const getUser = await axios.get(`http://localhost:4200/api/v1/user/${userID}`, {
      headers: {
      'Content-Type': 'application/json',
      },
    })

    console.log(getUser.data.email);
    

    setUserEmail(getUser.data.email);
    
  };
  
  const getPatientID = async () => {
    let userID = localStorage.getItem('userID');

    const getPatient = await axios.get(`http://localhost:4200/api/v1/patient/get-patient-by-userID/${userID}`, {
      headers: {
      'Content-Type': 'application/json',
      },
    })
    const patientID = getPatient.data.patientID;
    setPatientID(patientID);

    return patientID || 'default-user-id';
  };

  const fetchUserStatus = async () => {
    try {

      let userID = localStorage.getItem('userID');

      const getPatient = await axios.get(`http://localhost:4200/api/v1/patient/get-patient-by-userID/${userID}`, {
        headers: {
        'Content-Type': 'application/json',
        },
      })
      
      const patientID = getPatient.data.patientID;

      const response = await axios.get(`http://localhost:4200/api/v1/digital-card/get-status-by-patientID/${patientID}`, {
        headers: {
        'Content-Type': 'application/json',
        },
      })
      
      if(response.data.healthCardStatus === 'approved') {
        setName(getPatient.data.firstname + ' ' + getPatient.data.lastname);  
        setContact(getPatient.data.contact);
        setAddress(getPatient.data.address);
        getPatientID();

        setHasQr(true);
      }
      
    } catch (error) {
        console.error('Error fetching user status: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserID();
      await fetchUserStatus();
    };
    fetchData();
  }, []);

  const downloadQR = async () => {
    
    let userID = localStorage.getItem('userID');

    try {
      const getPatient = await axios.get(`http://localhost:4200/api/v1/patient/get-patient-by-userID/${userID}`, {
        headers: {
        'Content-Type': 'application/json',
        },
      })
      
      const patientID = getPatient.data.patientID;

      const response = await axios.get(`http://localhost:4200/api/v1/patient/get-qrcode/${patientID}`, {
          headers: {
              'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // Ensure the response is treated as binary data
      });

      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      const imageUrl = `data:image/png;base64,${base64Image}`;

      // Only create and click the download link if it hasn't been done yet
      if (!document.getElementById('download-link')) {
          const link = document.createElement('a');
          link.id = 'download-link';
          link.href = imageUrl;
          link.download = 'qrcode.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    } catch (error) {
      console.error('download failed')
    }
  }

  function calculateDobFromAge(age: number) {
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const dob = new Date(birthYear, currentDate.getMonth(), currentDate.getDate());

    return dob.toISOString();
  }

  // if qr is not obtained

  const [formData, setFormData] = useState({
    userID: localStorage.getItem('userID'),
    firstname: "",
    lastname: "",
    gender: "Male",
    NIC: "",
    address: "",
    age: "",
    contact: ""
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(userID);
    
    const payload = {
      NIC: formData.NIC,
      address: formData.address,
      age: parseInt(formData.age),
      contact: formData.contact,
      dob: calculateDobFromAge(parseInt(formData.age)),
      firstname: formData.firstname,
      gender: formData.gender,
      lastname: formData.lastname,
      userID: localStorage.getItem('userID') // Assuming userID is being set correctly
    };
    console.log("Form Submitted", payload);

    try {
      const response = await axios.post('http://localhost:4200/api/v1/patient', payload, {
        headers: {
        'Content-Type': 'application/json',
        },
      })
      
      if (response.status === 201) {
        console.log('Card requested success');

        
        const getPatient = await axios.get(`http://localhost:4200/api/v1/patient/get-patient-by-userID/${userID}`, {
          headers: {
          'Content-Type': 'application/json',
          },
        })

        const payload = {
          patientID: getPatient.data.patientID,
          healthCardStatus: 'approved',
        };
        
        const postCardResponse = await axios.post('http://localhost:4200/api/v1/digital-card', payload, {
          headers: {
          'Content-Type': 'application/json',
          },
        })

        alert('Card requested successfully');
        console.log('card created!');

        fetchUserStatus();
      } else {
        console.error('Card request failed')
      }
    } catch (error) {
      console.error('Card request failed')
    }

  };

  return (
    <>
      {hasQr ? (
        <div>
          <section className="bg-white py-[60px] dark:bg-dark">
            <div className="mx-auto px-4 sm:container">
              <div className="border-l-[5px] border-primary pl-5">
                <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-dark">
                  Digital Card
                </h2>
                <p className="text-sm font-medium text-body-color dark:text-dark-6">
                  Scan the QR code to get easy !
                </p>
              </div>
            </div>
          </section>

            <div className="w-fit mx-auto p-8 border border-gray-300 rounded shadow-md text-center relative">
              <h2 className="text-2xl font-bold mb-4">Your Digital Tag</h2>
              <center><QRCodeComponent/></center>
              <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-left mt-4">
                <p className="text-sm font-medium">PatientID</p>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm font-medium">Generated</p>
                <p className="text-md font-medium">{patientID}</p>
                <p className="text-md font-medium">{name}</p>
                <p className="text-md font-medium">{userEmail}</p>
                <p className="text-md font-medium">12/10/2024</p>
              </div>
              <button
                className="absolute top-6 right-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={downloadQR}
              >
                Download
              </button>
          </div>

          <section className="relative z-10 overflow-hidden bg-white py-20 dark:bg-dark lg:py-[30px] flex justify-center items-center"><div className="container">
              <div className="-mx-4 flex flex-wrap lg:justify-between">
                <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                  <div className="mb-12 max-w-[570px] lg:mb-0">
                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-md font-bold text-dark dark:text-dark">
                          Location
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                          {address}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_941_17577)">
                            <path
                              d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499ZM3.79997 5.54994C2.84997 6.59994 2.89997 8.74994 3.99997 11.4999C5.24997 14.6499 7.64997 18.0999 10.8 21.2499C13.9 24.3499 17.4 26.7499 20.5 27.9999C23.2 29.0999 25.35 29.1499 26.45 28.1999L28.85 24.0999C28.85 24.0499 28.85 24.0499 28.85 23.9999L24.45 21.0499C24.45 21.0499 24.35 21.0999 24.25 21.2499L23.15 22.8499C22.45 23.8499 21.1 24.1499 20.1 23.4999C13.8 19.5999 9.89997 14.1499 8.49997 11.9499C7.84997 10.8999 8.09997 9.54994 9.09997 8.84994L10.9 7.59994V7.54994L7.94997 3.14994C7.94997 3.09994 7.89997 3.09994 7.84997 3.14994L3.79997 5.54994Z"
                              fill="currentColor"
                            />
                            <path
                              d="M29.3 14.25C28.7 14.25 28.25 13.8 28.2 13.2C27.8 8.15003 23.65 4.10003 18.55 3.75003C17.95 3.70003 17.45 3.20003 17.5 2.55003C17.55 1.95003 18.05 1.45003 18.7 1.50003C24.9 1.90003 29.95 6.80003 30.45 13C30.5 13.6 30.05 14.15 29.4 14.2C29.4 14.25 29.35 14.25 29.3 14.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M24.35 14.7002C23.8 14.7002 23.3 14.3002 23.25 13.7002C22.95 11.0002 20.85 8.90018 18.15 8.55018C17.55 8.50018 17.1 7.90018 17.15 7.30018C17.2 6.70018 17.8 6.25018 18.4 6.30018C22.15 6.75018 25.05 9.65018 25.5 13.4002C25.55 14.0002 25.15 14.5502 24.5 14.6502C24.4 14.7002 24.35 14.7002 24.35 14.7002Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_941_17577">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-md font-bold text-dark dark:text-dark">
                          Phone Number
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                          (+94) {contact}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-md font-bold text-dark dark:text-dark">
                          Email Address
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                      onClick={() => {
                      localStorage.removeItem('userID');
                      window.location.href = '/login';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>


          
            
        </div>
      )

      :
      
      <div>
          
        <div className="flex flex-col py-[60px] items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Digital Card Request</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6 relative">
            <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              TG
            </div>
            
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1 */}
              <div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">NIC</label>
                  <input
                    type="text"
                    name="NIC"
                    value={formData.NIC}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Column 3 */}
              <div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

          {qr ? (
            <div className="mt-8">
              <QRCodeComponent />
            </div>
          ) : null}
        </div>
        <section className="bg-white py-[70px] dark:bg-dark">
            <div className="mx-auto px-4 sm:container">
              <div className="border-l-[5px] border-primary pl-5">
                <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-dark">
                  Digital Card of {userID}
                </h2>
                <p className="text-sm font-medium text-body-color dark:text-dark-6">
                  Fill the above form to get your digital card
                </p>
              </div>
            </div>
          </section>

      </div>
      }

      
    </>
  )
    
}

export default DigitalCardHomePage

interface ContactTextAreaProps {
  row: number;
  placeholder: string;
  name: string;
  defaultValue?: string;
}

const ContactTextArea = ({ row, placeholder, name, defaultValue }: ContactTextAreaProps) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

interface ContactInputBoxProps {
  type: string;
  placeholder: string;
  name: string;
}

const ContactInputBox = ({ type, placeholder, name }: ContactInputBoxProps) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};