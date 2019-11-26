/*
 * Copyright 2019 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Rashad Asgarbayli
 */

(function (buster, define) {
	'use strict';

	let assert, refute;

	assert = buster.assertions.assert;
	refute = buster.assertions.refute;

	define('test/mime/type/text/uri-list-test', function (require) {

		let urlList = require('./uri-list');

		buster.testCase('rest/mime/type/text/uri-list', {
			'should not change when writing string values': function () {
				assert.equals('7', urlList.write('7'));
			},
			'should write empty string representation for reading non-string and non-array values': function () {
				assert.equals('', urlList.write(7));
			},
			'should ignore string starting with #': function () {
				assert.equals('', urlList.write('#  kjh kjh'));
			},
			'should trim and then ignore string starting with #': function () {
				assert.equals('', urlList.write(' #  kjh kjh'));
			},
			'should trim and then write properly the following string': function () {
				assert.equals('http://host1.tld\r\n', urlList.write('http://host1.tld \n'));
			},
			'should trim and then write properly the following array': function () {
				assert.equals('http://host1.tld\r\nhttp://host2.tld\r\n', urlList.write(['http://host1.tld','\r\n  #  kjhkjh\r', ' \n http://host2.tld\r \n']));
			},
			'should read the following string properly': function () {
				assert.equals(['http://host1.tld', 'http://host2.tld'], urlList.read('http://host1.tld\r\nhttp://host2.tld\r\n'));
			}
		});

	});

}(
	this.buster || require('buster'),
	typeof define === 'function' && define.amd ? define : function (id, factory) {
		var packageName = id.split(/[\/\-]/)[0], pathToRoot = id.replace(/[^\/]+/g, '..');
		pathToRoot = pathToRoot.length > 2 ? pathToRoot.substr(3) : pathToRoot;
		factory(function (moduleId) {
			return require(moduleId.indexOf(packageName) === 0 ? pathToRoot + moduleId.substr(packageName.length) : moduleId);
		});
	}
));
