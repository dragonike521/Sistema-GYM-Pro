-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Tabla de Miembros
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  membershipType TEXT,
  status TEXT,
  startDate DATE,
  endDate DATE
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memberId INTEGER,
  amount REAL,
  paymentDate DATE,
  FOREIGN KEY (memberId) REFERENCES members(id)
);

-- Tabla de Grupos
CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  responsible TEXT,
  membersCount INTEGER
);

-- Tabla de Visitantes
CREATE TABLE IF NOT EXISTS visitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  visitDate DATE
);

-- Tabla de Promociones
CREATE TABLE IF NOT EXISTS promotions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  discount REAL,
  validUntil DATE
);

-- Tabla de Configuración
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  currency TEXT DEFAULT 'USD',
  dateFormat TEXT DEFAULT 'DD/MM/YYYY',
  membershipDuration INTEGER DEFAULT 1
);