using Day1.Models;

namespace Day1.Repositories;

public interface IUnitOfWork
{
    IGenericRepository<Student> Students { get; }
    IGenericRepository<Department> Departments { get; }
    Task<int> SaveChangesAsync();
}
