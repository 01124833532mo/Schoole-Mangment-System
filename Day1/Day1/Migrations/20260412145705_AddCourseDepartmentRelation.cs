using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Day1.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseDepartmentRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Dept_Id",
                table: "course",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_course_Dept_Id",
                table: "course",
                column: "Dept_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_course_Department_Dept_Id",
                table: "course",
                column: "Dept_Id",
                principalTable: "Department",
                principalColumn: "Dept_Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_course_Department_Dept_Id",
                table: "course");

            migrationBuilder.DropIndex(
                name: "IX_course_Dept_Id",
                table: "course");

            migrationBuilder.DropColumn(
                name: "Dept_Id",
                table: "course");
        }
    }
}
