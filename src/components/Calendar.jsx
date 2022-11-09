import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, EventsToday } from './index'
import axios from 'axios'
import isFirstDayOfMonth from 'date-fns/esm/fp/isFirstDayOfMonth/index'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const [eventDates, setEventDates] = useState([])
    const [meetDates, setMeetDates] = useState([])
    const [task, setTask] = useState()
    const [meet, setMeet] = useState()
    const [monthTask, setMonthTask] = useState()
    const [monthMeets, setMonthMeets] = useState()
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    const navigate = useNavigate()
    const fetchMonthTasks = async (monthString) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tasks/${sessionStorage.getItem('token')}?month=${monthString}`)
        setMonthTask(res.data.events)
        setMonthMeets(res.data.meets)
    }

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    const clickedDay = (day) => {
        setSelectedDay(day)
    }

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    useEffect(() => {
        const dayString = format(selectedDay, 'yyyy-MM-dd')
        const daysTask = monthTask?.filter((task) => task.date === dayString)
        setTask(daysTask)
        const daysMeet = monthMeets?.filter((meet) => meet.date === dayString)
        setMeet(daysMeet)
    }, [selectedDay])

    useEffect(() => {
        const monthString = format(firstDayCurrentMonth, 'yyyy-MM')
        fetchMonthTasks(monthString)
    }, [currentMonth])

    useEffect(() => {
        const dates = monthTask?.map((task) => {
            return task.date
        })
        setEventDates(dates)
        const meetDates = monthMeets?.map((meet) => {
            return meet.date
        })
        setMeetDates(meetDates)
    }, [monthTask])

    return (
        <div className="w-full min-h-screen flex flex-col overflow-y-hidden">
            <Navbar />
            <div className='flex md:flex-row flex-col items-center min-h-[92vh] h-auto justify-between'>
                <div className="px-5 mb-10 md:mb-0 pt-5 md:ml-10 shadow-xl rounded-2xl flex flex-col justify-center md:h-[600px] h-auto md:w-3/5 w-[95%] md:px-6">
                    <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-2xl text-theme-colour">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center text-5xl p-1.5 text-theme-colour opacity-80 hover:opacity-100"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="w-10 h-10" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-theme-colour opacity-80 hover:opacity-100"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="w-10 h-10" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xl leading-6 text-center text-theme-colour opacity-100">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-5 text-lg h-auto min-h-[450px] md:h-[700px]">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5'
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => clickedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-theme-colour',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                        (eventDates?.find((date) => date === format(day, 'yyyy-MM-dd'))) && !isEqual(day, selectedDay) && !isToday(day) && 'bg-purple-200',
                                        (meetDates?.find((date) => date === format(day, 'yyyy-MM-dd'))) && !isEqual(day, selectedDay) && !isToday(day) && 'bg-green-200',

                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-theme-colour',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <EventsToday tasks={task} meets={meet} date={format(selectedDay, 'yyyy-MM-dd')} />
            </div>
        </div>
    )
}



let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
