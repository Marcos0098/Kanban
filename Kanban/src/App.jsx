
import { useState } from 'react';
import Modal from 'react-modal';

import {BsTrash} from 'react-icons/bs';
import {BiEditAlt} from 'react-icons/bi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import './App.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root'));

function App() {
  const [modalOpen, setModalOpen] = useState();
  const [id, setID] = useState(0);
  const [task, setTask] = useState();
  const [modalEditOpen, setModalEditOpen] = useState();
  const [editedTask, setEditedTask] = useState();
  const [editedIndex, setEditedIndex] = useState();

  const [listaTask, setListaTask] = useState([])

  // open e close Modal para inserir uma task
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModalEdit(index) {
    setModalEditOpen(true);
    setEditedIndex(index)
  }

  function closeModalEdit() {
    setModalEditOpen(false);
  }

  //Submit para adicionar a task na lista "TO DO"
  const handleTask = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setTask(value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const newTask = [...listaTask, {
      taskDesc: task,
      id: id,
      column: 1
      },
    ];

    setListaTask(newTask);
    setTask("");
    setID(id + 1);
    closeModal();
  }

  //Submit para Editar a task
  const handleEditedTask = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setEditedTask(value);
  }
  
  const handleEdit = () => {
    const listaCopy = Array.from(listaTask);
    listaCopy.splice(editedIndex, 1, {taskDesc: editedTask});


    setListaTask(listaCopy);
    setEditedTask("");
    closeModalEdit();
  }

  //function para deletar Task
  const deletar = (index) => {
    console.log(`o id para deletar é: ${index}`);
    const listaCopy = Array.from(listaTask);

    listaCopy.splice(index, 1)
    setListaTask(listaCopy)
  }

  //Alterar a lista de tasks ao arrastar e soltar
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(listaTask);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListaTask(items);
  }

  function plusColumn(index) {
    const listaCopyTodo = Array.from(listaTask);
    listaCopyTodo[index].column += 1; 
    
    if(listaCopyTodo[index].column > 3){
      listaCopyTodo[index].column = 3;
    }

    if(listaCopyTodo[index].column < 1){
      listaCopyTodo[index].column = 1;
    }

    setListaTask(listaCopyTodo)
  }

  function decreaseColumn(index){
    const listaCopyTodo = Array.from(listaTask);
    listaCopyTodo[index].column -= 1; 
    
    if(listaCopyTodo[index].column > 3){
      listaCopyTodo[index].column = 3;
    }

    if(listaCopyTodo[index].column < 1){
      listaCopyTodo[index].column = 1;
    }

    setListaTask(listaCopyTodo)
  }

  //Logs de teste
  console.log("Lista Todo",listaTask)
  //Logs de teste

  return (
    <div className="App">
      <div className="container-geral">
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="container-task">
          <div className="todo">
            <h2>To do</h2>
              <Droppable droppableId="desafios-todo">
              {(provided) => (
                  <ul className="desafios-todo" {...provided.droppableProps} ref={provided.innerRef}>
                  {listaTask.map((desafios,index) => {
                    return(
                      desafios.column === 1 && 
                      <Draggable key={desafios.taskDesc} draggableId={desafios.taskDesc} index={index}>
                        {(provided) => (
                          <li className='miniContainer-task' key={desafios.taskDesc} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{desafios.taskDesc}</p>
                            <div className="icons">
                              <div className="edit-delete">
                                <button onClick={() => openModalEdit(index)}><BiEditAlt/></button>
                                <button onClick={() => deletar(index)}><BsTrash/></button>
                              </div>
                              <button className='right-arrow' onClick={() => plusColumn(index)}><AiOutlineArrowRight/></button>
                            </div>

                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>

            <button className='adicionar-task' onClick={openModal}>Adicionar uma task</button>

            <div className='Modal'>
              <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Task To do"
              >
                <h2>Escreva sua task abaixo</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" placeholder='Escreva aqui sua tarefa!' value={task} onChange={handleTask}/>
                  <input type="submit" value="Salvar" />
                  <button onClick={closeModal}>Close</button>
                </form>
              </Modal>

              <Modal
                isOpen={modalEditOpen}
                onRequestClose={closeModalEdit}
                style={customStyles}
                contentLabel="Edit Tasks"
                >
                  <h2>Edite sua task</h2>
                  <form onSubmit={handleEdit}>
                    <input type="text" placeholder='Escreva aqui sua tarefa!' value={editedTask} onChange={handleEditedTask}/>
                    <input type="submit" value="Salvar" />
                    <button onClick={closeModalEdit}>Close</button>
                </form>
                </Modal>
            </div>
          </div>
        </div>

        <div className="container-task">
          <div className="doing">
            <h2>Doing</h2>
                <ul className='desafios-doing'>
                <Droppable droppableId="desafios-Doing">
              {(provided) => (
                  <ul className="desafios-Doing" {...provided.droppableProps} ref={provided.innerRef}>
                  {listaTask.map((desafios,index) => {
                    return(
                      desafios.column === 2 && 
                      <Draggable key={desafios.taskDesc} draggableId={desafios.taskDesc} index={index}>
                        {(provided) => (
                          <li className='miniContainer-task' key={desafios.taskDesc} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{desafios.taskDesc}</p>
                            <div className="icons">
                            <button className='right-arrow' onClick={() => decreaseColumn(index)}><AiOutlineArrowLeft/></button>
                              <div className="edit-delete">
                                <button onClick={() => openModalEdit(index)}><BiEditAlt/></button>
                                <button onClick={() => deletar(index)}><BsTrash/></button>
                              </div>
                              <button className='right-arrow' onClick={() => plusColumn(index)}><AiOutlineArrowRight/></button>
                            </div>

                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
                </ul>
                <div className="Modal">
                  <Modal
                  isOpen={modalEditOpen}
                  onRequestClose={closeModalEdit}
                  style={customStyles}
                  contentLabel="Edit Tasks"
                  >
                    <h2>Edite sua task</h2>
                    <form onSubmit={handleEdit}>
                      <input type="text" placeholder='Escreva aqui sua tarefa!' value={editedTask} onChange={handleEditedTask}/>
                      <input type="submit" value="Salvar" />
                      <button onClick={closeModalEdit}>Close</button>
                  </form>
                  </Modal>
                </div>
          </div>
        </div>

        <div className="container-task">
          <ul className="done">
            <h2>Done</h2>
            <Droppable droppableId="desafios-Done">
              {(provided) => (
                  <ul className="desafios-Done" {...provided.droppableProps} ref={provided.innerRef}>
                  {listaTask.map((desafios,index) => {
                    return(
                      desafios.column === 3 && 
                      <Draggable key={desafios.taskDesc} draggableId={desafios.taskDesc} index={index}>
                        {(provided) => (
                          <li className='miniContainer-task' key={desafios.taskDesc} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{desafios.taskDesc}</p>
                            <div className="icons">
                            <button className='right-arrow' onClick={() => decreaseColumn(index)}><AiOutlineArrowLeft/></button>
                              <div className="edit-delete">
                                <button onClick={() => openModalEdit(index)}><BiEditAlt/></button>
                                <button onClick={() => deletar(index)}><BsTrash/></button>
                              </div>
                            </div>

                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
          </ul>
            <div className="Modal">
              <Modal
              isOpen={modalEditOpen}
              onRequestClose={closeModalEdit}
              style={customStyles}
              contentLabel="Edit Tasks"
              >
              <h2>Edite sua task</h2>
                <form onSubmit={handleEdit}>
                  <input type="text" placeholder='Escreva aqui sua tarefa!' value={editedTask} onChange={handleEditedTask}/>
                  <input type="submit" value="Salvar" />
                  <button onClick={closeModalEdit}>Close</button>
                </form>
              </Modal>
            </div>
        </div>
        </DragDropContext> 
      </div>

    </div>
  )
}

export default App
