-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "unique_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "Company" TEXT NOT NULL,
    "Hobbie" TEXT NOT NULL,
    "personal_website_link" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "twitter" TEXT,
    "mobile" TEXT,
    "telegram" TEXT,
    "linkedin" TEXT,
    "gmail" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_unique_id_key" ON "cards"("unique_id");
