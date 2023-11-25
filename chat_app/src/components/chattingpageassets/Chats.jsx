import React from "react";
import { useRouter } from "next/router";
import useRoom from "../hooks/useRoom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Avatar, IconButton } from "@mui/material";

function Chats() {
	const router = useRouter()
	const roomId = router.query.roomId ?? ""
	const userId = userr.uid
	const room = useRoom(roomId, userId)

	if (!room) return null;

	return (
		<div className="chat">
			<div className="chat__background" />

			{/* Chat Header */}
			<div className="chat__header">
				<div className="avatar__container">
					<Avatar src={room.photoURL} alt={room.name} />
				</div>
				<div className="chat__header--info">
					<h3>{room.name}</h3>
				</div>
				<div className="chat__header--right">
					<input
						id="image"
						style={{ display: 'none' }}
						accept="image/*"
						type="file"
					/>
					<IconButton>
						<label style={{ cursor: "pointer", height: 24 }}>
							<AddPhotoAlternateIcon />
						</label>
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default Chats;