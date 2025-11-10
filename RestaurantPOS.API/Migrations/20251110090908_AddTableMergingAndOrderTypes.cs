using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantPOS.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTableMergingAndOrderTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMerged",
                table: "Tables",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MergedGroupId",
                table: "Tables",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MergedTableNumbers",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderGroupId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderType",
                table: "Orders",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ParentOrderId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 27,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 28,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 29,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 30,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 31,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 32,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 33,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 34,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 35,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 36,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 37,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 38,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 39,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 40,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 41,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 42,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 43,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 44,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 45,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 46,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 47,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 48,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 49,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 50,
                columns: new[] { "IsMerged", "MergedGroupId", "MergedTableNumbers" },
                values: new object[] { false, null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 10, 9, 9, 8, 96, DateTimeKind.Utc).AddTicks(8047), "$2a$11$bsKh8soDKXe5qVMnu7aF7uvMzo7qGdfpGTELoE.oKIDy4xr12JbFq" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMerged",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "MergedGroupId",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "MergedTableNumbers",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "OrderGroupId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderType",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ParentOrderId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 6, 0, 51, 55, 915, DateTimeKind.Utc).AddTicks(5289), "$2a$11$rUpjvNQWA5SP2Nn8Awqe4eqaaEroysnK9PE7fVVKHjmkEZ/1iigtu" });
        }
    }
}
