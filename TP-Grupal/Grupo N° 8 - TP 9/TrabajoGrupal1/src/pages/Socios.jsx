import { useState, useEffect } from "react";
import MembersList from "../components/MembersList";
import MemberDetail from "../components/MemberDetail";
import "./Socios.css";

const Socios = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // Pre cargar datos de miembros desde localStorage
  useEffect(() => {
    const storedMembers = localStorage.getItem("members");

    const initialMembers = [
      {
        id: 1,
        fullName: "Martín Fernández",
        email: "martin.fernandez@example.com",
        phone: "11-2345-6789",
        dateOfBirth: "1990-05-15",
        memberSince: "1 Ene 2023",
        avatar: "https://i.pravatar.cc/150?img=12",
        associatedSports: ["Fútbol", "Básquetbol"],
      },
      {
        id: 2,
        fullName: "Lucía Giménez",
        email: "lucia.gimenez@example.com",
        phone: "11-3456-7890",
        dateOfBirth: "1988-08-22",
        memberSince: "15 Feb 2023",
        avatar: "https://i.pravatar.cc/150?img=5",
        associatedSports: ["Tenis", "Natación"],
      },
      {
        id: 3,
        fullName: "Santiago Rodríguez",
        email: "santiago.rodriguez@example.com",
        phone: "11-4567-8901",
        dateOfBirth: "1995-03-10",
        memberSince: "20 Mar 2023",
        avatar: "https://i.pravatar.cc/150?img=13",
        associatedSports: ["Básquetbol", "Vóleibol"],
      },
      {
        id: 4,
        fullName: "Sofía Álvarez",
        email: "sofia.alvarez@example.com",
        phone: "11-5678-9012",
        dateOfBirth: "1992-11-30",
        memberSince: "5 Abr 2023",
        avatar: "https://i.pravatar.cc/150?img=9",
        associatedSports: ["Fútbol", "Tenis"],
      },
    ];

    if (!storedMembers) {
      localStorage.setItem("members", JSON.stringify(initialMembers));
      setMembers(initialMembers);
      setSelectedMember(initialMembers[0]);
    } else {
      const parsedMembers = JSON.parse(storedMembers);
      setMembers(parsedMembers);
      setSelectedMember(parsedMembers[0]);
    }
  }, []);

  // Actualizar miembros en estado y localStorage
  const updateMembers = (updatedMembers) => {
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  // Seleccionar un miembro
  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  // Agregar nuevo miembro
  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      fullName: "Nuevo Miembro",
      email: "nuevo@example.com",
      phone: "000-000-0000",
      dateOfBirth: "2000-01-01",
      memberSince: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      associatedSports: [],
    };

    const updatedMembers = [...members, newMember];
    updateMembers(updatedMembers);
    setSelectedMember(newMember);
  };

  // Actualizar miembro
  const handleUpdateMember = (updatedMember) => {
    const updatedMembers = members.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );
    updateMembers(updatedMembers);
    setSelectedMember(updatedMember);
  };

  // Eliminar miembro
  const handleDeleteMember = (memberId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este miembro?"
    );
    if (confirmDelete) {
      const updatedMembers = members.filter((member) => member.id !== memberId);
      updateMembers(updatedMembers);
      setSelectedMember(updatedMembers[0] || null);
    }
  };

  return (
    <div className="socios-page">
      <div className="socios-content">
        {/* Lista de miembros (Panel izquierdo) */}
        <MembersList
          members={members}
          selectedMember={selectedMember}
          onSelectMember={handleSelectMember}
          onAddMember={handleAddMember}
        />

        {/* Detalle del miembro (Panel derecho) */}
        {selectedMember && (
          <MemberDetail
            member={selectedMember}
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
          />
        )}
      </div>
    </div>
  );
};

export default Socios;
