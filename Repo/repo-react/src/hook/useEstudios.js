import {getEstudios, createEstudio, updateEstudio, deleteEstudio, getEstudioById} from '../services/estudiosService.js';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {ESTUDIOS} from '../routers/estudios.routes.js';

export const useEstudios = () => {
    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


//mostrar los estudios
const fetchEstudios = async () => {
    try {
        const data = await getEstudios();
        console.log(data)
        setEstudios(data);
    } catch (error) {
        console.error("Error fetching estudios:", error);
    }
};
useEffect(() => {
    fetchEstudios();
}, []);
//mostrar por unidad cada estudios

const getEstudioId = async (id) => {
    try {
        const estudio = await getEstudioById(id);
        return estudio;
    } catch (error) {
        console.error("Error fetching estudio by id:", error);
    }
}
//crear estudio

const crearEstudio = async (estudioData) => {
    try {
        const newEstudio = await createEstudio(estudioData);
        setEstudios([...estudios, newEstudio]);
        if (newEstudio) {
        navigate(ESTUDIOS);
        }
    } catch (error) {
        console.error("Error creating estudio:", error);
    }
}
//editar estudio

const editarEstudio = async (id, estudioData) => {
    try {
        const updatedEstudio = await updateEstudio(id, estudioData);
        setEstudios(estudios.map(estudio => (estudio.id === id ? updatedEstudio : estudio)));
        if (updatedEstudio) {
        navigate(ESTUDIOS);
        }
    } catch (error) {
        console.error("Error updating estudio:", error);
    }
}
        //eliminar estudio

const eliminarEstudio = async (id) => {
    try {
        console.log("Eliminando estudio con id:", id);
        await deleteEstudio(id);
        setEstudios(estudios.filter(estudio => estudio.id !== id));
    } catch (error) {
        console.error("Error deleting estudio:", error);
    }
}



    return {
        estudios,
        setEstudios,
        getEstudioId,
        crearEstudio,
        editarEstudio,
        eliminarEstudio,
        getEstudioById,
        loading,
        setLoading
    }
}