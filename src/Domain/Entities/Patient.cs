namespace HISDemo.Domain.Entities;

public class Patient : BaseAuditableEntity<Guid>
{
    public string Name { get; set; } = string.Empty;
    public int FileNo { get; set; }
    public string CitizenId { get; set; } = string.Empty;
    public DateTime Birthdate { get; set; }
    public int Gender { get; set; } // 0 = Male, 1 = Female
    public string Nationality { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string Address1 { get; set; } = string.Empty;
    public string Address2 { get; set; } = string.Empty;
    public string ContactPerson { get; set; } = string.Empty;
    public string ContactRelation { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public DateTime FirstVisitDate { get; set; }
    public DateTime RecordCreationDate { get; set; }
}
