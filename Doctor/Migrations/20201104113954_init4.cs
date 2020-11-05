using Microsoft.EntityFrameworkCore.Migrations;

namespace Doctor.Migrations
{
    public partial class init4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receptions_Employees_EmployeeId",
                table: "Receptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Receptions_Specialties_SpecialtyId",
                table: "Receptions");

            migrationBuilder.DropIndex(
                name: "IX_Receptions_EmployeeId",
                table: "Receptions");

            migrationBuilder.DropIndex(
                name: "IX_Receptions_SpecialtyId",
                table: "Receptions");

            migrationBuilder.AlterColumn<int>(
                name: "SpecialtyId",
                table: "Receptions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Receptions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SpecialtyId",
                table: "Receptions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Receptions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_EmployeeId",
                table: "Receptions",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_SpecialtyId",
                table: "Receptions",
                column: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receptions_Employees_EmployeeId",
                table: "Receptions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Receptions_Specialties_SpecialtyId",
                table: "Receptions",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
