import { useState } from "react";
import { Table, Badge, Button, Form } from "react-bootstrap";
import "./DataTable.css";

/**
 * Este seria un componente generico para que todas las tablas del sistema sean iguales
 *
 * @param {Array} data - Array de objetos con los datos (registros), que se tienen que mostrar en la tabla
 * @param {Array} columns - Array de objetos que definen las columnas, cada objeto tiene que tener esto:
 *   - key: string - identificador único de la columna
 *   - label: string - texto del encabezado
 *   - render: function (opcional por si se necesita que la columna tenga algun estilo personalizado)
 * @param {Boolean} selectable - Si la tabla permite selección de filas
 * @param {Function} onSelectionChange - Esto sirve para saber cuales son las filas que se seleccionaron
 * @param {Array} actions - Array de objetos con acciones para las cosas que se seleccionaron (Aca pueden poner la cantidad de acciones que quieran segun la necesidad):
 *   - label: string - texto del botón
 *   - variant: string - variante de Bootstrap
 *   - icon: string - clase de icono (Los iconos los pueden sacar de Bootstrap Icons)
 *   - onClick: function - callback que recibe los items seleccionados
 * @param {Boolean} searchable - Si muestra barra de búsqueda
 * @param {String} searchPlaceholder - Placeholder del campo de búsqueda
 * @param {Array} filters - Array de objetos para filtros del dropdown
 * @param {Function} onSearch - Callback personalizado para búsqueda
 * @param {Function} onFilter - Callback personalizado para filtros
 */
const DataTable = ({
  data = [],
  columns = [],
  selectable = false,
  onSelectionChange,
  actions = [],
  searchable = false,
  searchPlaceholder = "Buscar...",
  filters = [],
  onSearch,
  onFilter,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  // Manejar selección de items (individual)

  const handleSelectItem = (id) => {
    // EL const newSelection va a contener los items seleccionados, si el id ya esta en selectedItems lo saca (deselecciona), sino lo agrega
    const newSelection = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];

    setSelectedItems(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  // Seleccionar todos
  const handleSelectAll = (e) => {
    const newSelection = e.target.checked
      ? filteredData.map((item) => item.id)
      : [];
    setSelectedItems(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  // Manejar búsqueda
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Manejar filtros
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  // Filtrar datos
  const filteredData = data.filter((item) => {
    // Búsqueda
    if (searchTerm && !onSearch) {
      const searchString = Object.values(item).join(" ").toLowerCase();
      if (!searchString.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // Filtros
    if (!onFilter && Object.keys(activeFilters).length > 0) {
      for (const [key, value] of Object.entries(activeFilters)) {
        if (value && value !== "all" && item[key] !== value) {
          return false;
        }
      }
    }

    return true;
  });

  // Ejecutar acción
  const handleAction = (action) => {
    const selectedData = data.filter((item) => selectedItems.includes(item.id));
    action.onClick(selectedData, selectedItems);
  };

  return (
    <div className="data-table-container">
      {/* Controles de búsqueda y filtros */}
      {(searchable || filters.length > 0) && (
        <div className="table-controls">
          {searchable && (
            <div className="search-wrapper">
              <Form.Control
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
            </div>
          )}

          {filters.length > 0 && (
            <div className="filter-controls">
              {filters.map((filter) => (
                <Form.Select
                  key={filter.key}
                  value={activeFilters[filter.key] || "all"}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                  className="filter-select"
                >
                  <option value="all">{filter.label}: Todos</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tabla */}
      <div className="table-responsive">
        <Table hover className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedItems.length === filteredData.length &&
                      filteredData.length > 0
                    }
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={
                    selectedItems.includes(item.id) ? "selected-row" : ""
                  }
                >
                  {selectable && (
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`}>
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center text-muted"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Barra de acciones para seleccionados */}
      {selectable && selectedItems.length > 0 && actions.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">
            {selectedItems.length} seleccionado
            {selectedItems.length !== 1 ? "s" : ""}
          </span>
          <div className="action-buttons">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "primary"}
                className={action.className || ""}
                onClick={() => handleAction(action)}
              >
                {action.icon && <i className={`${action.icon} me-2`}></i>}
                {action.label}
              </Button>
            ))}
            <Button
              variant="link"
              className="cancel-btn"
              onClick={() => setSelectedItems([])}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
