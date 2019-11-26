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
			return obj.trim().replace(/\r/, '').replace(/\n/, '').trim();
		}

		if (!Array.isArray(obj)) {
			return '';
		}

		let result = '';

		obj.filter((line) => line && line !== null && line !== '')
			.map((line) => line.trim())
			.filter((line) => line && line !== null && line !== '' && !line.startsWith('#'))
			.map((line) => line.replace(/\r/, ''))
			.map((line) => line.replace(/\n/, ''))
			.map((line) => line.trim())
			.filter((line) => line && line !== null && line !== '' && !line.startsWith('#'))
			.map((line) => line + '\r\n')
			.forEach((line) => result = result + line);

		return result;
	}
};
