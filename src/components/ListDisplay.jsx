import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { formatDuration } from '../lib/utils';

const ListDisplay = ({ data }) => {
    return (
        <>
            {
                data.length >= 1 ? <div className='space-y-4'>
                    {

                        data.map((data, key) => {
                            const date = new Date(data.startDate)

                            return (

                                <div className='flex justify-between border-b-[1px] px-2 pb-2' key={key}>
                                    <div className='space-y-1'>
                                        <h1 className='font-semibold'>{data.title}</h1>
                                        <p className='text-xs'><AccessTimeIcon fontSize='inherit' /> {`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}, ${date.getHours()}:${date.getMinutes()} (${formatDuration(data.duration)})`}</p>
                                        <p className='text-xs'><PersonIcon fontSize='inherit' /> John, Ama, Eugene</p>
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap:1 sm:gap-2'>
                                        <RemoveRedEyeIcon className='text-blue-500' />
                                        <CloseIcon className='text-red-500' />
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>

                    : <div>no data</div>
            }
        </>
    )
}

export default ListDisplay