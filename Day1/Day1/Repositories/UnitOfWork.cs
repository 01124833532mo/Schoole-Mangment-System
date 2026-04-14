using Day1.Models;

namespace Day1.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ITIContext _context;
    private IGenericRepository<Student>? _students;
    private IGenericRepository<Department>? _departments;

    public UnitOfWork(ITIContext context)
    {
        _context = context;
    }

    public IGenericRepository<Student> Students => _students ??= new GenericRepository<Student>(_context);
    public IGenericRepository<Department> Departments => _departments ??= new GenericRepository<Department>(_context);

    public Task<int> SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}
