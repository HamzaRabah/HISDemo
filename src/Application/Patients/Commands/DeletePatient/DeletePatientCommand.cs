using HISDemo.Application.Common.Interfaces;

namespace HISDemo.Application.Patients.Commands.DeletePatient;

public record DeletePatientCommand(Guid Id) : IRequest;

public class DeletePatientCommandHandler(IApplicationDbContext context) : IRequestHandler<DeletePatientCommand>
{
    public async Task Handle(DeletePatientCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.Patients
            .FindAsync([request.Id], cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        context.Patients.Remove(entity);

        await context.SaveChangesAsync(cancellationToken);
    }
}
