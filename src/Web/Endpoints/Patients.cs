using HISDemo.Application.Common.Models;
using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Application.Patients.Commands.DeletePatient;
using HISDemo.Application.Patients.Queries.GetPatientsWithPagination;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HISDemo.Web.Endpoints;

public class Patients : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreatePatient)
            .MapDelete(DeletePatient, "{id}")
            .MapGet(GetPatients);
    }

    public async Task<Created<Guid>> CreatePatient(ISender sender, CreatePatientCommand command)
    {
        var patientId = await sender.Send(command);
        return TypedResults.Created($"/{nameof(Patients)}/{patientId}", patientId);
    }

    public async Task<NoContent> DeletePatient(ISender sender, Guid id)
    {
        await sender.Send(new DeletePatientCommand(id));
        return TypedResults.NoContent();
    }

    public async Task<Ok<PaginatedList<PatientDto>>> GetPatients(ISender sender, [AsParameters] GetPatientsWithPaginationQuery query)
    {
        var result = await sender.Send(query);
        return TypedResults.Ok(result);
    }
}
