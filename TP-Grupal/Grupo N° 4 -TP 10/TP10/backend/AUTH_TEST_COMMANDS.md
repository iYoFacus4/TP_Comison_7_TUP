# 🧪 Comandos de Prueba - Autenticación JWT

## PowerShell - Pruebas con Invoke-WebRequest

### 1. Verificar que el servidor está funcionando

```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/ping" -Method GET
```

### 2. Registrar un nuevo usuario

```powershell
$registerBody = @{
    username = "test_barbero"
    email = "test@barberia.com"
    password = "password123"
    nombre = "Barbero Test"
    rol = "barbero"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
```

### 3. Login con usuario de prueba

```powershell
$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$response.Content | ConvertFrom-Json
```

### 4. Guardar el token del login

```powershell
$loginResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = ($loginResponse.Content | ConvertFrom-Json).data.token
Write-Host "Token: $token"
```

### 5. Obtener perfil con token

```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-WebRequest -Uri "http://localhost:3001/api/auth/me" -Method GET -Headers $headers
```

### 6. Probar ruta protegida SIN token (debe fallar con 401)

```powershell
$clientBody = @{
    name = "Cliente Sin Auth"
    email = "sinauth@test.com"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/clients" -Method POST -Body $clientBody -ContentType "application/json"
```

### 7. Probar ruta protegida CON token (debe funcionar)

```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$clientBody = @{
    name = "Cliente Autenticado"
    email = "autenticado@test.com"
    phone = "3515123456"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/clients" -Method POST -Body $clientBody -Headers $headers
```

### 8. Probar token inválido (debe fallar con 403)

```powershell
$headersInvalid = @{
    "Authorization" = "Bearer token_falso_invalido"
}

Invoke-WebRequest -Uri "http://localhost:3001/api/auth/me" -Method GET -Headers $headersInvalid
```

---

## CURL - Pruebas alternativas

### 1. Register

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"test\",\"email\":\"test@mail.com\",\"password\":\"123456\",\"nombre\":\"Test User\"}"
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

### 3. Get Profile (reemplazar TOKEN con el token real)

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### 4. Create Client WITH token

```bash
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d "{\"name\":\"Cliente Nuevo\",\"email\":\"nuevo@mail.com\",\"phone\":\"123456\"}"
```

### 5. Create Client WITHOUT token (debe fallar)

```bash
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Cliente Sin Auth\",\"email\":\"sinauth@mail.com\"}"
```

---

## 📝 Notas

- Reemplazar `TOKEN` con el token JWT real obtenido del login
- El token expira en 24 horas por defecto
- Para PowerShell, guardar el token en una variable `$token` como se muestra arriba
- Las pruebas asumen que el servidor está corriendo en `http://localhost:3001`
- Asegurarse de tener la base de datos MySQL configurada y el schema ejecutado

## ✅ Resultados Esperados

| Prueba        | Método | Ruta               | Token    | Status Esperado  |
| ------------- | ------ | ------------------ | -------- | ---------------- |
| Register      | POST   | /api/auth/register | No       | 201 Created      |
| Login         | POST   | /api/auth/login    | No       | 200 OK           |
| Get Profile   | GET    | /api/auth/me       | Sí       | 200 OK           |
| Get Profile   | GET    | /api/auth/me       | No       | 401 Unauthorized |
| Get Profile   | GET    | /api/auth/me       | Inválido | 403 Forbidden    |
| Create Client | POST   | /api/clients       | Sí       | 201 Created      |
| Create Client | POST   | /api/clients       | No       | 401 Unauthorized |
| Update Client | PUT    | /api/clients/:id   | Sí       | 200 OK           |
| Update Client | PUT    | /api/clients/:id   | No       | 401 Unauthorized |
| Delete Client | DELETE | /api/clients/:id   | Sí       | 200 OK           |
| Delete Client | DELETE | /api/clients/:id   | No       | 401 Unauthorized |
