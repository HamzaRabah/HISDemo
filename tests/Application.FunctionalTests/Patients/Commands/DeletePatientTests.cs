using HISDemo.Application.Common.Exceptions;
using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Application.Patients.Commands.DeletePatient;
using HISDemo.Domain.Entities;

namespace HISDemo.Application.FunctionalTests.Patients.Commands;

using static Testing;

public class DeletePatientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidPatientId()
    {
        var command = new DeletePatientCommand(Guid.NewGuid());
        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeletePatient()
    {
        var patientId = await SendAsync(new CreatePatientCommand
        {
            Name = "Patient To Delete",
            FileNo = 88888,
            CitizenId = "999888777",
            Birthdate = new DateTime(1980, 12, 25, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "German",
            PhoneNumber = "333-444-5555",
            Email = "delete@example.com",
            Country = "Germany",
            City = "Berlin",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new DeletePatientCommand(patientId));

        var patient = await FindAsync<Patient>(patientId);

        patient.Should().BeNull();
    }

    [Test]
    public async Task ShouldHandleDeleteOfNonExistentPatient()
    {
        var nonExistentId = Guid.NewGuid();
        var command = new DeletePatientCommand(nonExistentId);

        await FluentActions.Invoking(() => SendAsync(command))
            .Should().ThrowAsync<NotFoundException>();
    }
}
