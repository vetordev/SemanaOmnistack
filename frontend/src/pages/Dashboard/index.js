import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';
import './style.css';

export default function Dashboard() {
    
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);

        }
        loadSpots();
        
    }, [spots]);  
    //array vazio => executa uma vez  
    const handleExclude = async(spot) => {
        await api.delete(`spots/${spot}/destroy`);
    }
    return (
        <>
        <div className="bookings-link">
            <Link to="/bookings">
                <button className="simple bookings">
                    BOOKINGS PENDENTES
                </button>
            </Link>
        </div>
       
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    <button className="simple exclude" onClick={() => handleExclude(spot._id)} >EXCLUIR</button>
                </li>
            ))}
        </ul>
        <Link to='/New'>
            <button className="btn">Cadastrar novo Spot</button>
        </Link>
            
        </>
    );
}