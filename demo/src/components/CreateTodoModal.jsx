import {Dialog, Button, Flex, Text, TextField, TextArea} from "@radix-ui/themes";
import {useState} from "react";
const CreateTodoModal = () => {
	const [fields, setFields] = useState({
		title: "", description: ""
	})

	const handleChange = (name, e) => {
		setFields((prev) => ({...prev, [name]: e.target.value}))
	}

	const {title, description} = fields;

	const handleSubmit = () => {

	}
    return (
		<div className="flex w-full justify-end">
        <Dialog.Root>
	<Dialog.Trigger>
		<Button classname="bg-amber-700" >Create Todo</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Edit Todo</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			Make changes to your todo list.
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Todo Title
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
					Todo Description
				</Text>
				<TextArea size="3"
					defaultValue="consult a specialist"
					placeholder="Describe what the task is all about"
					value={description}
					onChange={(e) => handleChange("description", e)}
				/>
			</label>
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Button onClick={handleSubmit} >Submit</Button>
		</Flex>
	</Dialog.Content>
</Dialog.Root>
</div>
    )
}

export default CreateTodoModal;