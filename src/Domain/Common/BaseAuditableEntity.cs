namespace HISDemo.Domain.Common;

public abstract class BaseAuditableEntity<TId> : BaseEntity<TId> where TId : IEquatable<TId>
{
    public DateTimeOffset Created { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset LastModified { get; set; }

    public string? LastModifiedBy { get; set; }
}

public abstract class BaseAuditableEntity : BaseAuditableEntity<int>
{
}
