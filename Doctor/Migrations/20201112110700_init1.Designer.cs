﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Doctor.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Doctor.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20201112110700_init1")]
    partial class init1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Doctor.Models.Client", b =>
                {
                    b.Property<int>("ClientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.HasKey("ClientId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Doctor.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AboutMe")
                        .HasColumnType("text");

                    b.Property<List<string>>("Education")
                        .HasColumnType("text[]");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<int>("Experience")
                        .HasColumnType("integer");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<string>("ImgUrl")
                        .HasColumnType("text");

                    b.Property<List<string>>("PerformedProcedures")
                        .HasColumnType("text[]");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<List<string>>("TreatmentOfDiseases")
                        .HasColumnType("text[]");

                    b.Property<List<string>>("WorkExperience")
                        .HasColumnType("text[]");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Doctor.Models.EmployeeSpecialties", b =>
                {
                    b.Property<int>("EmployeeSpecialtiesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("EmployeeSpecialtiesId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeSpecialties");
                });

            modelBuilder.Entity("Doctor.Models.Reception", b =>
                {
                    b.Property<int>("ReceptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("ClientId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateOfReceipt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Registered")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("SpecialtyId")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.HasKey("ReceptionId");

                    b.HasIndex("ClientId");

                    b.ToTable("Receptions");
                });

            modelBuilder.Entity("Doctor.Models.Specialty", b =>
                {
                    b.Property<int>("SpecialtyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Price")
                        .HasColumnType("integer");

                    b.Property<int>("Priority")
                        .HasColumnType("integer");

                    b.HasKey("SpecialtyId");

                    b.ToTable("Specialties");
                });

            modelBuilder.Entity("Doctor.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Pass")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Doctor.Models.UserAdmin", b =>
                {
                    b.Property<int>("UserAdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Pass")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserAdminId");

                    b.ToTable("UserAdmin");
                });

            modelBuilder.Entity("Doctor.Models.EmployeeSpecialties", b =>
                {
                    b.HasOne("Doctor.Models.Employee", null)
                        .WithMany("EmployeeSpecialties")
                        .HasForeignKey("EmployeeId");
                });

            modelBuilder.Entity("Doctor.Models.Reception", b =>
                {
                    b.HasOne("Doctor.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");
                });
#pragma warning restore 612, 618
        }
    }
}