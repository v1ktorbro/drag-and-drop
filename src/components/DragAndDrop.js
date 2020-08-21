import React from 'react';
import AddTask from './AddTask.js'

function DragAndDrop ({defaultData}) {
    const [list, setList] = React.useState(defaultData);
    const [dragging, setDragging] = React.useState(false);
    const draggItem = React.useRef();
    const dragNode = React.useRef();

    const handleNewTask = (newTask) => {
        setList((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList));
            newList[0].tasks.unshift(newTask)
            return newList;
        })
    }

    const handleDragStart = (e, params) => {
        setDragging(true);
        draggItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
    }

    const handleDragEnter = (e, params) => {
        const currentItem = draggItem.current;
        if(e.target !== dragNode.current) {
            setList((oldList) => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.groupIndex].tasks.splice(params.taskIndex, 0, newList[currentItem.groupIndex].tasks.splice(currentItem.taskIndex, 1));
                draggItem.current = params;
                return newList;
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        draggItem.current = null;
        dragNode.current = null;
    }

    const getStyled = (params) => {
        const currentItem = draggItem.current;
        if (params.groupIndex === currentItem.groupIndex &&
            params.taskIndex === currentItem.taskIndex) {
                return "dnd__task dnd__task_active"
            }
        return "dnd__task"
    }

    return (
        <section className="dnd">
            <AddTask onNewTask={handleNewTask} />
            <div className="dnd__groups" >
            {list.map((group, groupIndex) => (
                <div 
                    onDragEnter={dragging && !group.tasks.length ? (e) => {handleDragEnter(e, {groupIndex, taskIndex: 0})} : null}
                    className="dnd__group" 
                    key={groupIndex} 
                >
                    <h2 className="dnd__title">
                        {group.title}
                    </h2>
                    <ul className="dnd__tasks">
                        {group.tasks.map((task, taskIndex) => (
                            <li 
                                draggable
                                onDragStart={(e) => {handleDragStart(e, {groupIndex, taskIndex})}}
                                onDragEnter={(e) => handleDragEnter(e, {groupIndex, taskIndex})}
                                className={dragging ? getStyled({groupIndex, taskIndex}) : "dnd__task"} 
                                key={taskIndex}
                            >{task}</li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        </section>
    )
}

export default DragAndDrop;