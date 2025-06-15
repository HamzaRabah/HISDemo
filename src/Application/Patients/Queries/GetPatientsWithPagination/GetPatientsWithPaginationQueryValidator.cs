namespace HISDemo.Application.Patients.Queries.GetPatientsWithPagination;

public class GetPatientsWithPaginationQueryValidator : AbstractValidator<GetPatientsWithPaginationQuery>
{
    public GetPatientsWithPaginationQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.")
            .LessThanOrEqualTo(100).WithMessage("PageSize must not exceed 100.");
    }
}
