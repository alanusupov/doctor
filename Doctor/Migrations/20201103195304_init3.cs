using Microsoft.EntityFrameworkCore.Migrations;

namespace Doctor.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Receptions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_ClientId",
                table: "Receptions",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receptions_Clients_ClientId",
                table: "Receptions",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receptions_Clients_ClientId",
                table: "Receptions");

            migrationBuilder.DropIndex(
                name: "IX_Receptions_ClientId",
                table: "Receptions");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Receptions");
        }
    }
}
