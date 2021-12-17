import { useEffect, useState } from 'react';
import './App.scss';
import { MdRefresh } from "react-icons/md";

function App() {
	const [value, setValue] = useState('');
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const temp = localStorage.getItem('todos');
		const loadedTodos = JSON.parse(temp);
		if (loadedTodos) {
			setTodos(loadedTodos)
		}
	}, [])

	useEffect(() => {
		const temp = JSON.stringify(todos)
		localStorage.setItem('todos', temp)
	}, [todos])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (value) {
			const newTodo = {
				id: new Date().getTime().toString(),
				text: value,
				completed: false
			}
			setValue('')
			setTodos([newTodo, ...todos]);
		}
	}

	const handleDelete = (e, id) => {
		e.preventDefault();
		setTodos(todos.filter(todo => todo.id !== id));
	}
	const handleCompleted = (e, id) => {
		e.preventDefault();
		const index = todos.findIndex(todo => todo.id === id);
		const newTodos = [...todos];

		newTodos[index] = {
			...newTodos[index],
			completed: !newTodos[index].completed,
		}

		setTodos(newTodos);

	}
	const clearAll = () => {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div>
			<h1>todos</h1>
			<button onClick={clearAll} className='clear-btn'><MdRefresh /></button>
			<form onSubmit={handleSubmit}>
				<input type="text" name='text' className='input' placeholder=''
					value={value} onChange={(e) => setValue(e.target.value)}
				/>
			</form>
			<ul className="ul">
				{todos.map(todo => (
					<li className={todo.completed ? 'list completed' : 'list'} key={todo.id}
						onContextMenu={(e) => handleDelete(e, todo.id)}
						onClick={(e) => handleCompleted(e, todo.id)}
					>{todo.text}</li>
				))}
			</ul>
			<small>left click to "completed"</small>
			<small>right click to "delete"</small>
		</div >
	)
}

export default App;
