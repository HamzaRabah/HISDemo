using HISDemo.Application.Common.Interfaces;
using HISDemo.Application.Common.Mappings;
using HISDemo.Application.Common.Models;

namespace HISDemo.Application.Patients.Queries.GetPatientsWithPagination;

public record GetPatientsWithPaginationQuery : IRequest<PaginatedList<PatientDto>>
{
    public string? Name { get; init; }
    public int? FileNo { get; init; }
    public string? PhoneNumber { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetPatientsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetPatientsWithPaginationQuery, PaginatedList<PatientDto>>
{
    public async Task<PaginatedList<PatientDto>> Handle(GetPatientsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = context.Patients.AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(request.Name))
        {
            query = query.Where(p => p.Name.Contains(request.Name));
        }

        if (request.FileNo.HasValue)
        {
            query = query.Where(p => p.FileNo == request.FileNo.Value);
        }

        if (!string.IsNullOrEmpty(request.PhoneNumber))
        {
            query = query.Where(p => p.PhoneNumber.Contains(request.PhoneNumber));
        }

        return await query
            .OrderBy(p => p.Name)
            .ProjectTo<PatientDto>(mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize, cancellationToken);
    }
}
