import { useState, useEffect, useCallback } from "react";
import { doctorService } from "../services/doctorService";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await doctorService.getAll();

      if (result.success) {
        setDoctors(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar doctores");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEspecialidades = useCallback(async () => {
    try {
      const result = await doctorService.getEspecialidades();
      if (result.success) {
        setEspecialidades(result.data);
      }
    } catch (err) {
      console.error("Error al cargar especialidades:", err);
    }
  }, []);

  const getDoctorById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await doctorService.getById(id);

      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError(err.message || "Error al cargar doctor");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterByEspecialidad = useCallback(async (especialidad) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await doctorService.getByEspecialidad(especialidad);

      if (result.success) {
        setDoctors(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al filtrar doctores");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchDoctors = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await doctorService.search(query);

      if (result.success) {
        setDoctors(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al buscar doctores");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchDoctors();
    fetchEspecialidades();
  }, [fetchDoctors, fetchEspecialidades]);

  return {
    doctors,
    especialidades,
    isLoading,
    error,
    fetchDoctors,
    getDoctorById,
    filterByEspecialidad,
    searchDoctors,
    clearError,
  };
};

export default useDoctors;
