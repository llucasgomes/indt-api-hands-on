-- CreateTable
CREATE TABLE "Pesquisador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "especialidade" TEXT,
    "email" TEXT NOT NULL,
    "titulacao" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "linhaPesquisa" TEXT,
    "dataNascimento" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisador_email_key" ON "Pesquisador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisador_matricula_key" ON "Pesquisador"("matricula");
