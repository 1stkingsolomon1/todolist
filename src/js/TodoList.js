

const TodoList = ({ error, getCustomDateTime, search, setSearch, titleInput, setTextInput, setTitleInput, textInput, handleClick, handleChecked, handleDelete, filterItem }) => {
  return (
    <form>
      <h1 className="todo-logo">Todo...</h1>
      <p className="timer">{getCustomDateTime()}</p>

      <input
        type="search"
        name="search"
        id="search"
        value={search}
        className="todo-search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search items..."
        style={{ width: "95%", fontSize: "18px", margin: "auto", padding: "10px" }}
      />

      <input
        type="text"
        placeholder="Title"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        className="todo-title-input"
      />

      <input
        type="text"
        name="text"
        id="text"
        className="todo-listed-items"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Note something down"
      />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error.message || error}</p>}

      <button
        className="todo-button"
        type="button"  // changed to type="button"
        onClick={handleClick}
      >
        Add Todo
      </button>

      <ul className='listed-todo'>
        <h4>Total items: {filterItem.length}</h4>
        {filterItem.map((items) => (
          <li key={items.id} style={{ listStyle: "none", width: "92%" }}>
            <span className='list-items'>
              <strong>Title: {items.titleInput}</strong>
            </span>

            <div className='array-items'>
              <input
                type="checkbox"
                name=""
                id=""
                checked={items.checked}
                onChange={() => handleChecked(items.id)}
              />
              Todo... : {items.textInput}
              <button
                className='todo-delete-button'
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(items.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default TodoList;
