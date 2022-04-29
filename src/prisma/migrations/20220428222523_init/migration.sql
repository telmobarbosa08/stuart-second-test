-- CreateTable
CREATE TABLE "Courier" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "max_capacity" INTEGER NOT NULL,

    CONSTRAINT "Courier_pkey" PRIMARY KEY ("id")
);
