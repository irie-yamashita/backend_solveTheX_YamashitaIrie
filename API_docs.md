# DOCS TODO-API



**URL base:** `http://localhost:3000`

---

## CATEGORIES
- [TO DO's](#todos-endpoints)
- [Usuaris](#usuaris-endpoints)




## TODOs ENDPOINTS

### <strong style='background-color:green; padding: 0px 10px; border-radius: 3px'>GET</strong> tots els TODOs
```
/todos
```

**Exemple:**
```json
[
  {
    "id": 1,
    "titol": "Títol TODO 1",
    "descripcio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "completat": 0,
    "prioritat": "mitjana"
  },
  {
    "id": 2,
    "titol": "Títol TODO 2",
    "descripcio": "In sed lorem mollis, ornare erat sit amet, dignissim sapien.",
    "completat": 1,
    "prioritat": "alta"
  }
]
```

---

### <strong style='background-color:green; padding: 0px 10px; border-radius: 3px'>GET</strong> TODO per ID
```
/todos/{id}
```

**Exemple:**
```
/todos/2
```

```json
{
  "id": 2,
  "titol": "Títol TODO 2",
  "descripcio": " In sed lorem mollis, ornare erat sit amet, dignissim sapien.",
  "completat": 1,
  "prioritat": "alta"
}
```

---

### <strong style='background-color:green; padding: 0px 10px; border-radius: 3px'>GET</strong> TODOs per prioritat
```
/todos/prioritat/{prioritat}
```

**Exemple:**
```
/todos/prioritat/alta
```
```json
[
  {
    "id": 3,
    "titol": "Títol TODO 1",
    "descripcio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "completat": 0,
    "prioritat": "alta"
  },
  {
    "id": 5,
    "titol": "Títol TODO 2",
    "descripcio": "In sed lorem mollis, ornare erat sit amet, dignissim sapien.",
    "completat": 1,
    "prioritat": "alta"
  }
]
```


---

### <strong style='background-color:blue; padding: 0px 10px; border-radius: 3px'>POST</strong> Crear nou TODO
```
/todos
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**Body:**
```json
{
  "titol": "Nou TODO",
  "descripcio": "Lorem ipsum dolor sit amet adipiscing elit.",
  "completat": 1,
  "prioritat": "alta"
}
```

**Resposta:**
```json
{
  "message": "TODO creat correctament",
  "id": 9
}
```


---

### <strong style='background-color:orange; padding: 0px 10px; border-radius: 3px'>PUT</strong> Actualitzar un TODO
```
/todos/{id}
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**Body:**
```json
{
  "titol": "TODO actualitzat",
  "descripcio": "Modificació amb PUT",
  "completat": 1,
  "prioritat": "mitjana"
}
```

**Resposta:**
```json
{
  "message": "TODO actualitzat correctament",
  "id": 9
}
```


---

### <strong style='background-color:red; padding: 0px 10px; border-radius: 3px'>DELETE</strong> Eliminar un TODO
```
/todos/{id}
```

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "message": "TODO eliminat correctament",
  "id": 9
}
```

---

## USUARIS ENDPOINTS

### <strong style='background-color:green; padding: 0px 10px; border-radius: 3px'>GET</strong> Tots els usuaris
```
/usuaris
```

**Exemple:**
```
[
  {
    "id": 1,
    "username": "user1"
  },
  {
    "id": 2,
    "username": "user2"
  },
  {
    "id": 3,
    "username": "user3"
  }
]
```

---

### <strong style='background-color:blue; padding: 0px 10px; border-radius: 3px'>POST</strong> Registrar nou usuari
```
/usuaris
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "nouUsuari",
  "password": "contrasenya"
}
```

**Resposta:**
```json
{
  "message": "Usuari registrat correctament"
}
```


---

### <strong style='background-color:blue; padding: 0px 10px; border-radius: 3px'>POST</strong> Login d’usuari
```
/usuaris/login
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "usuari",
  "password": "contrasenya"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOjfdkasdfoah76934nkjsdfsd",
  "user": {
    "id": 3,
    "username": "userX"
  }
}
```
