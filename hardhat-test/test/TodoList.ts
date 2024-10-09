import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Message Test", function () {
  // reusable async function method foe deployment.
  async function deployTodoListFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const TodoList = await hre.ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();

    return { todoList, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should check if the contract deployed", async function () {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);

      expect(await todoList.owner()).to.equal(owner);
    });



    it("Should be able to create list as the owner", async function () {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);
      const title = "Write a code"
      const description = "Write and make sure Hello world can display on the screen"
      await todoList.connect(owner).createTodo(title, description);

      const _index = 0
      const todos = await todoList.getAllTodo();
      const [todoTitle, todoDescription] = todos[_index];

      expect(todoTitle).to.equal(title);
      expect(todoDescription).to.equal(description);
    });



    it("Should not be able to create list if not the owner", async function () {
      const { todoList, otherAccount } = await loadFixture(deployTodoListFixture);
      const title = "Write a code"
      const description = "Write and make sure Hello world can display on the screen"


      await expect(
        todoList.connect(otherAccount).createTodo(title, description)
      ).to.be.revertedWith("You're not allowed");
    });



    it("Should be able to get a single to do list", async function () {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);

      const _index = 0;
      const title = "Write a code"
      const description = "Write and make sure Hello world can display on the screen"

      await todoList.connect(owner).createTodo(title, description);

      const [listTitle, listDescription, listI] = await todoList.getTodo(_index);

      expect(listTitle).to.equal(title);
      expect(listDescription).to.equal(description);
      expect(listI).to.equal(1);

    })



    it("Should be able to update a list", async function () {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);
      const title = "Write a code"
      const description = "Write and make sure Hello world can display on the screen"

      await todoList.connect(owner).createTodo(title, description);

      const _index = 0
      console.log("Updating todo at index:", _index);

      const newTitle = "Write a code"
      const newDescription = "Write and make sure Hello world can display on the screen"

      await todoList.updateTodo(_index, newTitle, newDescription);

      const [updatedTitle, updatedDescription, updatedStatus] = await todoList.getTodo(_index);


      expect(updatedTitle).to.equal(newTitle);
      expect(updatedDescription).to.equal(newDescription);
      expect(updatedStatus).to.equal(2);
    })
  })

})