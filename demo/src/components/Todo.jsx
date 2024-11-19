import {
  Box,
  Card,
  Text,
  Flex,
  AlertDialog,
  Button,
  Dialog,
  TextField,
  TextArea,
} from "@radix-ui/themes";
const Todo = () => {
  return (
    <Box className="w-full my-6">
      <Card variant="surface">
        <Flex gap={4} direction={"column"}>
          <Text as="div" size="2" weight="bold">
            Title: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            Reading
          </Text>
          <Text as="div" size="2" weight="bold">
            Description: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            I need to read by 7pm ahead of Nethermind interview
          </Text>
          <Text as="div" size="2" weight="bold">
            Status: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            Created
          </Text>
        </Flex>

        <div className="w-full justify-end mt-4 flex items-center gap-4">
          {/* Delete Alert */}
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red" className="cursor-pointer">
                Delete
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Delete Todo</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? This item will no longer be accessible.
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red">
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>

          {/* Edit Alert */}
          <Dialog.Root>
            <Dialog.Trigger>
              <Button color="orange">Edit</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Edit Todo</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Edit A New Todo.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Todo Title
                  </Text>
                  <TextField.Root
                    defaultValue="specialist day"
                    placeholder="Enter a task"
                    // value={title}
                    // // onChange={(e) => handleChange("title", e)}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Todo Description
                  </Text>
                  <TextArea
                    size="3"
                    defaultValue="consult a specialist"
                    placeholder="Describe what the task is all about"
                    // value={description}
                    // onChange={(e) => handleChange("description", e)}
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button onClick={(e) => e.preventDefault()}>Submit</Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          {/* Todo completed */}
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="blue" className="cursor-pointer">
                Done{" "}
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Complete Todo</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you have completed this task?
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="green">
                    Yes, I have
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>
      </Card>
    </Box>
  );
};

export default Todo;
