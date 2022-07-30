// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fundraiser {
	string public name;
	string public url;
	string public imgURL;
	string public description;

	constructor(
		string memory _name,
		string memory _url,
		string memory _imgURL,
		string memory _description
	) {
		name = _name;
		url = _url;
		imgURL = _imgURL;
		description = _description;
	}
}