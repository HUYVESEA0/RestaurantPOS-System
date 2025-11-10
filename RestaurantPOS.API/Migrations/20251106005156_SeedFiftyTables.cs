using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RestaurantPOS.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedFiftyTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 3,
                column: "Capacity",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 4,
                column: "Capacity",
                value: 4);

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "Id", "Capacity", "Floor", "IsAvailable", "TableNumber" },
                values: new object[,]
                {
                    { 5, 4, "Tầng 1", true, "B05" },
                    { 6, 4, "Tầng 1", true, "B06" },
                    { 7, 4, "Tầng 1", true, "B07" },
                    { 8, 4, "Tầng 1", true, "B08" },
                    { 9, 4, "Tầng 1", true, "B09" },
                    { 10, 4, "Tầng 1", true, "B10" },
                    { 11, 4, "Tầng 1", true, "B11" },
                    { 12, 4, "Tầng 1", true, "B12" },
                    { 13, 4, "Tầng 1", true, "B13" },
                    { 14, 4, "Tầng 1", true, "B14" },
                    { 15, 4, "Tầng 1", true, "B15" },
                    { 16, 4, "Tầng 1", true, "B16" },
                    { 17, 4, "Tầng 1", true, "B17" },
                    { 18, 4, "Tầng 1", true, "B18" },
                    { 19, 4, "Tầng 1", true, "B19" },
                    { 20, 4, "Tầng 1", true, "B20" },
                    { 21, 6, "Tầng 1", true, "B21" },
                    { 22, 6, "Tầng 1", true, "B22" },
                    { 23, 6, "Tầng 1", true, "B23" },
                    { 24, 6, "Tầng 1", true, "B24" },
                    { 25, 6, "Tầng 1", true, "B25" },
                    { 26, 2, "Tầng 1", true, "B26" },
                    { 27, 2, "Tầng 1", true, "B27" },
                    { 28, 2, "Tầng 1", true, "B28" },
                    { 29, 2, "Tầng 1", true, "B29" },
                    { 30, 2, "Tầng 1", true, "B30" },
                    { 31, 4, "Tầng 2", true, "B31" },
                    { 32, 4, "Tầng 2", true, "B32" },
                    { 33, 4, "Tầng 2", true, "B33" },
                    { 34, 4, "Tầng 2", true, "B34" },
                    { 35, 4, "Tầng 2", true, "B35" },
                    { 36, 4, "Tầng 2", true, "B36" },
                    { 37, 4, "Tầng 2", true, "B37" },
                    { 38, 4, "Tầng 2", true, "B38" },
                    { 39, 4, "Tầng 2", true, "B39" },
                    { 40, 4, "Tầng 2", true, "B40" },
                    { 41, 4, "Tầng 2", true, "B41" },
                    { 42, 4, "Tầng 2", true, "B42" },
                    { 43, 4, "Tầng 2", true, "B43" },
                    { 44, 4, "Tầng 2", true, "B44" },
                    { 45, 4, "Tầng 2", true, "B45" },
                    { 46, 6, "Tầng 2", true, "B46" },
                    { 47, 6, "Tầng 2", true, "B47" },
                    { 48, 6, "Tầng 2", true, "B48" },
                    { 49, 6, "Tầng 2", true, "B49" },
                    { 50, 6, "Tầng 2", true, "B50" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 6, 0, 51, 55, 915, DateTimeKind.Utc).AddTicks(5289), "$2a$11$rUpjvNQWA5SP2Nn8Awqe4eqaaEroysnK9PE7fVVKHjmkEZ/1iigtu" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 3,
                column: "Capacity",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 4,
                column: "Capacity",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 6, 0, 18, 54, 647, DateTimeKind.Utc).AddTicks(2529), "$2a$11$K7vOvbmfn3w3DpaWV4j05Of5Rl8SWrUB2y439Uwskd1WUkJnuQjj2" });
        }
    }
}
