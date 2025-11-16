// Store para manejo de estado global (preparado para Redux/Zustand)
export const initialState = {
  user: null,
  turnos: [],
  pacientes: [],
  medicos: [],
  especialidades: []
};

export const actions = {
  SET_USER: 'SET_USER',
  ADD_TURNO: 'ADD_TURNO',
  UPDATE_TURNO: 'UPDATE_TURNO',
  DELETE_TURNO: 'DELETE_TURNO'
};

// Por ahora solo exportamos la estructura básica
export default {
  initialState,
  actions
};
