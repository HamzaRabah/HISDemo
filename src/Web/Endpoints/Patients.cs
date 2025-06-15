using HISDemo.Application.Common.Models;
using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Application.Patients.Commands.DeletePatient;
using HISDemo.Application.Patients.Commands.UpdatePatient;
using HISDemo.Application.Patients.Queries.GetPatient;
using HISDemo.Application.Patients.Queries.GetPatientsWithPagination;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HISDemo.Web.Endpoints;

public class Patients : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreatePatient)
            .MapPut(UpdatePatient, "{id}")
            .MapDelete(DeletePatient, "{id}")
            .MapGet(GetPatient, "{id}")
            .MapGet(GetPatients);
    }

    public async Task<Created<Guid>> CreatePatient(ISender sender, CreatePatientCommand command)
    {
        var patientId = await sender.Send(command);
        return TypedResults.Created($"/{nameof(Patients)}/{patientId}", patientId);
    }
    public async Task<NoContent> UpdatePatient(ISender sender, Guid id, UpdatePatientCommand command)
    {
        if (id != command.Id)
        {
            throw new BadHttpRequestException("Route ID does not match command ID");
        }
    
        await sender.Send(command);
        return TypedResults.NoContent();
    }
    public async Task<NoContent> DeletePatient(ISender sender, Guid id)
    {
        await sender.Send(new DeletePatientCommand(id));
        return TypedResults.NoContent();
    }

    public async Task<Ok<PatientDto>> GetPatient(ISender sender, Guid id)
    {
        var result = await sender.Send(new GetPatientQuery(id));
        return TypedResults.Ok(result);
    }
    public async Task<Ok<PaginatedList<PatientDto>>> GetPatients(ISender sender, [AsParameters] GetPatientsWithPaginationQuery query)
    {
        var result = await sender.Send(query);
        return TypedResults.Ok(result);
    }
}
