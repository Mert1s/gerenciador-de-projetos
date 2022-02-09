import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString, MinLength } from "class-validator";
import { Colaborador } from "src/entities/colaborador.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Projeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    @ApiProperty() // Informação para API
    @IsString()
    @MinLength(8)
    nome: string;

    @Column({ nullable: true, default: "" })
    @ApiProperty() // Informação para API
    @IsOptional()
    @IsString()
    descricao: string

    @Column({ nullable: false })
    @ApiProperty() // Informação para API    
    @IsDateString()
    inicio: Date

    @Column({ nullable: true })
    @ApiProperty() // Informação para API
    @IsOptional()
    @IsDateString()
    fim: Date;

    @Column({ nullable: true, default: true })
    @ApiProperty() // Informação para API  
    @IsOptional()
    @IsBoolean()
    ativo: Boolean

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @ManyToMany(type => Colaborador, { eager: true, cascade: true })
    @JoinTable()
    colaboradores: Colaborador[];

    @BeforeInsert()
    insertToUpperCase() {
        this.nome = this.nome.toUpperCase().trim()
    }

    @BeforeUpdate()
    updateToUpperCase() {
        this.nome = this.nome.toUpperCase().trim()
    }
}