using System.Reflection;
using AutoMapper;
using HISDemo.Application.Common.Interfaces;
using HISDemo.Application.Common.Models;
using HISDemo.Application.Patients.Queries.GetPatientsWithPagination;
using HISDemo.Domain.Entities;
using NUnit.Framework;

namespace HISDemo.Application.UnitTests.Common.Mappings;

public class MappingTests
{
    private readonly IConfigurationProvider _configuration;
    private readonly IMapper _mapper;

    public MappingTests()
    {
        _configuration = new MapperConfiguration(config => 
            config.AddMaps(Assembly.GetAssembly(typeof(IApplicationDbContext))));

        _mapper = _configuration.CreateMapper();
    }

    [Test]
    public void ShouldHaveValidConfiguration()
    {
        _configuration.AssertConfigurationIsValid();
    }

    [Test]
    [TestCase(typeof(Patient), typeof(PatientDto))]
    public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
    {
        var instance = GetInstanceOf(source);

        _mapper.Map(instance, source, destination);
    }

    private object GetInstanceOf(Type type)
    {
        if (type.GetConstructor(Type.EmptyTypes) != null)
            return Activator.CreateInstance(type)!;

        // Handle Patient entity with required properties
        if (type == typeof(Patient))
        {
            return new Patient
            {
                Id = Guid.NewGuid(),
                Name = "Test Patient",
                FileNo = 12345,
                CitizenId = "123456789",
                Birthdate = DateTime.UtcNow.AddYears(-30),
                Gender = 0,
                Nationality = "Test",
                PhoneNumber = "123-456-7890",
                Email = "test@example.com",
                Country = "Test Country",
                City = "Test City",
                Street = "Test Street",
                Address1 = "Test Address 1",
                Address2 = "Test Address 2",
                ContactPerson = "Test Contact",
                ContactRelation = "Test Relation",
                ContactPhone = "123-456-7890",
                FirstVisitDate = DateTime.UtcNow,
                RecordCreationDate = DateTime.UtcNow
            };
        }

        // Handle LookupDto and other simple types
        if (type == typeof(LookupDto))
        {
            return new LookupDto { Id = 1, Title = "Test" };
        }

        // For other types, try to create with Activator.CreateInstance
        try
        {
            return Activator.CreateInstance(type, true)!;
        }
        catch
        {
            // If all else fails, throw a helpful exception
            throw new InvalidOperationException($"Unable to create instance of type {type.Name}. Consider adding explicit handling for this type in GetInstanceOf method.");
        }
    }
}
