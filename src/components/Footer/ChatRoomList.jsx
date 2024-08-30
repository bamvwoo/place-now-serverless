import { useEffect, useState } from "react"
import ChatRoom from "./ChatRoom";
import { useChat } from "../../context/ChatContext";

export default function ChatRoomList() {
    const [ selectedRoomId, setSelectedRoomId ] = useState(null);
    const { chatRooms } = useChat();

    useEffect(() => {
        
    }, [ chatRooms ]);

    const enterRoom = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const quitRoom = () => {
        setSelectedRoomId(null);
    };

    return (
        <div>
            {
                selectedRoomId ? (
                    <ChatRoom roomId={ selectedRoomId } quitRoom={ quitRoom } />
                ) : (
                    <ul>
                        {
                            chatRooms.map(room => (
                                <li key={ room.roomId } onClick={ () => enterRoom(room.roomId) }>
                                    { room.roomId }
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}