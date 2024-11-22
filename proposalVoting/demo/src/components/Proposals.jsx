import { Text } from "@radix-ui/themes";
import React from "react";
import { useProposal } from "../context/proposalContext";
import Proposal from "./Proposal";

const Proposals = () => {
  const { proposals } = useProposal();
  return (
    <div className="w-full flex flex-col gap-4">
      <Text as="h1" className="text-3xl font-semibold text-amber-600">
        My Proposals
      </Text>

      <section className="w-full grid lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6">
        {proposals.length === 0 ? (
          <Text as="h1" className="text-2xl font-medium text-stone-200">
            There are no available proposals
          </Text>
        ) : (
          proposals.map((proposal, index) => (
            <Proposal key={index} proposal={proposal} index={index} />
          ))
        )}
      </section>
    </div>
  );
};

export default Proposals;
