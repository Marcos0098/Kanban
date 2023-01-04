import { useState } from 'react'
import Modal from 'react-modal'

import {BsTrash} from 'react-icons/bs'
import {BiEditAlt} from 'react-icons/bi'

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
  const [modalEditOpen, setModalEditOpen] = useState();

  const [id, setID] = useState(0);

  const [task, setTask] = useState();
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
  // open e close Modal para inserir uma task

  // open e close Modal para editar uma task
  function openModalEdit(index) {
    setModalEditOpen(true);
    setEditedIndex(index);
  }

  function closeModalEdit() {
    setModalEditOpen(false);
  }
  // open e close Modal para inserir uma task

  //Submit para adicionar a task na lista "TO DO"
  const handleTask = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setTask(value)
  }

  
  const handleSubmit = () =>{
    
    const newTask = [...listaTask, {
      taskDesc: task,
      taskID: id,
      },
    ];

    setListaTask(newTask);
    setTask("");
    setID(id + 1);
    closeModal();
  }
  //Submit para adicionar a task na lista "TO DO"

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
  //Submit para Editar a task

  //function para deletar Task
  const deletar = (index) => {
    const listaCopy = Array.from(listaTask);
    listaCopy.splice(index, 1)
    setListaTask(listaCopy)
  }
  //function para deletar Task

  //Logs de teste
  console.log("Quantidade de IDs ja criados é de :", id)
  //Logs de teste

  return (
    <div className="App">
      <div className="container-geral">

        <div className="container-task">
          <div className="todo">
            <h2>To do</h2>
            <div className="tasks-todo">
              {listaTask.taskDesc != "" && listaTask.map((desafios,index) => {
                return(<div className='miniContainer-task'>
                  <p>{desafios.taskDesc}</p>
                  <div className="icons-task">
                    <button onClick={() => openModalEdit(index)}><BiEditAlt/></button>
                    <button onClick={() => deletar()}><BsTrash/></button>
                  </div>
                </div>
                ) 
              })}

            </div>
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
                contentLabel="Edit Task"
              >
                <h2>Edite a task abaixo</h2>
                <form onSubmit={handleEdit}>
                  <input type="text" placeholder='Escreva aqui sua nova tarefa!' value={editedTask} onChange={handleEditedTask}/>
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
            
          </div>

        </div>

        <div className="container-task">
          <div className="done">
            <h2>Done</h2>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App
