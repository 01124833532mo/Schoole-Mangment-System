using System.ComponentModel.DataAnnotations;

namespace Day1.DTOs;

public class StudentUpsertDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 120)]
    public int? Age { get; set; }

    public string? Address { get; set; }

    public int? DepartmentId { get; set; }
}
