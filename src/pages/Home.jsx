import { useState } from "react";
import PlaceListHeader from "../components/Home/PlaceListHeader";
import PlaceListDetail from "../components/Home/PlaceDetail";
import PlaceList from "../components/Home/PlaceList";

export default function Home({ setChatRooms }) {

    const [ selectedPlace, setSelectedPlace ] = useState(null);

    /*
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        // 1. 서버리스 함수 호출하여 업로드 URL 가져오기
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
            }),
        });

        const { uploadURL, publicURL } = await response.json();

        console.log(uploadURL);

        // 2. 가져온 URL로 파일 업로드
        const uploadResponse = await fetch(uploadURL, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (uploadResponse.ok) {
            setMessage('File uploaded successfully! URL : ' + publicURL);
        } else {
            setMessage('File upload failed.');
        }
    };
    */

    return (
        <main>
            <div>
                <PlaceListHeader />
                <PlaceList setSelectedPlace={ setSelectedPlace } setChatRooms={ setChatRooms } />
            </div>
            <PlaceListDetail selectedPlace={ selectedPlace } setChatRooms={ setChatRooms } />

            {/* <section>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload to S3</button>
                <p>{message}</p>
            </section> */}
        </main>
    )
}