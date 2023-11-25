import React, { useState } from "react";
import { useRouter } from "next/router";
import useRoom from "../hooks/useRoom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MediaPreview from "./MediaPeview";
import ChatFooter from "./ChatFooter";
import { nanoid } from "nanoid";
import Compressor from "compressorjs";
import useChatMessages from "../hooks/useChatMessages";
import { db, storage } from "../Firebase/firebase";
import { addDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Chats() {
	const router = useRouter()
	const [image, setImage] = useState(null);
	const [input, setInput] = useState('');
	const [src, setSrc] = useState('');
	const [audioId, setAudioId] = useState('')
	const roomId = router.query.roomId ?? "";
	const userId = user.uid
	const room = useRoom(roomId, userId)
	const messages = useChatMessages(roomId);

	function showPreview(event) {
		const file = event.target.files[0]
		if (file) {
			setImage(file);
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				setSrc(reader.result)
			}
		}
	}
	function closePreview() {
		setSrc("");
		setImage(null);
	}

	async function sendMessage(event) {
		event.preventDefault()

		setInput('')
		if (image) closePreview()

		const imageName = nanoid()
		await setDoc(doc(db, `users/${userId}/chats/${roomId}`), {
			name: room.name,
			photoURL: room.photoURL || null,
			timestamp: serverTimestamp(),
		});

		const newDoc = await addDoc(collection(db, `rooms/${roomId}/messages`), {
			name: user.displayName,
			message: input,
			uid: user.uid,
			timestamp: serverTimestamp(),
			time: new Date().toUTCString(),
			...(image ? { imageUrl: "uploading", imageName } : {})
		});
		if (image) {
			new Compressor(image, {
				quality: 0.8,
				maxWidth: 1920,
				async success(result) {
					setSrc('')
					setImage(null);
					await uploadBytes(ref(storage, `images/${imageName}`), result);
					const url = await getDownloadURL(ref(storage, `images/${imageName}`))
					await updateDoc(doc(db, `rooms/${roomId}/messages/${newDoc.id}`), {
						imageUrl: url,
					});
				},
			})
		}
	}

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
						onChange={showPreview}
					/>
					<IconButton>
						<label style={{ cursor: "pointer", height: 24 }}>
							<AddPhotoAlternateIcon />
						</label>
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
					<Menu id="menu" keepMounted open={false}>
						<MenuItem >
							Delete Room
						</MenuItem>
					</Menu>
				</div>
			</div>

			<div className="chat__body--container">
				<div className="chat__body">
					<ChatMessages messages={messages} user={user} roomId={roomId} audioId={audioId} setAudioId={setAudioId} />
				</div>
			</div>

			<MediaPreview src={src} closePreview={closePreview} />
			<ChatFooter
				input={input}
				onChange={event => setInput(event.target.value)}
				image={image}
				user={user}
				room={room}
				roomId={roomId}
				sendMessage={sendMessage}
				setAudioId={setAudioId}
			/>
		</div>
	)
}

export default Chats;