import React, { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom'
import socketio from 'socket.io-client';
import api from '../../services/api';

export default function Bookings(){
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem('user');

  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id }
  }), [user_id]);

  useEffect(() => {
    console.log('io');
    socket.on('booking_request', data => {
        setRequests([...requests, data]);
    })
  }, [requests, socket]);

  async function handleAccept(id){
    const user_id = localStorage.getItem('user');
    await api.post(`/bookings/${id}/approvals`, '', {
        headers: {
            user_id
        }
    });
    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id){
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    await api.post(`/bookings/${id}/rejections`, '', {
        headers: {
            user_id,
        }
    });
    setRequests(requests.filter(request => request._id !== id));
}

  return (
    <>
      <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>
    </>
  );
}