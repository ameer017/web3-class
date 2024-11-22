import { useState } from "react";
import useCreateProposal from "../hooks/useCreateProposal";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
const CreateProposal = () => {
  const handleCreateProposal = useCreateProposal();

  const [formDatas, setFormDatas] = useState({
    title: "",
    description: "",
    quorum: "",
  });

  const handleChange = (name, e) => {
    setFormDatas((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const { title, description, quorum } = formDatas;

  const handleSubmit = async () => {
    await handleCreateProposal(title, description, quorum);
    setFormDatas({
      title: "",
      description: "",
      quorum: "",
    });
  };

  return (
    <div className="flex w-full justify-end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="orange">Create Proposal</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>New Proposal</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create A New Proposal.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Proposal Title
              </Text>
              <TextField.Root
                defaultValue="specialist day"
                placeholder="Enter a task"
                value={title}
                onChange={(e) => handleChange("title", e)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Proposal Description
              </Text>
              <TextArea
                size="3"
                placeholder="Describe what the task is all about"
                value={description}
                onChange={(e) => handleChange("description", e)}
              />
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Proposal Quorum
                </Text>
                <TextField.Root
                  defaultValue="2"
                  placeholder="Proposal vote threashold"
                  value={quorum}
                  onChange={(e) => handleChange("quorum", e)}
                />
              </label>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Submit</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CreateProposal;
