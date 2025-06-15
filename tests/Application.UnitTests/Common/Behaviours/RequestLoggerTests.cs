using HISDemo.Application.Common.Behaviours;
using HISDemo.Application.Common.Interfaces;
using HISDemo.Application.Patients.Commands.CreatePatient;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace HISDemo.Application.UnitTests.Common.Behaviours;

public class RequestLoggerTests
{
    private Mock<ILogger<CreatePatientCommand>> _logger = null!;
    private Mock<IUser> _user = null!;
    private Mock<IIdentityService> _identityService = null!;

    [SetUp]
    public void Setup()
    {
        _logger = new Mock<ILogger<CreatePatientCommand>>();
        _user = new Mock<IUser>();
        _identityService = new Mock<IIdentityService>();
    }

    [Test]
    public async Task ShouldCallGetUserNameAsyncOnceIfAuthenticated()
    {
        _user.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());

        var requestLogger = new LoggingBehaviour<CreatePatientCommand>(_logger.Object, _user.Object, _identityService.Object);

        await requestLogger.Process(new CreatePatientCommand
        {
            Name = "Test Patient",
            FileNo = 12345,
            CitizenId = "123456789",
            Birthdate = DateTime.UtcNow.AddYears(-30),
            Gender = 0,
            Nationality = "Test",
            PhoneNumber = "123-456-7890",
            FirstVisitDate = DateTime.UtcNow
        }, new CancellationToken());

        _identityService.Verify(i => i.GetUserNameAsync(It.IsAny<string>()), Times.Once);
    }

    [Test]
    public async Task ShouldNotCallGetUserNameAsyncOnceIfUnauthenticated()
    {
        var requestLogger = new LoggingBehaviour<CreatePatientCommand>(_logger.Object, _user.Object, _identityService.Object);

        await requestLogger.Process(new CreatePatientCommand
        {
            Name = "Test Patient",
            FileNo = 12345,
            CitizenId = "123456789",
            Birthdate = DateTime.UtcNow.AddYears(-30),
            Gender = 0,
            Nationality = "Test",
            PhoneNumber = "123-456-7890",
            FirstVisitDate = DateTime.UtcNow
        }, new CancellationToken());

        _identityService.Verify(i => i.GetUserNameAsync(It.IsAny<string>()), Times.Never);
    }
}
