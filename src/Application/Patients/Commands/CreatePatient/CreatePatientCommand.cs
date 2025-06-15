using HISDemo.Application.Common.Interfaces;
using HISDemo.Domain.Entities;

namespace HISDemo.Application.Patients.Commands.CreatePatient;

public record CreatePatientCommand : IRequest<Guid>
{
    public string Name { get; init; } = string.Empty;
    public int FileNo { get; init; }
    public string CitizenId { get; init; } = string.Empty;
    public DateTime Birthdate { get; init; }
    public int Gender { get; init; } // 0 = Male, 1 = Female
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
}

public class CreatePatientCommandHandler(IApplicationDbContext context) : IRequestHandler<CreatePatientCommand, Guid>
{
    public async Task<Guid> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
    {
        var entity = new Patient
        {
            Name = request.Name,
            FileNo = request.FileNo,
            CitizenId = request.CitizenId,
            Birthdate = request.Birthdate,
            Gender = request.Gender,
            Nationality = request.Nationality,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            Country = request.Country,
            City = request.City,
            Street = request.Street,
            Address1 = request.Address1,
            Address2 = request.Address2,
            ContactPerson = request.ContactPerson,
            ContactRelation = request.ContactRelation,
            ContactPhone = request.ContactPhone,
            FirstVisitDate = request.FirstVisitDate,
            RecordCreationDate = DateTime.UtcNow
        };

        context.Patients.Add(entity);

        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
