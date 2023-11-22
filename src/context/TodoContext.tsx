import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface TodoEntity {
  id: string;
  name: string;
  desc: string;
  mode: "check" | "edit" | "add";
}

interface TodoContextState {
  categories: TodoEntity[];
}

interface TodoContextActions {
  createLocalTodo(request: TodoEntity): void;
}

const TodoValueContext = createContext<TodoContextState | undefined>(undefined);
const TodoActionsContext = createContext<TodoContextActions | undefined>(
  undefined,
);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TodoContextState>({
    categories: [],
  });

  const actions: TodoContextActions = useMemo(
    () => ({
      createLocalTodo(request) {
        setState((prev) => {
          prev.categories.push(request);

          return { ...prev };
        });
      },
    }),
    [],
  );

  return (
    <TodoActionsContext.Provider value={actions}>
      <TodoValueContext.Provider value={state}>
        {children}
      </TodoValueContext.Provider>
    </TodoActionsContext.Provider>
  );
}

export function useTodoValue() {
  const state = useContext(TodoValueContext);
  if (!state) throw new Error("Cannot find FeedbackValueContext");

  return state;
}

export function useTodoActions() {
  const actions = useContext(TodoActionsContext);
  if (!actions) throw new Error("Cannot find FeedbackActionsContext");

  return actions;
}
