import {createContext, useContext, useState, useCallback, useEffect} from "react"
import useContractInstance from "../hooks/useContractInstance";
import { Contract } from "ethers";
import { readOnlyProvid } from "../constants/readOnlyProvid";
import ABI from "./../ABI/Todo.json";

const TodoContext = createContext(
    {
        todos: []
    }
)

export const TodoContextProvider = ({children}) => {
    const [todos, setTodos] = useState([])

    const readOnlyTodoContract = useContractInstance();

    const formatEnum = (value) => {
        const status = Number(value);

        switch(status) {
            case 1: 
            return "Created";
            case 2: 
            return "Edited";
            case 3: 
            return "Completed";
            default:
                return "Pending"
        }
    }

    const getTodos = useCallback(async () => {
        if(!readOnlyTodoContract) return;

        try{
            const data = await readOnlyTodoContract.getAllTodo();
            
            const formattedTodos = data.map((todo) => ({
                title: todo.title,
                description: todo.description,
                status: formatEnum(todo.status)
            }))

            // console.log(formattedTodos)
            setTodos(formattedTodos)
            // console.log(todos)


        } catch(error) {
            console.log("Error fetching todos", error)
        }
    }, [readOnlyTodoContract])

    useEffect(() => {
        getTodos()
    }, [getTodos])

    const todoListUpdateHandler = useCallback((title, description, status) => {
        setTodos((prevState) => [
          ...prevState,
          { title, description, status: formatEnum(status) },
        ]);
      }, []);
    
      useEffect(() => {
        const contract = new Contract(
          import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
          ABI,
          readOnlyProvid
        );
    
        contract.on("TodoCreated", todoListUpdateHandler);
    
        return () => contract.off("TodoCreated", todoListUpdateHandler);
      }, [todoListUpdateHandler, readOnlyProvid]);
    
      // updating a particular todo
    
      const todoUpdateHandler = useCallback((index, title, description, status) => {
        setTodos((prevState) => {
          const updatedTodos = [...prevState];
          updatedTodos[Number(index)] = {
            title,
            description,
            status: formatEnum(status),
          };
    
          return updatedTodos;
        });
      }, []);
    
      useEffect(() => {
        const contract = new Contract(
          import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
          ABI,
          readOnlyProvid
        );
    
        contract.on("TodoUpdated", todoUpdateHandler);
    
        return () => contract.off("TodoUpdated", todoUpdateHandler);
      }, [todoUpdateHandler, readOnlyProvid]);
    
      // To complete todo
    
      const todoCompletionHandler = useCallback((index, status) => {
        setTodos((prevState) => {
          const updatedTodos = [...prevState];
          updatedTodos[Number(index)] = {
            ...updatedTodos[Number(index)],
            status: formatEnum(status),
          };
    
          return updatedTodos;
        });
      }, []);
    
      useEffect(() => {
        const contract = new Contract(
          import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
          ABI,
          readOnlyProvid
        );
    
        contract.on("TodoCompleted", todoCompletionHandler);
    
        return () => contract.off("TodoCompleted", todoCompletionHandler);
      }, [todoCompletionHandler, readOnlyProvid]);
    
      // deleting todo
    
      const todoDeleteHandler = useCallback((index) => {
        setTodos((prevState) => {
          const updatedTodos = [...prevState];
          updatedTodos.splice([Number(index)], 1);
    
          return updatedTodos;
        });
      }, []);
    
      useEffect(() => {
        const contract = new Contract(
          import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
          ABI,
          readOnlyProvid
        );
    
        contract.on("TodoDeleted", todoDeleteHandler);
    
        return () => contract.off("TodoDeleted", todoDeleteHandler);
      }, [todoDeleteHandler, readOnlyProvid]);
    
    return (
        <TodoContext.Provider value={{todos}}>
        {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext)
    return context
}