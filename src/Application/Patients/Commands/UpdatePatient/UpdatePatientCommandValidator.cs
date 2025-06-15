using HISDemo.Application.Common.Interfaces;

namespace HISDemo.Application.Patients.Commands.UpdatePatient;

public class UpdatePatientCommandValidator : AbstractValidator<UpdatePatientCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdatePatientCommandValidator(IApplicationDbContext context)
    {
        _context = context;
        
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id is required.");

        RuleFor(v => v.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

        RuleFor(v => v.FileNo)
            .GreaterThan(0).WithMessage("FileNo must be greater than 0.")
            .MustAsync(BeUniqueFileNo)
            .WithMessage("'{PropertyName}' must be unique.");

        RuleFor(v => v.CitizenId)
            .NotEmpty().WithMessage("CitizenId is required.")
            .MaximumLength(50).WithMessage("CitizenId must not exceed 50 characters.");

        RuleFor(v => v.Birthdate)
            .NotEmpty().WithMessage("Birthdate is required.")
            .LessThan(DateTime.Today).WithMessage("Birthdate must be in the past.");

        RuleFor(v => v.Gender)
            .InclusiveBetween(0, 1).WithMessage("Gender must be 0 (Male) or 1 (Female).");

        RuleFor(v => v.PhoneNumber)
            .MaximumLength(20).WithMessage("PhoneNumber must not exceed 20 characters.");

        RuleFor(v => v.Email)
            .MaximumLength(100).WithMessage("Email must not exceed 100 characters.")
            .EmailAddress().When(v => !string.IsNullOrEmpty(v.Email))
            .WithMessage("Email must be a valid email address.");

        RuleFor(v => v.Country)
            .MaximumLength(100).WithMessage("Country must not exceed 100 characters.");

        RuleFor(v => v.City)
            .MaximumLength(100).WithMessage("City must not exceed 100 characters.");

        RuleFor(v => v.FirstVisitDate)
            .NotEmpty().WithMessage("FirstVisitDate is required.");
    }
    
    public async Task<bool> BeUniqueFileNo(UpdatePatientCommand model, int fileNo, CancellationToken cancellationToken)
    {
        return await _context.Patients
            .AllAsync(l => l.Id == model.Id || l.FileNo != fileNo, cancellationToken);
    }
}
