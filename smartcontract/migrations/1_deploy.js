const smartcontract = artifacts.require("smartcontract");
module.exports = async function (deployer) {
    await deployer.deploy(smartcontract);
};
