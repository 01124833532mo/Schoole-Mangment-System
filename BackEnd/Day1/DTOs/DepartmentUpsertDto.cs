using System.ComponentModel.DataAnnotations;

namespace Day1.DTOs;

public class DepartmentUpsertDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    [StringLength(150)]
    public string? Location { get; set; }
}
