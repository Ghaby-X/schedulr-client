import {
    Calendar as BigCalendar,
    momentLocalizer
} from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function Calendar({ events }) {
    return <BigCalendar startAccessor='start' endAccessor='end' events={events} localizer={localizer} />
}