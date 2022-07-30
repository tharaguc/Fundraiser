const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", (accounts) => {
	let fundraiser;
	const name = "Beneficiary Name";
	const url = "beneficiary.org";
	const imgURL = "https://placekitten.com/600/350";
	const description = "Hello, give me the money";
	const beneficiary = accounts[1];
	const custodian = accounts[0];

	console.log(beneficiary);
	console.log(custodian);

	describe("initialization", () => {
		beforeEach (async () => {
			fundraiser = await FundraiserContract.new(
				name,
				url,
				imgURL,
				description,
				beneficiary,
				custodian
			);
		});
		it("gets the beneficiary name", async () => {
			const actual = await fundraiser.name();
			assert.equal(actual, name, "names should match");
		});
		it("gets the beneficiary url", async () => {
			const actual = await fundraiser.url();
			assert.equal(actual, url, "url should match");
		});
		it("gets the beneficiary imgURL", async () => {
			const actual = await fundraiser.imgURL();
			assert.equal(actual, imgURL, "imgURL should match");
		});
		it("gets the beneficiary description", async () => {
			const actual = await fundraiser.description();
			assert.equal(actual, description, "description should match");
		});
		it("gets the beneficiary", async () => {
			const actual = await fundraiser.beneficiary();
			assert.equal(actual, beneficiary, "beneficiary should match");
		});
		it("gets the custodian", async () => {
			const actual = await fundraiser.custodian();
			assert.equal(actual, custodian, "custodian should match");
		});
	});

});