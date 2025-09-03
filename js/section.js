const trello = window.TrelloPowerUp.iframe();

const daysToSubtract = 14;

const pickerConfig = {
	weekNumbers: true,
	altInput: true,
	altFormat: "\\Se\\ma\\i\\ne W, Y",
	locale: fr.French,
	plugins: [new weekSelect({})],
};

const install = flatpickr("#install", {
	...pickerConfig,
	onChange: [
		(_, date) => {
			trello.set("card", "shared", "install-date", date);
		},
	],
});

// const command = flatpickr("#command", {
// 	...pickerConfig,
// 	onChange: [
// 		(_, date) => {
// 			trello.set("card", "shared", "command-date", date);
// 		},
// 	],
// });

// const prod = flatpickr("#prod", {
// 	...pickerConfig,
// 	onChange: [
// 		(_, date) => {
// 			let commandDate = new Date(date);
// 			commandDate.setDate(commandDate.getDate() - daysToSubtract);
// 			commandDate = commandDate.toISOString().split("T")[0];

// 			// Update the command date in command picker
// 			command.setDate(commandDate);

// 			// Save new dates in the database
// 			trello.set("card", "shared", "prod-date", date);
// 			trello.set("card", "shared", "command-date", commandDate);
// 		},
// 	],
// });

trello.get("card", "shared", "install-date").then((data) => {
	install.setDate(data);
});

// trello.get("card", "shared", "command-date").then((data) => {
// 	command.setDate(data);
// });

// trello.get("card", "shared", "prod-date").then((data) => {
// 	prod.setDate(data);
// });
