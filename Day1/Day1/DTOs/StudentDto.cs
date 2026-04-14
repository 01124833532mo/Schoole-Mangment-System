namespace Day1.DTOs;

public class StudentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int? Age { get; set; }
    public string? Address { get; set; }
    public int? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public string SupervisorName { get; set; } = "Not Assigned";
}
