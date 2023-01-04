import React from "react";
import { GiCancel } from "react-icons/gi";

function Notifications({
	notification,
	acceptInvite,
	rejectInvite,
	clearNotification,
}) {
	return (
		<div
			className={`absolute rounded-2xl bg-white notification  text-white shadow-l transform transition-all duration-100 w-60 ease-in-out py-5 h-auto top-16 right-36`}
		>
			{notification.length > 0 ? (
				notification.map((item, index) => {
					if (item.type === "meet") {
						return (
							<div className="flex flex-row notification" key={index}>
								<div className="flex flex-col notification py-2 px-4 text-theme-colour w-56 text-center hover:cursor-pointer">
									<span>
										{item.message}
										<span className="font-bold notification">
											{" "}
											{item.meet.title}
										</span>
									</span>
									<div className="flex flex-row justify-around mt-3">
										<button
											className="bg-theme-colour notification text-white px-3 py-1 rounded-lg"
											onClick={() => acceptInvite(item.meet._id, item._id)}
										>
											Accept
										</button>
										<button
											className="bg-theme-colour notification text-white px-3 py-1 rounded-lg"
											onClick={() => rejectInvite(item.meet._id, item._id)}
										>
											Decline
										</button>
									</div>
								</div>
								<GiCancel
									className="w-3 text-theme-colour notification"
									onClick={() => clearNotification(item._id)}
								/>
							</div>
						);
					} else if (item.type === "invite") {
						return (
							<div className="flex flex-row notification" key={index}>
								<div
									className="py-2 px-4 text-theme-colour notification w-56 text-center hover:cursor-pointer"
									key={index}
								>
									<span className="font-bold notification">{item.message}</span>
								</div>
								<GiCancel
									className="w-3 notification text-theme-colour"
									onClick={() => clearNotification(item._id)}
								/>
							</div>
						);
					}
				})
			) : (
				<div className="py-2 px-4 text-theme-colour notification w-56 text-center hover:cursor-pointer">
					No Notifications
				</div>
			)}
		</div>
	);
}

export default Notifications;
