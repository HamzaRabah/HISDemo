using HISDemo.Application.Common.Exceptions;
using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Application.Patients.Commands.UpdatePatient;
using HISDemo.Domain.Entities;

namespace HISDemo.Application.FunctionalTests.Patients.Commands;

using static Testing;

public class UpdatePatientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidPatientId()
    {
        var command = new UpdatePatientCommand 
        { 
            Id = Guid.NewGuid(),
            Name = "Test",
            FileNo = 12345,
            CitizenId = "123456789",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "Test",
            FirstVisitDate = DateTime.UtcNow
        };
        
        await FluentActions.Invoking(() => SendAsync(command))
            .Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldUpdatePatient()
    {
        var patientId = await SendAsync(new CreatePatientCommand
        {
            Name = "Original Name",
            FileNo = 99100,
            CitizenId = "111111111",
            Birthdate = new DateTime(1985, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "Original",
            PhoneNumber = "111-111-1111",
            Email = "original@example.com",
            Country = "Original Country",
            City = "Original City",
            FirstVisitDate = DateTime.UtcNow
        });

        var updateCommand = new UpdatePatientCommand
        {
            Id = patientId,
            Name = "Updated Name",
            FileNo = 99100, // Same FileNo
            CitizenId = "111111111", // Same CitizenId
            Birthdate = new DateTime(1990, 5, 15, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Updated",
            PhoneNumber = "222-222-2222",
            Email = "updated@example.com",
            Country = "Updated Country",
            City = "Updated City",
            Street = "Updated Street",
            Address1 = "Updated Address1",
            ContactPerson = "Updated Contact",
            ContactRelation = "Updated Relation",
            ContactPhone = "333-333-3333",
            FirstVisitDate = DateTime.UtcNow.AddDays(-5)
        };

        await SendAsync(updateCommand);

        var patient = await FindAsync<Patient>(patientId);

        patient.Should().NotBeNull();
        patient!.Name.Should().Be("Updated Name");
        patient.Gender.Should().Be(1);
        patient.Nationality.Should().Be("Updated");
        patient.PhoneNumber.Should().Be("222-222-2222");
        patient.Email.Should().Be("updated@example.com");
        patient.Country.Should().Be("Updated Country");
        patient.City.Should().Be("Updated City");
        patient.Street.Should().Be("Updated Street");
        patient.ContactPerson.Should().Be("Updated Contact");
    }

    [Test]
    public async Task ShouldNotAllowDuplicateFileNoOnUpdate()
    {
        // Create first patient
        await SendAsync(new CreatePatientCommand
        {
            Name = "First Patient",
            FileNo = 99200,
            CitizenId = "111111111",
            Birthdate = new DateTime(1985, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "Test",
            FirstVisitDate = DateTime.UtcNow
        });

        // Create second patient
        var secondPatientId = await SendAsync(new CreatePatientCommand
        {
            Name = "Second Patient",
            FileNo = 99201,
            CitizenId = "222222222",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Test",
            FirstVisitDate = DateTime.UtcNow
        });

        // Try to update second patient with first patient's FileNo
        var updateCommand = new UpdatePatientCommand
        {
            Id = secondPatientId,
            Name = "Second Patient Updated",
            FileNo = 99200, // Duplicate FileNo
            CitizenId = "222222222",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Test",
            FirstVisitDate = DateTime.UtcNow
        };

        await FluentActions.Invoking(() => SendAsync(updateCommand))
            .Should().ThrowAsync<ValidationException>();
    }
}
