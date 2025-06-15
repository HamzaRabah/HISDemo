using HISDemo.Application.Common.Interfaces;

namespace HISDemo.Application.Patients.Commands.UpdatePatient;

public record UpdatePatientCommand : IRequest
{
    public Guid Id { get; init; }
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

public class UpdatePatientCommandHandler(IApplicationDbContext context) : IRequestHandler<UpdatePatientCommand>
{
    public async Task Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.Patients
            .FindAsync([request.Id], cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.Name = request.Name;
        entity.FileNo = request.FileNo;
        entity.CitizenId = request.CitizenId;
        entity.Birthdate = request.Birthdate;
        entity.Gender = request.Gender;
        entity.Nationality = request.Nationality;
        entity.PhoneNumber = request.PhoneNumber;
        entity.Email = request.Email;
        entity.Country = request.Country;
        entity.City = request.City;
        entity.Street = request.Street;
        entity.Address1 = request.Address1;
        entity.Address2 = request.Address2;
        entity.ContactPerson = request.ContactPerson;
        entity.ContactRelation = request.ContactRelation;
        entity.ContactPhone = request.ContactPhone;
        entity.FirstVisitDate = request.FirstVisitDate;

        await context.SaveChangesAsync(cancellationToken);
    }
}
