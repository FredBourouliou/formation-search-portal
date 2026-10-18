<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240101000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create formations table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE formations (
            id BINARY(16) NOT NULL,
            titre VARCHAR(255) NOT NULL,
            organisme VARCHAR(255) NOT NULL,
            departement VARCHAR(3) NOT NULL,
            ville VARCHAR(100) NOT NULL,
            modalite VARCHAR(20) NOT NULL,
            latitude DOUBLE PRECISION DEFAULT NULL,
            longitude DOUBLE PRECISION DEFAULT NULL,
            date_debut DATETIME DEFAULT NULL,
            date_fin DATETIME DEFAULT NULL,
            url VARCHAR(500) DEFAULT NULL,
            PRIMARY KEY(id)
        )');
        
        $this->addSql('CREATE INDEX idx_departement ON formations (departement)');
        $this->addSql('CREATE INDEX idx_modalite ON formations (modalite)');
        $this->addSql('CREATE INDEX idx_titre ON formations (titre)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE formations');
    }
}