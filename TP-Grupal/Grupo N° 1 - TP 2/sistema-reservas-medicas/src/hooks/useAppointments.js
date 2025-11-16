import { useState, useEffect, useCallback } from "react";
import { appointmentService } from "../services/appointmentService";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.getAll();

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar turnos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppointmentById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.getById(id);

      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError(err.message || "Error al cargar turno");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAppointment = useCallback(async (appointmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.create(appointmentData);

      if (result.success) {
        setAppointments((prev) => [...prev, result.data]);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al crear turno";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAppointment = useCallback(async (id, appointmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.update(id, appointmentData);

      if (result.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? result.data : a))
        );
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al actualizar turno";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAppointment = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.delete(id);

      if (result.success) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || "Error al eliminar turno";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchAppointments = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.search(query);

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al buscar turnos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppointmentsByDoctor = useCallback(async (doctorId) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.getByDoctor(doctorId);

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar turnos del doctor");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppointmentsByPatient = useCallback(async (patientId) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.getByPatient(patientId);

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar turnos del paciente");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppointmentsByStatus = useCallback(async (estado) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.getByStatus(estado);

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Error al cargar turnos por estado");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppointmentsByDateRange = useCallback(
    async (fechaInicio, fechaFin) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await appointmentService.getByDateRange(
          fechaInicio,
          fechaFin
        );

        if (result.success) {
          setAppointments(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message || "Error al cargar turnos por fecha");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateAppointmentStatus = useCallback(async (id, nuevoEstado) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await appointmentService.updateStatus(id, nuevoEstado);

      if (result.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? result.data : a))
        );
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage =
        err.message || "Error al actualizar estado del turno";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getEstados = useCallback(() => {
    return appointmentService.getEstados();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    searchAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    getAppointmentsByStatus,
    getAppointmentsByDateRange,
    updateAppointmentStatus,
    clearError,
    getEstados,
  };
};

export default useAppointments;
