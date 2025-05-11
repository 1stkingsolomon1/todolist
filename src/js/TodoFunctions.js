
import '../css/Todo.css'
import { useEffect, useState } from 'react'
import ApiRequest from './ApiRequest'
import TodoList from './TodoList'

const TodoFunctions = () => {
    const [titleInput, setTitleInput] = useState("");
    const [array, setArray] = useState([]);
    const todo_url = 'http://localhost:3500/array'
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('')

    function getCustomDateTime() {
        let date = new Date();

        date.getFullYear();
        date.getMonth();
        date.getDate();
        date.getHours();
        date.getMinutes();

        return date.toLocaleString();
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const resp = await fetch(todo_url);
                if (!resp.ok) throw Error("Unable to load to the URL");
                const respData = await resp.json();
                setTextInput('');
                setArray(respData);
                setShow(true);
                setTitleInput('');
                setSearch('');

            } catch (errMsg) {
                setError(errMsg)
            }

        }

        fetchItem()
    }, [])






    const handleClick = async (e) => {
        e.preventDefault()
        if (!titleInput.trim() || !textInput.trim()) {
            setError("pls enter the correct value")
            return
        }

        const newArray = {
            titleInput: titleInput,
            textInput: textInput
        };

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArray)
        }

        const errMsg = await ApiRequest(todo_url, options)
        if (errMsg) {
            setError(errMsg)
        } else {
            try {
                const resp = await fetch(todo_url);
                if (!resp.ok) throw Error("Unable to load to the URL");
                const respData = await resp.json();
                setTextInput('');
                setArray(respData);
                setShow(true);
                setTitleInput('');
                setSearch('');

            } catch (errMsg) {
                setError(errMsg)
            }
        }
    }

    const handleDelete = async (id) => {
        let deleteUrl = `${todo_url}/${id}`;
        const options = {
            method: "delete"
        }

        const errMsg = await ApiRequest(deleteUrl, options)
        if (errMsg) {
            setError(errMsg)
        } else {
            try {
                const resp = await fetch(todo_url);
                if (!resp.ok) throw Error("Unable to load to the URL");
                const respData = await resp.json();
                setTextInput('');
                setArray(respData);
                setShow(true);
                setTitleInput('');
                setSearch('');

            } catch (errMsg) {
                setError(errMsg)
            }

        }
    }

    const handleChecked = async (id) => {
        const mark = array.find((items) => items.id === id)

        const updateMark = {
            ...mark,
            checked: !mark.checked
        }

        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checked: updateMark.checked })
        }

        const errMsg = await ApiRequest(`${todo_url}/${id}`, options)

        const updateCheckContent = array.map((items) => (
            items.id === id ? updateMark : items

        ))
        setArray(updateCheckContent)
    }

    const filterItem = array.filter((items) => items.textInput.toLowerCase().includes(search.toLocaleLowerCase()))
    return (
        <TodoList 
        error={error}
        getCustomDateTime={getCustomDateTime}
        setSearch={setSearch}
        search={search}
        setTitleInput={setTitleInput}
        textInput={textInput}
        setTextInput={setTextInput}
        handleClick={handleClick}
        filterItem={filterItem}
        handleChecked={handleChecked}
        handleDelete={handleDelete}
        titleInput={titleInput}
        />

    )
}

export default TodoFunctions