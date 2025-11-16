import pool from "../db.js";

export const getEventos = async (req, res) => {
try {

    const [eventos] = await pool.query("SELECT * FROM eventos");

    const eventosCompletos = await Promise.all(
      eventos.map(async (evento) => {
        
        const [artistas] = await pool.query(
          `SELECT a.* FROM artistas a
           JOIN evento_artista ea ON a.id = ea.id_artista
           WHERE ea.id_evento = ?`,
          [evento.id]
        );

        const [asistentes] = await pool.query(
          `SELECT a.* FROM asistentes a
           JOIN evento_asistente ea ON a.id = ea.id_asistente
           WHERE ea.id_evento = ?`,
          [evento.id]
        );

        return {
          ...evento,
          artistas: artistas,
          asistentes: asistentes
        };
      })
    );

    res.json(eventosCompletos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

export const getEventoById = async (req, res) =>{
  const { id } = req.params;

  const [eventoRows] = await pool.query("SELECT * FROM eventos WHERE id = ?", [id]);
  if (eventoRows.length === 0) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  const evento = eventoRows[0];

  const [artistas] = await pool.query(
    `SELECT a.* FROM artistas a
     JOIN evento_artista ea ON a.id = ea.id_artista
     WHERE ea.id_evento = ?`,
    [id]
  );

  const [asistentes] = await pool.query(
    `SELECT a.* FROM asistentes a
     JOIN evento_asistente ea ON a.id = ea.id_asistente
     WHERE ea.id_evento = ?`,
    [id]
  );

  res.json({
    ...evento,
    artistas: artistas,
    asistentes: asistentes
  });
};

export const createEvento = async (req, res) => {
  const { nombre, fecha, lugar, cupo } = req.body;
  const [result] = await pool.query(
    "INSERT INTO eventos (nombre, fecha, lugar, cupo) VALUES (?, ?, ?, ?)",
    [nombre, fecha, lugar, cupo]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
};

export const updateEvento = async (req, res) => {
try {
    const { id } = req.params;
    const { nombre, fecha, lugar, cupo } = req.body;

    const fechaFormateada = fecha ? fecha.split("T")[0] : null;

    await pool.query(
      "UPDATE eventos SET nombre=?, fecha=?, lugar=?, cupo=? WHERE id=?",
      [nombre, fechaFormateada, lugar, cupo, id]
    );
    res.json({ message: "Evento actualizado" });

  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
  
  
};

export const deleteEvento = async (req, res) => {
  await pool.query("DELETE FROM eventos WHERE id = ?", [req.params.id]);
  res.json({ message: "Evento eliminado" });
};


export const getArtistasPorEvento = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    `SELECT a.* FROM artistas a
     JOIN evento_artista ea ON a.id = ea.id_artista
     WHERE ea.id_evento = ?`,
    [id]
  );
  res.json(rows);
};

export const asociarArtistaAEvento = async (req, res) => {
  const { id } = req.params; 
  const { idArtista } = req.body;
  
  const [existe] = await pool.query(
    "SELECT * FROM evento_artista WHERE id_evento = ? AND id_artista = ?",
    [id, idArtista]
  );
  if (existe.length > 0) {
    return res.status(400).json({ message: "Artista ya asociado" });
  }

  await pool.query(
    "INSERT INTO evento_artista (id_evento, id_artista) VALUES (?, ?)",
    [id, idArtista]
  );
  res.status(201).json({ message: "Artista asociado" });
};

export const removerArtistaDeEvento = async (req, res) => {
  const { id, idArtista } = req.params;
  await pool.query(
    "DELETE FROM evento_artista WHERE id_evento = ? AND id_artista = ?",
    [id, idArtista]
  );
  res.json({ message: "Artista removido" });
};


export const getAsistentesPorEvento = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    `SELECT a.* FROM asistentes a
     JOIN evento_asistente ea ON a.id = ea.id_asistente
     WHERE ea.id_evento = ?`,
    [id]
  );
  res.json(rows);
};

export const inscribirAsistenteAEvento = async (req, res) => {
  const { id } = req.params; 
  const { idAsistente } = req.body;
  const [existe] = await pool.query(
    "SELECT * FROM evento_asistente WHERE id_evento = ? AND id_asistente = ?",
    [id, idAsistente]
  );
  if (existe.length > 0) {
    return res.status(400).json({ message: "Asistente ya inscrito" });
  }
  
  await pool.query(
    "INSERT INTO evento_asistente (id_evento, id_asistente) VALUES (?, ?)",
    [id, idAsistente]
  );
  res.status(201).json({ message: "Asistente inscrito" });
};

export const removerAsistenteDeEvento = async (req, res) => {
  const { id, idAsistente } = req.params;
  await pool.query(
    "DELETE FROM evento_asistente WHERE id_evento = ? AND id_asistente = ?",
    [id, idAsistente]
  );
  res.json({ message: "Asistente removido" });
};