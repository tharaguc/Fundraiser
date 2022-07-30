// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fundraiser {
	string public name;
	string public url;
	string public imgURL;
	string public description;

	address payable public beneficiary;
	address public custodian;

	constructor(
		string memory _name,
		string memory _url,
		string memory _imgURL,
		string memory _description,
		address payable _beneficiary,
		address _custodian
	) {
		name = _name;
		url = _url;
		imgURL = _imgURL;
		description = _description;
		beneficiary = _beneficiary;
		custodian = _custodian;
	}
}