
import Calendar from './Calendar'
import moment from 'moment'

const CalendarDisplay = ({ data }) => {
    const events = data.map(event => {
        return {
            title: event.title,
            start: moment(event.startDate).toDate(),
            end: moment(new Date(new Date(event.startDate).getTime() + event.duration * 60000)).toDate(),
        }
    })

    return (
        <div className='h-[75vh]'>
            <Calendar events={events} />
        </div>
    )
}

export default CalendarDisplay