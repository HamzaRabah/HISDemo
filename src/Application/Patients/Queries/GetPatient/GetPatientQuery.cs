using HISDemo.Application.Common.Interfaces;
using HISDemo.Application.Patients.Queries.GetPatientsWithPagination;

namespace HISDemo.Application.Patients.Queries.GetPatient;

public record GetPatientQuery(Guid Id) : IRequest<PatientDto>;

public class GetPatientQueryHandler(IApplicationDbContext context, IMapper mapper) 
    : IRequestHandler<GetPatientQuery, PatientDto>
{
    public async Task<PatientDto> Handle(GetPatientQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Patients
            .FindAsync([request.Id], cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        return mapper.Map<PatientDto>(entity);
    }
}
