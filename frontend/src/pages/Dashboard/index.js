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
    }, []);

    
    //array vazio => executa uma vez

    return (
        <>
        <div>

        </div>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    </li>
                ))}
            </ul>
            <Link to='/New'>
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
            
        </>
    );
}