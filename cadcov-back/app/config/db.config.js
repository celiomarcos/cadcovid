module.exports = {
    HOST: process.env.DB_HOST || 'localhost', // em wsl verificar em /etc/resolv.conf
    USER: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "ccpass",
    DB: process.env.DB_DATABASE || "paciente_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
