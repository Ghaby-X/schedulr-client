import React, { useState } from 'react'
import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import CalendarDisplay from '../components/CalendarDisplay'
import ListDisplay from '../components/ListDisplay'
import MeetingModal from '../components/MeetingModal';

const Meeting = () => {
    const [viewType, setViewType] = useState(true)
    const [addMeetingModal, setAddMeetingModal] = useState(false)

    const data = [
        {
            id: 1,
            title: 'Quick review of schedule app',
            startDate: new Date(2025, 1, 10, 10, 30).toISOString(),
            duration: 40,
            description: 'give out your progress on what you have done so far',
            participant: [
                {
                    'name': 'John',
                    'email': 'john@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'client'
                },
            ]
        },
        {
            id: 2,
            title: 'Quickf schedule app',
            startDate: new Date(2025, 1, 10, 10, 30).toISOString(),
            duration: 82,
            description: 'give out your progress on what you have done so far',
            participant: [
                {
                    'name': 'John',
                    'email': 'john@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'client'
                },
            ]
        },
        {
            id: 3,
            title: 'Quick review ',
            startDate: new Date(2025, 1, 10, 10, 30).toISOString(),
            duration: 342,
            description: 'give out your progress on what you have done so far',
            participant: [
                {
                    'name': 'John',
                    'email': 'john@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'freelancer'
                },
                {
                    'name': 'gabby',
                    'email': 'gabby@gmail.com',
                    'role': 'client'
                },
            ]
        },
    ]

    return (
        <div className='sm:p-12 p-6'>
            <div className='flex justify-between'>
                <div className='flex sm:gap-5 gap-1'>
                    <Button variant={viewType ? 'contained' : 'outlined'} onClick={() => setViewType(true)}><CalendarTodayIcon className='sm:mr-2' />  <span className='hidden sm:block'>Calender</span></Button>
                    <Button variant={viewType ? 'outlined' : 'contained'} onClick={() => setViewType(false)} ><FormatListBulletedIcon className='sm:mr-2' /> <span className='hidden sm:block'>List</span> </Button>
                </div>
                <Button variant='contained' onClick={() => setAddMeetingModal(true)}><AddIcon className='sm:mr-2' /><span className='hidden sm:block'>New Meeting</span></Button>
            </div>
            <div className='pt-10'>
                {
                    viewType ? <CalendarDisplay data={data} /> : <ListDisplay data={data} />}

            </div>
            <MeetingModal open={addMeetingModal} setOpen={setAddMeetingModal} />
        </div>
    )
}

export default Meeting