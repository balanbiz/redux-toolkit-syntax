import "./App.css";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";

const App: React.FC = () => {
    const log = (x: string): any => console.log(x);
    return (
        <div className="App">
            {log("App render")}
            <InputField />
            <TodoList />
        </div>
    );
};

export default App;
