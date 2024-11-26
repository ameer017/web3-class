import { useState } from "react";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import useCreateFaucet from "../hooks/useCreateFaucet";
const CreateFaucet = () => {
  const handleFaucetDeployment = useCreateFaucet();

  const [formDatas, setFormDatas] = useState({
    name: "",
    symbol: "",
  });

  const handleChange = (name, e) => {
    setFormDatas((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const { name, symbol } = formDatas;

  const handleSubmit = async () => {
    await handleFaucetDeployment(name, symbol);
    setFormDatas({
      name: "",
      symbol: "",
    });
  };

  return (
    <div className="flex w-full justify-end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="orange">Create Faucet</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>New Faucet</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create A New Faucet.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Faucet name
              </Text>
              <TextField.Root
                defaultValue="DLT Africa"
                placeholder="Enter your faucet name"
                value={name}
                onChange={(e) => handleChange("name", e)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Faucet symbol
              </Text>
              <TextField.Root
                defaultValue="DLT"
                placeholder="Enter your faucet symbol"
                value={symbol}
                onChange={(e) => handleChange("symbol", e)}
              />
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

export default CreateFaucet;
