
import { useState, useEffect, useCallback } from "react";
import * as appointmentService from "../services/appointmentService";

export const useAppointments = () => {
 const [appointments, setAppointments] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

const loadAppointments = useCallback(async () => {
 try {
 setLoading(true);
 const data = await appointmentService.getAllAppointments();
 setAppointments(data);
setError(null);
 } catch (err) {
setError(err.message);
 } finally {
 setLoading(false);
 }
 }, []);

 useEffect(() => {
 loadAppointments();
 }, [loadAppointments]);

const addAppointment = async (appointmentData) => {
 try {
      setError(null);
 const dataToSave = {
...appointmentData,
      
 clientId: appointmentData.clientId,
 serviceId: appointmentData.serviceId,
 };

const newAppointment = await appointmentService.createAppointment(dataToSave);
 setAppointments((prev) => [...prev, newAppointment]);
 } catch (err) {
	 console.error("Error al agregar el turno:", err);
 setError(err.message); 
      throw err;
 }
 };

 const removeAppointment = async (id) => {
 try {
 await appointmentService.deleteAppointment(id);
setAppointments((prev) => prev.filter((appt) => appt.id !== id));
 } catch (err) {
 console.error("Error al eliminar el turno:", err);
	  setError(err); 
}
 };


 const updateAppointment = async (id, appointmentData) => {
 try {
      setError(null);
const dataToSave = {
 ...appointmentData,
     
 clientId: appointmentData.clientId,
 serviceId: appointmentData.serviceId,
 };

const updatedAppointment = await appointmentService.updateAppointment(
 id, 
dataToSave
);

setAppointments((prev) =>
 prev.map((appt) => (appt.id === id ? updatedAppointment : appt))
);
 } catch (err) {
console.error("Error al actualizar el turno:", err);
 setError(err.message); 
      throw err;
 }
};


 return {
 appointments,
 loading,
 error,
 addAppointment,
 removeAppointment,
 updateAppointment,
loadAppointments,
};}