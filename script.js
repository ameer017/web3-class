// Build a JavaScript application that checks if a user is eligible for an airdrop by verifying their address against a Merkle Tree.

const wallet = document.getElementById("wallet");
const eligible = document.getElementById("eligible");
const inEligible = document.getElementById("inEligible");
const check = document.getElementById("check");
const error = document.getElementById("error");


const walletAddresses = [
    "0xc44a9615bea97b82432d42f51c6fe80cb965fe6f",
    "0x6b493f65bd849f95fad31bc0959cabf7110c8c84",
    "0x1aa373d17ed0f123ea428affe4a426382bb8978c",
    "0xd9a5b956e0472caa11440433cb553300ffee22a6",
    "0xa97dfb443def34256dfe3940cfcf1a425cec1994",
    "0xe7679a81d996b1b691b0094e3afc43fa3bdda541",
    "0x96b8f0935d62866c91fc1de245d925f6df7aa3fa",
    "0x4fbe2b9481bd58ccb6f6909eb851128c2d2ed98e",
    "0x3ab8a8bcae2d0825679886f03b8a843bb8cd2908",
    "0xf30822127903fd50bda30506805b1db42f1520c9",
]


const leaves = walletAddresses.map(x => CryptoJS.SHA256(x).toString());
const tree = new MerkleTree(leaves, CryptoJS.SHA256);
const root = tree.getRoot().toString('hex')

check.addEventListener("click", (e) => {
    e.preventDefault()
    const validateEligibility = async () => {
        const walletAddress = wallet.value.trim();
        if (!walletAddress || walletAddress.length < 42) {
            error.innerText = `Not a valid wallet`
            inEligible.innerText = "";
            eligible.innerText = "";
        }

        if (wallet.value === "") {
            error.innerText = `Input cannot be empty`
        }
        const leaf = CryptoJS.SHA256(walletAddress);
        const proof = tree.getProof(leaf)
        const valid = tree.verify(proof, leaf, root)
        console.log(valid)

        if (valid) {
            eligible.innerText = `
            Congratulations!! 🥳 You're eligible. \n
           Validity: ${valid}\n
           Root: ${root}
            `;
            inEligible.innerText = "";
            error.innerText = "";


        } else {
            inEligible.innerText = `oops! 😢 You're not eligible`;
            eligible.innerText = "";

        }


    }
    validateEligibility()
})    
