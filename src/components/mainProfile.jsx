import React, { useState, useEffect } from 'react';
import profileicon from '../assets/profileicon.png';
import icon from '../assets/background/icon.jpg';

const ProfileCard = () => {
  const [userData, setUserData] = useState({
    data: {
      id: null,
      name: 'Nombre por defecto',
      email: 'Correo por defecto',
      height: 'Altura por defecto',
      weight: 'Peso por defecto',
      // ... otras propiedades
    },
    status: 'loading', // Puedes usar un estado de carga inicial si es necesario
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3006/api/v1/7');

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recuperados:', data);
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);

        if (error instanceof Error && error.response) {
          const responseText = await error.response.text();
          console.log('Respuesta del servidor:', responseText);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src={icon} alt="Mountain" />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={profileicon} alt="Woman looking front" />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">{userData?.data?.name}</h2>
        <p className="text-gray-500">Soy EntrenAT!!</p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <>
          <li key="weight" className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545" />
            </svg>
            <div>{userData?.data?.weight}kg</div>
          </li>
          <li key="height" className="flex flex-col items-center justify-between">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>{userData?.data?.height}m</div>
          </li>
        </>
      </ul>
      <div className="p-4 border-t mx-8 mt-2">
        <p className="text-lg text-black font-bold">¡ Logros Obtenidos !</p>
        <p>No hay logros aún.</p>
      </div>
    </div>
  );
};

export default ProfileCard;