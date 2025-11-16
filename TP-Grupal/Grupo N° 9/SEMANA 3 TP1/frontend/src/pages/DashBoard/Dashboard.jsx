import { useService } from '../hooks/useService';
import { LibrosService } from '../services/libros';
import { AlumnosService } from '../services/alumnos';
import { PrestamosService } from '../services/prestamos';

export default function Dashboard() {
  const libros = useService(LibrosService.list, []);
  const alumnos = useService(AlumnosService.list, []);
  const prestamos = useService(PrestamosService.list, []);

  return (
    <div>
      <h1>Dashboard — Biblioteca</h1>

      <div style={styles.grid}>
        <Card title="Libros" value={libros.data.length} loading={libros.loading}/>
        <Card title="Alumnos" value={alumnos.data.length} loading={alumnos.loading}/>
        <Card title="Préstamos" value={prestamos.data.length} loading={prestamos.loading}/>
      </div>

      <h2 style={{marginTop:24}}>Libros</h2>
      {libros.loading ? <p>Cargando...</p> :
        <table style={styles.table}>
          <thead>
            <tr><th>Título</th><th>Autor</th><th>Disponibles</th></tr>
          </thead>
          <tbody>
            {libros.data.map(l=>(
              <tr key={l.id}><td>{l.titulo}</td><td>{l.autor}</td><td>{l.disponibles}</td></tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

function Card({ title, value, loading }) {
  return (
    <div style={styles.card}>
      <div style={{opacity:.8}}>{title}</div>
      <div style={{fontSize:28, fontWeight:800}}>{loading ? '...' : value}</div>
    </div>
  );
}

const styles = {
  grid:{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16, marginTop:12},
  card:{background:'#111827', padding:16, borderRadius:12, border:'1px solid #1f2937'},
  table:{width:'100%', borderCollapse:'collapse', marginTop:8},
};
