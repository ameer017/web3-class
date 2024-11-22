import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useContractInstance from "../hooks/useContractInstance";
import { Contract } from "ethers";
import { readOnlyProvid } from "../constants/readOnlyProvid";
import ABI from "../../ABI/Vote.json";

const ProposalContext = createContext({
  proposals: [],
});

export const ProposalProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);
  const readProposalContract = useContractInstance();

  const formatPropEnum = (value) => {
    const status = Number(value);

    switch (status) {
      case 1:
        return "None";
      case 2:
        return "Created";
      case 3:
        return "Pending";
      default:
        return "Accepted";
    }
  };

  const getProposals = useCallback(async () => {
    if (!readProposalContract) return;

    try {
      const data = await readProposalContract.getAllProposals();

      const formattedResponses = data.map((proposal) => ({
        title: proposal.title,
        description: proposal.description,
        quorum: proposal.quorum,
        status: formatPropEnum(proposal.status),
      }));

      console.log(formattedResponses);

      setProposals(formattedResponses);
    } catch (error) {
      console.log("Error fetching proposals", error);
    }
  }, [readProposalContract]);

  useEffect(() => {
    getProposals();
  }, [getProposals]);

  return (
    <ProposalContext.Provider value={{ proposals }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => {
  const context = useContext(ProposalContext);
  return context;
};
