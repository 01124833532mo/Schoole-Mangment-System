namespace Day1.Repositories;

public interface IGenericRepository<TEntity> where TEntity : class
{
    IQueryable<TEntity> GetQueryable();
    Task<TEntity?> GetByIdAsync(params object[] keyValues);
    Task AddAsync(TEntity entity);
    void Update(TEntity entity);
    void Delete(TEntity entity);
}
