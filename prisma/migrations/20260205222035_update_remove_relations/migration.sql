-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leitura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "umidade" REAL NOT NULL,
    "temperatura" REAL NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "sensorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Leitura" ("createdAt", "dataHora", "id", "sensorId", "temperatura", "umidade") SELECT "createdAt", "dataHora", "id", "sensorId", "temperatura", "umidade" FROM "Leitura";
DROP TABLE "Leitura";
ALTER TABLE "new_Leitura" RENAME TO "Leitura";
CREATE TABLE "new_Sensor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serialNumber" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ipFixo" TEXT,
    "dataInstalacao" DATETIME NOT NULL,
    "dataManutencao" DATETIME,
    "cicloLeitura" INTEGER NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "finalidade" TEXT,
    "areaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sensor" ("areaId", "cicloLeitura", "createdAt", "dataInstalacao", "dataManutencao", "fabricante", "finalidade", "id", "ipFixo", "latitude", "longitude", "modelo", "serialNumber", "status", "tipo", "updatedAt") SELECT "areaId", "cicloLeitura", "createdAt", "dataInstalacao", "dataManutencao", "fabricante", "finalidade", "id", "ipFixo", "latitude", "longitude", "modelo", "serialNumber", "status", "tipo", "updatedAt" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
CREATE UNIQUE INDEX "Sensor_serialNumber_key" ON "Sensor"("serialNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
