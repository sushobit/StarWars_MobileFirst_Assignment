// src/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import './index.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetch(`https://swapi.dev/api/people/?page=${currentPage}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
          setNextPage(data.next);
          setPreviousPage(data.previous);
        });
    }
  }, [token, navigate, currentPage]);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🌌 Star Wars Characters 🧑‍🚀</h1>
      <button className='logoutbutton' onClick={handleLogout}>Logout</button>
      <div className="card-container">
        {characters.map((character, index) => (
          <div className="card" key={index}>
            <h2><span className="emoji">🤖</span>{character.name}</h2>
            <p><strong>Height:</strong> {character.height}</p>
            <p><strong>Mass:</strong> {character.mass}</p>
            <p><strong>Hair Color:</strong> {character.hair_color}</p>
            <p><strong>Skin Color:</strong> {character.skin_color}</p>
            <p><strong>Eye Color:</strong> {character.eye_color}</p>
            <p><strong>Birth Year:</strong> {character.birth_year}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Created:</strong> {character.created}</p>
            <p><strong>Edited:</strong> {character.edited}</p>
            <p><strong>URL:</strong> {character.url}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
        <button onClick={handleNextPage} disabled={!nextPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
