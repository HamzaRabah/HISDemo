using HISDemo.Application.Common.Exceptions;
using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Domain.Entities;

namespace HISDemo.Application.FunctionalTests.Patients.Commands;

using static Testing;

public class CreatePatientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreatePatientCommand();
        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldRequireUniqueFileNo()
    {
        await SendAsync(new CreatePatientCommand
        {
            Name = "John Doe",
            FileNo = 99001,
            CitizenId = "123456789",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "American",
            PhoneNumber = "123-456-7890",
            Email = "john@example.com",
            Country = "USA",
            City = "New York",
            FirstVisitDate = DateTime.UtcNow
        });

        var duplicateCommand = new CreatePatientCommand
        {
            Name = "Jane Doe",
            FileNo = 99001, // Same FileNo as above
            CitizenId = "987654321",
            Birthdate = new DateTime(1985, 5, 15, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "American",
            PhoneNumber = "098-765-4321",
            Email = "jane@example.com",
            Country = "USA",
            City = "Los Angeles",
            FirstVisitDate = DateTime.UtcNow
        };

        await FluentActions.Invoking(() =>
            SendAsync(duplicateCommand)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreatePatient()
    {
        var command = new CreatePatientCommand
        {
            Name = "Test Patient",
            FileNo = 99002,
            CitizenId = "555666777",
            Birthdate = new DateTime(1985, 3, 10, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Canadian",
            PhoneNumber = "555-123-4567",
            Email = "test@example.com",
            Country = "Canada",
            City = "Toronto",
            Street = "Main St",
            Address1 = "123 Main St",
            Address2 = "Apt 4B",
            ContactPerson = "Emergency Contact",
            ContactRelation = "Spouse",
            ContactPhone = "555-987-6543",
            FirstVisitDate = DateTime.UtcNow.AddDays(-1)
        };

        var patientId = await SendAsync(command);

        var patient = await FindAsync<Patient>(patientId);

        patient.Should().NotBeNull();
        patient!.Name.Should().Be(command.Name);
        patient.FileNo.Should().Be(command.FileNo);
        patient.CitizenId.Should().Be(command.CitizenId);
        patient.Birthdate.Should().Be(command.Birthdate);
        patient.Gender.Should().Be(command.Gender);
        patient.Nationality.Should().Be(command.Nationality);
        patient.PhoneNumber.Should().Be(command.PhoneNumber);
        patient.Email.Should().Be(command.Email);
        patient.Country.Should().Be(command.Country);
        patient.City.Should().Be(command.City);
        patient.RecordCreationDate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMilliseconds(10000));
    }

    [Test]
    public async Task ShouldValidateEmailFormat()
    {
        var command = new CreatePatientCommand
        {
            Name = "Test Patient",
            FileNo = 99003,
            CitizenId = "111222333",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "American",
            PhoneNumber = "123-456-7890",
            Email = "invalid-email", // Invalid email format
            Country = "USA",
            City = "New York",
            FirstVisitDate = DateTime.UtcNow
        };

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldAcceptEmptyOptionalFields()
    {
        var command = new CreatePatientCommand
        {
            Name = "Minimal Patient",
            FileNo = 99004,
            CitizenId = "444555666",
            Birthdate = new DateTime(1995, 6, 20, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "British",
            PhoneNumber = "444-555-6666",
            FirstVisitDate = DateTime.UtcNow
            // Optional fields left empty
        };

        var patientId = await SendAsync(command);

        var patient = await FindAsync<Patient>(patientId);

        patient.Should().NotBeNull();
        patient!.Name.Should().Be(command.Name);
        patient.Email.Should().BeNullOrEmpty();
        patient.Street.Should().BeNullOrEmpty();
    }
}
