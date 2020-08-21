import React from 'react';

function AddTask ({onNewTask}) {
    const taskRef = React.useRef('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onNewTask(
            taskRef.current.value
        );
        taskRef.current.value = '';
    }
    
    return (
        <form className="dnd__add-task" onSubmit={handleSubmit} >
            <input 
                ref={taskRef}
                type="text" 
                className="dnd__input" 
                placeholder="Введите новую задачу"
                required pattern="[A-Za-zА-Яа-я -0-9]{1,40}" 
            />
            <button type="submit" className="dnd__btn-submit">Добавить</button>
        </form>
    )
}

export default AddTask;