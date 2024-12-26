-- CreateTable
CREATE TABLE "IssuesForm" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "formData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssuesForm_pkey" PRIMARY KEY ("id")
);
