import { useState } from 'react'
import Modal from 'react-modal'
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
  const [task, setTask] = useState("");


  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const handleTask = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setTask(value)
  }
console.log(task)
  return (
    <div className="App">
      <div className="container-geral">

        <div className="container-task">
          <div className="todo">
            <h2>To do</h2>
            <button onClick={openModal}>Adicionar uma task</button>
            <div className='Modal'>
              <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Task To do"
              >
                <h2>Escreva sua task abaixo</h2>
                  <input type="text" placeholder='Escreva aqui sua tarefa!' value={task} onChange={handleTask}/>
                  <input type="submit" value="Salvar" />
                  <button onClick={closeModal}>Close</button>

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
