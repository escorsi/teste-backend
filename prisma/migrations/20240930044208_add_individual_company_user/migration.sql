-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `confirmEmail` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(15) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `addressId` INTEGER NULL,
    `acceptedTerms` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndividualUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(14) NOT NULL,
    `responsibleCpf` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postalCode` VARCHAR(8) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `complement` VARCHAR(100) NULL,
    `city` VARCHAR(100) NOT NULL,
    `district` VARCHAR(100) NOT NULL,
    `state` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndividualUser` ADD CONSTRAINT `IndividualUser_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyUser` ADD CONSTRAINT `CompanyUser_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
