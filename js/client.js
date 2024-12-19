const getWeek = (givenDate) => {
	let date = new Date(givenDate);
	date = new Date(date.getTime());
	date.setHours(0, 0, 0, 0);

	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	// January 4 is always in week 1.
	const week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return (
		1 +
		Math.round(
			((date.getTime() - week1.getTime()) / 86400000 -
				3 +
				((week1.getDay() + 6) % 7)) /
				7,
		)
	);
};

const getWeekBadgeColor = (date) => {
	// Get year and week first
	const targetWeek = getWeek(date);
	const currentWeek = getWeek(new Date());

	// Get the diff
	const diffWeeks = Math.abs(targetWeek - currentWeek);

	// If target is before the current date
	if (currentWeek > targetWeek) {
		return "red";
	}

	if (diffWeeks <= 1) {
		return "red";
	}

	if (diffWeeks === 2) {
		return "orange";
	}

	if (diffWeeks === 3) {
		return "yellow";
	}

	return null;
};

window.TrelloPowerUp.initialize({
	"card-back-section": (t, options) => {
		return {
			title: "Bellier",
			icon: "./images/stairs.svg",
			content: {
				type: "iframe",
				url: t.signUrl("./section.html"),
				height: 380,
			},
		};
	},
	"card-badges": (t, opts) => {
		let cardId;
		let commandDate;
		let prodDate;

		return t
			.card("id")
			.get("id")
			.then((data) => {
				cardId = data;
				return t.get(cardId, "shared", "command-date");
			})
			.then((data) => {
				if (data !== undefined && data !== "") {
					commandDate = data;
				}
				return t.get(cardId, "shared", "prod-date");
			})
			.then((data) => {
				if (data !== undefined && data !== "") {
					prodDate = data;
				}

				// Now, build badges list
				const badges = [];

				if (commandDate !== undefined) {
					badges.push({
						text: `S${getWeek(commandDate)}`,
						icon: "./images/buy.svg",
						color: getWeekBadgeColor(commandDate),
					});
				}

				if (prodDate !== undefined) {
					badges.push({
						text: `S${getWeek(prodDate)}`,
						icon: "./images/build.svg",
						color: getWeekBadgeColor(prodDate),
					});
				}

				return badges;
			})
			.catch((error) => console.error(error));
	},
	"list-sorters": (t) => {
		return t.list("id").then(() => {
			return [
				{
					text: "Date de fabrication",
					callback: async (t, opts) => {
						const cards = [];

						for (const c of opts.cards) {
							const date = await t.get(c.id, "shared", "prod-date");
							cards.push({
								id: c.id,
								date: new Date(date),
							});
						}

						cards.sort((a, b) => {
							if (a.date > b.date) {
								return 1;
							}

							if (b.date > a.date) {
								return -1;
							}
							return 0;
						});

						return {
							sortedIds: cards.map((c) => {
								return c.id;
							}),
						};
					},
				},
			];
		});
	},
});
