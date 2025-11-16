import { useState, useEffect, useCallback } from "react";
import { patientService } from "../services/patientService";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.getAll();

      if (result.success) {
        setPatients(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar pacientes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPatientById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.getById(id);

      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError(err.message || "Error al cargar paciente");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPatient = useCallback(async (patientData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.create(patientData);

      if (result.success) {
        setPatients((prev) => [...prev, result.data]);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al crear paciente";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePatient = useCallback(async (id, patientData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.update(id, patientData);

      if (result.success) {
        setPatients((prev) => prev.map((p) => (p.id === id ? result.data : p)));
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al actualizar paciente";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePatient = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.delete(id);

      if (result.success) {
        setPatients((prev) => prev.filter((p) => p.id !== id));
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al eliminar paciente";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchPatients = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await patientService.search(query);

      if (result.success) {
        setPatients(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al buscar pacientes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    isLoading,
    error,
    fetchPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    searchPatients,
    clearError,
  };
};

export default usePatients;
