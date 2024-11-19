import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { baseSepolia, sepolia, scrollSepolia } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Set the networks
const networks = [baseSepolia, sepolia, scrollSepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  themeVariables: {
    '--w3m-accent': '#1c1917',
    '--w3m-border-radius-master': "1px"
  },
  themeMode: "dark",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
