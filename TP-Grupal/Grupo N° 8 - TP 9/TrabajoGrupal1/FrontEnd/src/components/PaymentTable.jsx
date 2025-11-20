// FrontEnd/src/components/PaymentTable.jsx (MODIFICADO)
import { Badge, Button } from "react-bootstrap";
import DataTable from "./ui/DataTable";
import "./PaymentTable.css";

// 1. Importamos el apiService para hacer los cambios
import apiService from "../services/apiService"; 

// 2. Aceptamos los props que nos pasa 'Pagos.jsx'
const PaymentTable = ({ payments, setPayments, setError }) => {
  
  // 6. REFACTORIZADO: Registrar pago individual
  const handleRegisterPayment = async (id) => {
    try {
      // 6a. Llamamos al backend para actualizar el estado
      // (La ruta es 'cuotas', el id es el id, y el body es {estado: "Pagado"})
      await apiService.updateItem('cuotas', id, { estado: "Pagado" });

      // 6b. Actualizamos el estado en el frontend (en el padre 'Pagos.jsx')
      const updatedPayments = payments.map((payment) =>
        payment.id === id ? { ...payment, estado: "Pagado" } : payment
      );
      setPayments(updatedPayments); // Actualiza el estado en Pagos.jsx
      setError(null); // Limpiamos cualquier error anterior

    } catch (err) {
      setError(err.message || "Error al registrar el pago.");
    }
  };

  // 7. REFACTORIZADO: Registrar pagos seleccionados
  const handleRegisterSelected = async (selectedData) => {
    const selectedIds = selectedData.map((item) => item.id);
    
    // Mostramos un error si no hay nada seleccionado
    if (selectedIds.length === 0) {
      alert("Por favor, seleccione al menos un pago para registrar.");
      return;
    }

    try {
      // Creamos un array de promesas, una por cada pago a actualizar
      const updatePromises = selectedIds.map(id => 
        apiService.updateItem('cuotas', id, { estado: "Pagado" })
      );
      
      // 7a. Ejecutamos todas las actualizaciones al mismo tiempo
      await Promise.all(updatePromises);

      // 7b. Actualizamos el estado local de una sola vez
      const updatedPayments = payments.map((payment) =>
        selectedIds.includes(payment.id)
          ? { ...payment, estado: "Pagado" }
          : payment
      );
      setPayments(updatedPayments); // Actualiza el estado en Pagos.jsx
      setError(null);

    } catch (err) {
      setError(err.message || "Error al registrar los pagos seleccionados.");
    }
  };

  // 8. (Sin cambios) Enviar recordatorio
  const handleSendReminder = (selectedData) => {
    alert(`Enviando recordatorio a ${selectedData.length} miembro(s)`);
  };

  // 9. (Sin cambios) Badge de estado
  const getStatusBadge = (estado) => {
    switch (estado) {
      case "Pagado":
        return <Badge bg="success" className="status-badge">Pagado</Badge>;
      case "Vencido":
        return <Badge bg="danger" className="status-badge">Vencido</Badge>;
      case "Pendiente":
        return <Badge bg="warning" text="dark" className="status-badge">Pendiente</Badge>;
      default:
        return <Badge bg="secondary" className="status-badge">{estado}</Badge>;
    }
  };

  // 10. (Casi sin cambios) Definir columnas
  // Nota: Los nombres de tus columnas (ej: 'miembro')
  // no coinciden con la BD ('socio_nombre'). 
  // ¡Asegúrate de que tu API devuelva los nombres que el frontend espera!
  // Por ahora lo dejamos como está.
  const columns = [
    {
      key: "miembro", // Tu API debe devolver 'miembro' o debes cambiar esto
      label: "Miembro",
      render: (item) => <span className="member-name">{item.miembro}</span>,
    },
    { key: "membresia", label: "Membresía" },
    {
      key: "cuota", // Tu API debe devolver 'cuota' o debes cambiar esto
      label: "Cuota",
      render: (item) => {
        // Convertimos explícitamente a Número antes de formatear
        const cuota = Number(item.cuota || 0); 
        return `$${cuota.toFixed(2)}`;
      },
    },
    { key: "estado", label: "Estado", render: (item) => getStatusBadge(item.estado) },
    { key: "fechaVencimiento", label: "Fecha de Vencimiento" },
    {
      key: "accion",
      label: "Acción",
      render: (item) =>
        item.estado === "Pagado" ? (
          <span className="paid-text">Pagado</span>
        ) : (
          <Button
            variant="link"
            className="action-link"
            onClick={() => handleRegisterPayment(item.id)}
          >
            Registrar Pago
          </Button>
        ),
    },
  ];

  // (El resto de filtros y actions se mantiene igual)
  const filters = [ ];
  const actions = [ ];

  // 11. DATATABLE: Ahora 'data={payments}' usa el prop del padre
  return (
    <DataTable
      data={payments}
      columns={columns}
      selectable={true}
      searchable={true}
      searchPlaceholder="Buscar..."
      filters={filters}
      actions={actions}
    />
  );
};

export default PaymentTable;