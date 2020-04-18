/*
 * Copyright 2019 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Rashad Asgarbayli
 */

'use strict';

module.exports = {

	read: function (str) {
		let lines = str.match(/^.*((\r\n|\n|\r)|$)/gm);
		if (!lines || lines.length < 1) {
			return [];
		}

		let result = [];

		lines
			.filter((line) => line && line !== null && line !== '')
			.map((line) => line.trim())
			.filter((line) => line && line !== null && line !== '' && !line.startsWith('#'))
			.forEach((line) => result.push(line));

		return result;
	},

	write: function (obj) {
		if (!obj) {
			return '';
		}

		if (typeof obj === 'string') {
			return obj.trim()
				.replace(/\r/, '')
				.replace(/\n/, '')
				.trim() + '\r\n';
		}

		if (!Array.isArray(obj)) {
			return '';
		}

		let result = obj.filter((line) => line && line !== null && line !== '' && !line.startsWith('#'))
			.map((line) => line.trim().replace(/\r/, '').replace(/\n/, '').trim())
			.filter((line) => line && line !== null && line !== '' && !line.startsWith('#'))
			.join('\r\n');
		return result;
	}
};
