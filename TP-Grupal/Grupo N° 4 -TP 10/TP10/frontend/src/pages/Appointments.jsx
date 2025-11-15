
import { useMemo, useState } from "react"; 
import { Alert, Spinner, Button } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons"; 
import { useApi } from "../hooks/useApi";
import { useAppointments } from "../hooks/useAppointment";
import {
  getAllClients,
  getAllServices,
} from "../services/appointmentService";
import DataTable from "../components/DataTable";
import AppointmentForm from "../components/AppointmentForm";
import "../styles/appointments.css";

export default function Appointments() {
  const [editingAppointment, setEditingAppointment] = useState(null);

  const {
    appointments,
    loading: apptLoading,
    error: apptError,
    addAppointment,
    removeAppointment,
    updateAppointment, 
  } = useAppointments();

  const { data: clients, loading: clientsLoading } = useApi(getAllClients);
  const { data: services, loading: servicesLoading } = useApi(getAllServices);

const handleSave = async (formData, id) => { 
 if (id) {
 await updateAppointment(id, formData); 
} else {
 await addAppointment(formData); 
}
 
};

  const tableData = useMemo(() => {
    if (!clients || !services) return [];

    return appointments.map((t) => {
      const clientName = clients.find((c) => c.id == t.clientId)?.name || "N/A";
      const serviceName =
        services.find((s) => s.id == t.serviceId)?.name || "N/A";

      return [
        clientName,
        serviceName,
        t.date,
        t.time,
        <div className="d-flex gap-2">
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => setEditingAppointment(t)} 
          >
            <PencilSquare />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              if (window.confirm("¿Seguro que quieres eliminar este turno?")) {
                removeAppointment(t.id);
              }
            }}
          >
            <Trash />
          </Button>
        </div>,
      ];
    });
   
  }, [appointments, clients, services, removeAppointment]);

  const tableColumns = ["Cliente", "Servicio", "Fecha", "Hora", "Acciones"];

  if (apptLoading || clientsLoading || servicesLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (apptError) {
    return <Alert variant="danger">Error: {apptError}</Alert>;
  }

  return (
    <div className="appointments-container">
      <h4 className="appointments-title">Turnos</h4>

      <AppointmentForm
        clients={clients}
        services={services}
        onSave={handleSave} 
        editingAppointment={editingAppointment}
        setEditingAppointment={setEditingAppointment} 
      />

      <div className="table-wrapper">
        <DataTable columns={tableColumns} data={tableData} />
      </div>
    </div>
  );
}