const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", (accounts) => {
	let fundraiser;
	const name = "Beneficiary Name";
	const url = "beneficiary.org";
	const imgURL = "https://placekitten.com/600/350";
	const description = "Hello, give me the money";
	const beneficiary = accounts[1];
	const owner = accounts[0];

	beforeEach (async () => {
		fundraiser = await FundraiserContract.new(
			name,
			url,
			imgURL,
			description,
			beneficiary,
			owner
		);
	});

	describe("initialization", () => {
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
		it("gets the owner", async () => {
			const actual = await fundraiser.owner();
			assert.equal(actual, owner, "owner should match");
		});
	});

	describe("setBeneficiary", () => {
		const newBeneficiary = accounts[2];
		it("update beneficiary", async () => {
			await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
			const actual = await fundraiser.beneficiary();
			assert(actual, newBeneficiary, "beneficiary should match");
		});
		it("throws an error when called from a non-owner account", async () => {
			try {
				await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[3] });
				assert.fail("withdraw was not restricted to owners");
			} catch(err) {
				const msg = "Ownable: caller is not the owner";
				const actual = err.stack.split('\n')[0].split("revert")[1].trim();
				assert.equal(actual, msg, "should not be permitted");
				return;
			}
		});
	});

});