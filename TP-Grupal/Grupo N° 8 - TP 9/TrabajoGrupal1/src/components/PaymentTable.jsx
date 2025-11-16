import { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import DataTable from "./ui/DataTable";
import "./PaymentTable.css";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  // Pre carga los datos en la tabla con el useEffect
  useEffect(() => {
    // Aunque diga "get", en realidad tambien setea los datos iniciales si no existen, es aqui donde se pre cargan datos
    const storedPayments = localStorage.getItem("payments");

    const initialPayments = [
      {
        id: 1,
        miembro: "Juan Pérez",
        membresia: "Premium",
        cuota: 50.0,
        estado: "Pagado",
        fechaVencimiento: "01 Mar 2024",
      },
      {
        id: 2,
        miembro: "María González",
        membresia: "Estándar",
        cuota: 35.0,
        estado: "Vencido",
        fechaVencimiento: "01 Feb 2024",
      },
      {
        id: 3,
        miembro: "Pedro Martínez",
        membresia: "Premium",
        cuota: 50.0,
        estado: "Pendiente",
        fechaVencimiento: "20 Mar 2024",
      },
      {
        id: 4,
        miembro: "Ana López",
        membresia: "Estudiante",
        cuota: 25.0,
        estado: "Vencido",
        fechaVencimiento: "01 Ene 2024",
      },
      {
        id: 5,
        miembro: "Carlos Rodríguez",
        membresia: "Estándar",
        cuota: 35.0,
        estado: "Pagado",
        fechaVencimiento: "15 Mar 2024",
      },
    ];

    if (!storedPayments) {
      // Cuando no hay datos en localStorage, precarga los datos iniciales
      localStorage.setItem("payments", JSON.stringify(initialPayments));
      setPayments(initialPayments);
    } else {
      // Si existen datos, usarlos tal cual
      setPayments(JSON.parse(storedPayments));
    }
  }, []);

  // Actualizar pagos en estado y localStorage, con esto se actualizan los datos en la tabla y en el local storage
  const updatePayments = (updatedPayments) => {
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
  };

  // Registrar pago individual
  const handleRegisterPayment = (id) => {
    // Actualiza el estado del pago a "Pagado", el map recorre todos los pagos y si el id coincide, cambia el estado, se usa operador ternario y se crea un nuevo objeto con el spread operator (este operador copia todas las propiedades del objeto original y luego se sobreescribe la propiedad estado de )
    const updatedPayments = payments.map((payment) =>
      payment.id === id ? { ...payment, estado: "Pagado" } : payment
    );
    updatePayments(updatedPayments);
  };

  // Registrar pagos seleccionados
  const handleRegisterSelected = (selectedData) => {
    const selectedIds = selectedData.map((item) => item.id);
    const updatedPayments = payments.map((payment) =>
      selectedIds.includes(payment.id)
        ? { ...payment, estado: "Pagado" }
        : payment
    );
    updatePayments(updatedPayments);
  };

  // Enviar recordatorio
  const handleSendReminder = (selectedData) => {
    alert(`Enviando recordatorio a ${selectedData.length} miembro(s)`);
  };

  // Badge de estado
  const getStatusBadge = (estado) => {
    switch (estado) {
      case "Pagado":
        return (
          <Badge bg="success" className="status-badge">
            Pagado
          </Badge>
        );
      case "Vencido":
        return (
          <Badge bg="danger" className="status-badge">
            Vencido
          </Badge>
        );
      case "Pendiente":
        return (
          <Badge bg="warning" text="dark" className="status-badge">
            Pendiente
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary" className="status-badge">
            {estado}
          </Badge>
        );
    }
  };

  // Definir columnas de la tabla (Para saber el por que de cada columna, ver el componente DataTable ahi deje documentado bien para que es cada cosa)
  const columns = [
    {
      key: "miembro",
      label: "Miembro",
      render: (item) => <span className="member-name">{item.miembro}</span>,
    },
    {
      key: "membresia",
      label: "Membresía",
      // Este no tiene render porque no necesito cambiar el formato de como viene como los otros
    },
    {
      key: "cuota",
      label: "Cuota",
      // Acá trae los datos de cuota pero para el futuro estaria bueno que en vez de un 0, ponga "Error" o algo así para evitar confusiones
      render: (item) => {
        const cuota = item.cuota || 0;
        return `$${cuota.toFixed(2)}`;
      },
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => getStatusBadge(item.estado),
    },
    {
      key: "fechaVencimiento",
      label: "Fecha de Vencimiento",
    },
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

  // Definir filtros
  const filters = [
    {
      key: "estado",
      label: "Estado",
      options: [
        { value: "Pagado", label: "Pagado" },
        { value: "Vencido", label: "Vencido" },
        { value: "Pendiente", label: "Pendiente" },
      ],
    },
  ];

  // Definir acciones
  const actions = [
    {
      label: "Registrar Pago",
      variant: "primary",
      icon: "bi bi-check-circle",
      className: "register-payment-btn",
      onClick: handleRegisterSelected,
    },
    {
      label: "Enviar Recordatorio",
      variant: "outline-secondary",
      icon: "bi bi-envelope",
      className: "send-reminder-btn",
      onClick: handleSendReminder,
    },
  ];

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
