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
import { useState } from "react";

const Todo = ({ todo, key }) => {
  const { title, description, status } = todo;
  const [newFields, setNewFields] = useState({
    title: "",
    description: "",
  });

  const handleChange = (name, e) => {
    setNewFields((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const { title: newTitle, description: newDescription } = newFields;

  const handleTodoUpdate = (index) => {
    const num = Number(index);
    console.log({ index: num, title: newTitle, description: newDescription });
  };

  // console.log(todo)
  return (
    <Box className="w-full my-6">
      <Card variant="surface">
        <Flex gap={4} direction={"column"}>
          <Text as="div" size="2" weight="bold">
            Title: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            {title}
          </Text>
          <Text as="div" size="2" weight="bold">
            Description: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            {description}
          </Text>
          <Text as="div" size="2" weight="bold">
            Status: &nbsp;
          </Text>
          <Text as="div" color="gray" size="2">
            {status}
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
                    defaultValue={title}
                    placeholder="Enter a task"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Todo Description
                  </Text>
                  <TextArea
                    size="3"
                    defaultValue={description}
                    placeholder="Describe what the task is all about"
                    onChange={handleChange}
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button onClick={handleTodoUpdate}>Submit</Button>
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