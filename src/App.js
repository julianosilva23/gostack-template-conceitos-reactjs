import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const techs = 'php,react,node';

    const techsArray = techs.split(',');

    const response = await api.post('/repositories', {
      title: `Random Name - ${new Date()}`,
      url: `https://github.com/julianosilva23/${new Date()}`,
      techsArray
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
    if(repositoryIndex !== -1) {

      const response = await api.delete(`/repositories/${id}`);

      if(response.status === 204) {
        
          repositories.splice(repositoryIndex, 1);
    
          setRepositories([...repositories]);
      }
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => {

          return (<li key={id}>
          {title}

          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>)
        })}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
