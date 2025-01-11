import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Checkbox } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const ParticipantSelectModal = ({ open, setOpen, setFormData, formData, setUserDetails }) => {
    const users = [
        {
            id: 1,
            name: 'Joe',
            email: 'joe@gmail.com',
            role: 'freelancer',
        },
        {
            id: 2,
            name: 'Emma',
            email: 'emma@gmail.com',
            role: 'client',
        },
        {
            id: 3,
            name: 'gabby',
            email: 'joe@gmail.com',
            role: 'client',
        },
    ]
    return (
        <div>
            <button className='border rounded p-2 flex gap-4 justify-center w-full' onClick={() => setOpen(true)}><AddLinkIcon /> participants</button>
            <Modal
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                open={open}
                onClose={() => setOpen(false)}
            >

                <Fade in={open}>
                    <Box sx={style}>
                        <div id="child-modal-title" variant="h6" className='font-semibold text-lg' component="h2">
                            Select Participants
                        </div>
                        <div>
                            <div className='h-40 p-4 space-y-1'>
                                {
                                    users.length > 1 ? users.map((user, key) => (
                                        <div key={key}>
                                            <label>
                                                <Checkbox defaultChecked={formData.participants?.includes(user.id)} onChange={(event) => {
                                                    const isChecked = event.target.checked

                                                    let newFormDataParticipants;
                                                    isChecked ? newFormDataParticipants = [...formData.participants, user.id] : newFormDataParticipants = formData.participants.filter(value => value !== user.id)
                                                    console.log(newFormDataParticipants)
                                                    setUserDetails(users.filter(user => newFormDataParticipants?.includes(user.id)))
                                                    setFormData({ ...formData, participants: newFormDataParticipants })
                                                    return
                                                }} />
                                                {user.email}
                                            </label>

                                        </div>)) : <div className='w-full h-full flex justify-center items-center'>No participant</div>
                                }
                            </div>
                            <div className='flex gap-2 justify-end'>
                                <Button variant='contained' onClick={(event) => {
                                    event.preventDefault()
                                    setOpen(false)
                                }}>Save</Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ParticipantSelectModal
