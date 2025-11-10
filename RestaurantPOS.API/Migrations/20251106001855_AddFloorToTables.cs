using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantPOS.API.Migrations
{
    /// <inheritdoc />
    public partial class AddFloorToTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "Tables",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 1,
                column: "Floor",
                value: "Tầng 1");

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 2,
                column: "Floor",
                value: "Tầng 1");

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 3,
                column: "Floor",
                value: "Tầng 1");

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 4,
                column: "Floor",
                value: "Tầng 1");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 6, 0, 18, 54, 647, DateTimeKind.Utc).AddTicks(2529), "$2a$11$K7vOvbmfn3w3DpaWV4j05Of5Rl8SWrUB2y439Uwskd1WUkJnuQjj2" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "Tables");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 4, 9, 19, 18, 465, DateTimeKind.Utc).AddTicks(6403), "$2a$11$M0o/vkEmBmOAtMyhwM5HNOJrqNXb4tHfrI5nBxayrgl3ECpVcBMuS" });
        }
    }
}
