// ==UserScript==
// @name         @Asistan
// @version      0.1
// @description  Improve the forum experience.
// @author       (c) Spine <hello.spine@proton.me>
// @match        https://ancient-forums.com/*
// ==/UserScript==

'use strict';

const bnd = ['TEXTAREA', 'INPUT', 'SELECT'],
			hfl = "https://ancient-forums.com/",
			tfl = "https://ancient-forums.com/viewforum.php?f=29",
			nrp = ".topics > .row:not(.sticky):not(.global-announce) .unread",
			nml = "[href=\"./ucp.php?i=ucp_notifications\"]",
			ctb = "[title=\"Post a new topic\"]",
			crb = "[title=\"Post a reply\"]";

/**
 * Report the status of @Asistan in the console.
 */
let stt = (e) => {
	e ?
		console.log('%c@Asistan ' + '%cStatus: ' + '%cOperational 🙌', 'color: #fc0d3d; font-weight: bold;', '', 'color: #0dfc5d; font-weight: bold;') :
		console.log('%c@Asistan ' + '%cStatus: ' + '%cNon-operational 💀', 'color: #fc0d3d; font-weight: bold;', '', 'color: #fc0d88; font-weight: bold;');
}

/**
 * Open single or multiple tabs.
 * @param {String|Array} e
 */
 let ows = (e) => {
	if (Array.isArray(e)) {
		e.forEach(i => {
			window.open(i, "_blank");
		});
	} else {
		window.open(e, "_self");
	}
};

/**
 * Find the element and simulate the click.
 * @param {String} e
 */
let fac = (e) => {
	let elm = document.querySelector(e);
	elm ? elm.click() : false;
};

/**
 * Search for the element and return the boolean.
 * @param 	{String} e
 * @returns {Boolean}
 */
let foe = (e) => {
	return document.querySelector(e) !== null;
};

/**
 * Bulk select elements and return their href values.
 * @param 	{String} e
 * @returns {Array}
 */
let hrf = (e) => {
	let elm = [...document.querySelectorAll(e)];
	let arr = elm.slice(0, 10).map(e => e.href);
	return arr;
};

/**
 * Detect the key press and execute shortcuts.
 * @param {Object} e
 */
let key = (e) => {
	if (bnd.includes(e.target.tagName)) {
		return;
	}

	switch (e.key) {
		case "h":
			ows(hfl);
			break;
		case "t":
			ows(tfl);
			break;
		case "n":
			fac(nml);
			break;
		case "p":
			foe(ctb) ?
				fac(ctb) : fac(crb);
			break;
		case "b":
			ows(hrf(nrp));
			break;
	}
};

/**
 * Run @Asistan. Main code.
 */
(function () {
	try {
		document.addEventListener('keydown', (e) => {
			key(e);
		});

		stt(true);
	} catch (x) {
		stt(false);
	}
})();
