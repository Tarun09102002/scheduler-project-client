import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import meet from "../images/meeticon.png";

function Scheduler({ tasks, meets }) {
	const navigate = useNavigate();
	const [eventDate, setEventDate] = useState([]);
	const [scheduleDiv, setScheduleDiv] = useState();

	useEffect(() => {
		initialiseTask();
	}, [tasks, meets]);

	useEffect(() => {
		setScheduleDiv(initialiseScheduleDiv());
		scrollToDiv();
	}, [eventDate]);

	const scrollToDiv = async () => {
		const time = new Date().getHours() - 1;
		const div = document.getElementById(`div${time}`);
		const temp = document.getElementById(`temp`);
		if (div) div.scrollIntoView({ behavior: "smooth" });
	};
	const initialiseTask = () => {
		const dates = [];
		for (let i = 0; i < 24; i++) {
			dates.push([]);
		}
		if (tasks) {
			for (const i in tasks) {
				for (
					let j = parseInt(tasks[i].start);
					j < (parseInt(tasks[i].end) === 0 ? 24 : parseInt(tasks[i].end));
					j++
				) {
					dates[j].push(tasks[i]);
				}
			}
		}
		if (meets) {
			for (const i in meets) {
				for (
					let j = parseInt(meets[i].start);
					j < (parseInt(meets[i].end) === 0 ? 24 : parseInt(meets[i].end));
					j++
				) {
					dates[j].push(meets[i]);
				}
			}
		}
		setEventDate(dates);
	};

	const initialiseScheduleDiv = () => {
		const elements = [];
		for (let i = 0; i < 24; i++) {
			elements.push(
				<div
					className={`flex flex-row md:h-28 h-36  text-theme-colour relative border-black  border-t-2 border-opacity-20`}
					id={`div${i}`}
					key={i}
				>
					<div className="w-2/12 px-2 py-2 border-black border-r-2 border-opacity-20">
						<div className="top-0 text-xl inline-block p-1 absolute -translate-y-[50%] bg-white pl-4 left-0">
							{i <= 12 ? `${i}` : `${i - 12}`}:00 {i < 12 ? "AM" : "PM"}
						</div>
					</div>
					<div
						className={`flex flex-row justify-around items-center w-10/12 py-2 overflow-x-auto`}
					>
						{eventDate[i] &&
							eventDate[i].map((task, index) => {
								return (
									<div
										key={index}
										className="w-[98%] mx-2 md:h-[95%] h-[85%] text-xl flex flex-row justify-between rounded-lg py-2 px-4 hover:cursor-pointer"
										style={{
											backgroundColor: `${task ? task.color : "white"}`,
										}}
										onClick={() => task && navigate(`/task/${task._id}`)}
									>
										<div> {task ? task.title : "No event"} </div>
										<div>
											{task.completed === true && (
												<AiOutlineCheckCircle className="inline-block ml-4 text-2xl text-theme-colour w-8 h-8 hover:cursor-pointer" />
											)}
											{task.link && (
												<img
													src={meet}
													className="inline-block ml-4 text-2xl text-theme-colour w-8 h-8 hover:cursor-pointer"
												/>
											)}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			);
		}
		return <div className="flex flex-col pt-3">{elements}</div>;
	};

	return (
		<div
			id="temp"
			className="flex flex-col py-2 overflow-y-auto rounded-2xl max-h-[500px] bg-white drop-shadow-2xl"
		>
			{scheduleDiv ? scheduleDiv : null}
		</div>
	);
}

export default Scheduler;
