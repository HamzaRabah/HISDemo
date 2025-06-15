using HISDemo.Domain.Entities;

namespace HISDemo.Application.Patients.Queries.GetPatientsWithPagination;

public class PatientDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public int FileNo { get; init; }
    public string CitizenId { get; init; } = string.Empty;
    public DateTime Birthdate { get; init; }
    public int Gender { get; init; }
    public string Nationality { get; init; } = string.Empty;
    public string PhoneNumber { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Country { get; init; } = string.Empty;
    public string City { get; init; } = string.Empty;
    public string Street { get; init; } = string.Empty;
    public string Address1 { get; init; } = string.Empty;
    public string Address2 { get; init; } = string.Empty;
    public string ContactPerson { get; init; } = string.Empty;
    public string ContactRelation { get; init; } = string.Empty;
    public string ContactPhone { get; init; } = string.Empty;
    public DateTime FirstVisitDate { get; init; }
    public DateTime RecordCreationDate { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Patient, PatientDto>();
        }
    }
}
