import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QRCodeComponent = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                let userID = localStorage.getItem('userID');

                const getPatient = await axios.get(`http://localhost:4200/api/v1/patient/get-patient-by-userID/${userID}`, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                  })
                const patientID = getPatient.data.patientID;
                console.log(patientID);
                
                const response = await axios.get(`http://localhost:4200/api/v1/patient/get-qrcode/${patientID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    responseType: 'arraybuffer',
                });

                const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                const imageUrl = `data:image/png;base64,${base64Image}`;
                setImageSrc(imageUrl);

                // Only create and click the download link if it hasn't been done yet
                // if (!document.getElementById('download-link')) {
                //     const link = document.createElement('a');
                //     link.id = 'download-link';
                //     link.href = imageUrl;
                //     link.download = 'qrcode.png';
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                // }
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        };

        fetchQRCode();
    }, []);

    return (
        <div>
            {imageSrc ? <img src={imageSrc} alt="QR Code" /> : <p>Loading...</p>}
        </div>
    );
};

export default QRCodeComponent;