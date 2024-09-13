const seedPhraseGen = require("seed-phrase-generator");

const seedPhrase = seedPhraseGen.generateSeedPhrase();
console.log('Seed Phrase:', seedPhrase);

const ethereumWallet = seedPhraseGen.createEthereumWalletFromSeedPhrase(seedPhrase);
console.log('Ethereum Wallet:');
console.log('Address:', ethereumWallet.address);
console.log('Private Key:', ethereumWallet.privateKey);