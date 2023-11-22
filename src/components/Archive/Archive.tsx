import { useTodoActions, useTodoValue } from "../../context/TodoContext";

function Archive() {
  const { categories } = useTodoValue();
  const { createLocalTodo } = useTodoActions();

  const handleAddModeClick = () => {
    createLocalTodo({
      id: Math.random().toString(),
      name: "",
      desc: "",
      mode: "add",
    });
  };

  return (
    <>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} : {category.desc}
          </li>
        ))}
      </ul>
      <button onClick={handleAddModeClick}>추가추가</button>
    </>
  );
}

export default Archive;
