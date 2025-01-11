import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Avatar, AvatarGroup, Button } from '@mui/material';
import { useState, useMemo } from 'react';
import { generateTimeSlots } from '../lib/utils';
import ParticipantSelectModal from './ParticipantSelect';
import { deepOrange } from '@mui/material/colors';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const MeetingModal = ({ open, setOpen }) => {
    const today = new Date().toISOString().split('T')[0];
    const [participantModalOpen, setParticipantModalOpen] = useState(false)
    const [participantDetails, setParticipantDetails] = useState([])
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            start_time: `${today}T09:00`,
            duration_minutes: 60,
            description: "Morning Meeting",
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            start_time: `${today}T13:30`,
            duration_minutes: 90,
            description: "Lunch and Strategy Session",
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            start_time: `${today}T16:00`,
            duration_minutes: 60,
            description: "End of Day Review",
            created_at: new Date().toISOString()
        }
    ]);
    const [formData, setFormData] = useState({
        title: '',
        date: today,
        time: '',
        duration: '60',
        description: '',
        participants: []
    });

    const timeSlots = useMemo(() => generateTimeSlots(), [])

    const isTimeSlotBooked = (date, timeSlot, duration) => {
        const selectedDateTime = new Date(`${date}T${timeSlot}`);
        const selectedEndTime = new Date(selectedDateTime.getTime() + parseInt(duration) * 60000);

        return appointments.some(apt => {
            const aptStart = new Date(apt.start_time);
            const aptEnd = new Date(aptStart.getTime() + apt.duration_minutes * 60000);

            // Check if dates are the same
            if (aptStart.toDateString() !== selectedDateTime.toDateString()) {
                return false;
            }

            // Check for overlap
            return (
                (selectedDateTime >= aptStart && selectedDateTime < aptEnd) ||
                (selectedEndTime > aptStart && selectedEndTime <= aptEnd) ||
                (selectedDateTime <= aptStart && selectedEndTime >= aptEnd)
            );
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >

            <Fade in={open}>
                <Box sx={style}>
                    <div id="transition-modal-title" variant="h6" className='font-semibold text-lg' component="h2">
                        Schedule a meeting
                    </div>
                    <div id="transition-modal-description" className='text-xs'>
                        fill out the form to schedule a new meeting
                    </div>

                    <form className='space-y-6 text-sm mt-4' onSubmit={handleSubmit}>
                        <div>
                            <label className="block space-y-1">
                                <p className='font-semibold'>Title</p>
                                <input type="text" id="first_name" class="border rounded block w-full p-2" placeholder="quick review" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </label>
                        </div>
                        <div className='flex gap-2 text-sm'>
                            <div className='w-full'>
                                <label className='space-y-1'>
                                    <p className='font-semibold'>start date</p>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                                        className="w-full p-2 border rounded h-10"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </label>
                            </div>
                            <div className=' w-30'>
                                <label className='space-y-1'>
                                    <p className='font-semibold'>duration</p>
                                    <select
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="p-2 border rounded h-10"
                                    >
                                        <option value="30">30 mins</option>
                                        <option value="60">1 hr</option>
                                        <option value="90">1hr 30mins</option>
                                        <option value="120">2 hrs</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div>

                            <label className='space-y-1'>
                                <p className='font-semibold'>start time</p>
                                <select
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-40 p-2 border rounded"
                                    required
                                    disabled={!formData.date}
                                >
                                    <option value="">Select a time</option>
                                    {timeSlots.map(timeSlot => {
                                        const isBooked = formData.date &&
                                            isTimeSlotBooked(formData.date, timeSlot, formData.duration);
                                        return (
                                            <option
                                                key={timeSlot}
                                                value={isBooked ? null : timeSlot}
                                                disabled={isBooked}
                                            >
                                                {timeSlot} {isBooked ? '(Booked)' : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className='space-y-1'>
                                <p className='font-semibold'>description</p>
                                <textarea className='border-[2px] w-full p-2 text-sm' rows={4} placeholder='description' onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </label>
                        </div>

                        <ParticipantSelectModal open={participantModalOpen} setOpen={setParticipantModalOpen} setFormData={setFormData} formData={formData} setUserDetails={setParticipantDetails} />
                        <div className='max-w-min'>
                            {
                                participantDetails.length >= 1 && <AvatarGroup max={4}>
                                    {participantDetails.map((participant, key) => (
                                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{participant.name[0].toUpperCase()}</Avatar>
                                    ))}
                                </AvatarGroup>
                            }
                        </div>
                        <div className='flex gap-2 justify-end'>
                            <Button variant='outlined' onClick={(event) => {
                                event.preventDefault()
                                setOpen(false)
                            }}>Cancel</Button>
                            <Button variant='contained' type='submit'>schedule</Button>
                        </div>

                    </form>

                </Box>
            </Fade>
        </Modal>
    )
}

export default MeetingModal