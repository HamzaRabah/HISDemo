using HISDemo.Domain.Entities;

namespace HISDemo.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }
    
    DbSet<Patient> Patients { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
