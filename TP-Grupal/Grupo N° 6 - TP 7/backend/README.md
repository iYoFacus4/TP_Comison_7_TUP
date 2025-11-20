# 🧠 Guía Rápida MySQL — Backend TP7 (Grupo N°6)

Este archivo explica cómo crear, conectar y ejecutar comandos MySQL desde la terminal, sin usar Workbench ni plugins.

---

## ⚙️ 1. Iniciar MySQL en la terminal

Abrir MySQL con tu usuario (por ejemplo, `gym_user`):

```bash
mysql -u gym_user -p
```
## 2 Seleccionamos la base de datos.
```bash
USE gym_db;
```

### 3 Ejecturamos comandos SQL desde la terminal.
```bash
SHOW TABLES;
SELECT * FROM usuarios;
DESCRIBE reservas;
```
lUEGO PARA CERRAR LA TERMINAL
ejecutamos
```bash
EXIT;
```

> Muy importante tuve un problema y es que la terminal toma $ como un caracter para ejecutar en la terminal y no como parte del hash de bcryptjs entonces directamente le solicitamos  la terminal que nos confirme el len: 60 (son 60 caracteres incluyendo el $ que trae)
```bash
npm run seed:admin
```
