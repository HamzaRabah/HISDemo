using HISDemo.Application.Patients.Commands.CreatePatient;
using HISDemo.Application.Patients.Queries.GetPatientsWithPagination;

namespace HISDemo.Application.FunctionalTests.Patients.Queries;

using static Testing;

public class GetPatientsWithPaginationTests : BaseTestFixture
{
    [Test]
    public async Task ShouldReturnEmptyListWhenNoPatientsExist()
    {
        var query = new GetPatientsWithPaginationQuery
        {
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().BeEmpty();
        result.TotalCount.Should().Be(0);
        result.TotalPages.Should().Be(0);
    }

    [Test]
    public async Task ShouldReturnAllPatientsWhenNoFiltersApplied()
    {
        // Create test patients
        await SendAsync(new CreatePatientCommand
        {
            Name = "Alice Johnson",
            FileNo = 11111,
            CitizenId = "111111111",
            Birthdate = new DateTime(1985, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "American",
            PhoneNumber = "111-111-1111",
            Email = "alice@example.com",
            Country = "USA",
            City = "New York",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new CreatePatientCommand
        {
            Name = "Bob Smith",
            FileNo = 22222,
            CitizenId = "222222222",
            Birthdate = new DateTime(1990, 2, 2, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "Canadian",
            PhoneNumber = "222-222-2222",
            Email = "bob@example.com",
            Country = "Canada",
            City = "Toronto",
            FirstVisitDate = DateTime.UtcNow
        });

        var query = new GetPatientsWithPaginationQuery
        {
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().HaveCount(2);
        result.TotalCount.Should().Be(2);
        result.TotalPages.Should().Be(1);
    }

    [Test]
    public async Task ShouldFilterByName()
    {
        // Create test patients
        await SendAsync(new CreatePatientCommand
        {
            Name = "Charlie Brown",
            FileNo = 33333,
            CitizenId = "333333333",
            Birthdate = new DateTime(1975, 3, 3, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "British",
            PhoneNumber = "333-333-3333",
            Country = "UK",
            City = "London",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new CreatePatientCommand
        {
            Name = "Diana Prince",
            FileNo = 44444,
            CitizenId = "444444444",
            Birthdate = new DateTime(1988, 4, 4, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "American",
            PhoneNumber = "444-444-4444",
            Country = "USA",
            City = "Washington",
            FirstVisitDate = DateTime.UtcNow
        });

        var query = new GetPatientsWithPaginationQuery
        {
            Name = "Charlie",
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().HaveCount(1);
        result.Items.First().Name.Should().Contain("Charlie");
        result.TotalCount.Should().Be(1);
    }

    [Test]
    public async Task ShouldFilterByFileNo()
    {
        // Create test patients
        await SendAsync(new CreatePatientCommand
        {
            Name = "Eve Adams",
            FileNo = 55555,
            CitizenId = "555555555",
            Birthdate = new DateTime(1992, 5, 5, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Australian",
            PhoneNumber = "555-555-5555",
            Country = "Australia",
            City = "Sydney",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new CreatePatientCommand
        {
            Name = "Frank Wilson",
            FileNo = 66666,
            CitizenId = "666666666",
            Birthdate = new DateTime(1983, 6, 6, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "German",
            PhoneNumber = "666-666-6666",
            Country = "Germany",
            City = "Munich",
            FirstVisitDate = DateTime.UtcNow
        });

        var query = new GetPatientsWithPaginationQuery
        {
            FileNo = 55555,
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().HaveCount(1);
        result.Items.First().FileNo.Should().Be(55555);
        result.Items.First().Name.Should().Be("Eve Adams");
    }

    [Test]
    public async Task ShouldFilterByPhoneNumber()
    {
        // Create test patients
        await SendAsync(new CreatePatientCommand
        {
            Name = "Grace Lee",
            FileNo = 77777,
            CitizenId = "777777777",
            Birthdate = new DateTime(1987, 7, 7, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Korean",
            PhoneNumber = "777-777-7777",
            Country = "South Korea",
            City = "Seoul",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new CreatePatientCommand
        {
            Name = "Henry Davis",
            FileNo = 88888,
            CitizenId = "888888888",
            Birthdate = new DateTime(1991, 8, 8, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "French",
            PhoneNumber = "888-888-8888",
            Country = "France",
            City = "Paris",
            FirstVisitDate = DateTime.UtcNow
        });

        var query = new GetPatientsWithPaginationQuery
        {
            PhoneNumber = "777-777-7777",
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().HaveCount(1);
        result.Items.First().PhoneNumber.Should().Be("777-777-7777");
        result.Items.First().Name.Should().Be("Grace Lee");
    }

    [Test]
    public async Task ShouldSupportPagination()
    {
        // Create multiple test patients
        for (int i = 1; i <= 15; i++)
        {
            await SendAsync(new CreatePatientCommand
            {
                Name = $"Patient {i:D2}",
                FileNo = 10000 + i,
                CitizenId = $"{i:D9}",
                Birthdate = new DateTime(1980 + i % 20, (i % 12) + 1, (i % 28) + 1, 0, 0, 0, DateTimeKind.Utc),
                Gender = i % 2,
                Nationality = "Test",
                PhoneNumber = $"{i:D3}-{i:D3}-{i:D4}",
                Country = "TestCountry",
                City = "TestCity",
                FirstVisitDate = DateTime.UtcNow
            });
        }

        // Test first page
        var query1 = new GetPatientsWithPaginationQuery
        {
            PageNumber = 1,
            PageSize = 10
        };

        var result1 = await SendAsync(query1);

        result1.Items.Should().HaveCount(10);
        result1.TotalCount.Should().Be(15);
        result1.TotalPages.Should().Be(2);

        // Test second page
        var query2 = new GetPatientsWithPaginationQuery
        {
            PageNumber = 2,
            PageSize = 10
        };

        var result2 = await SendAsync(query2);

        result2.Items.Should().HaveCount(5);
        result2.TotalCount.Should().Be(15);
        result2.TotalPages.Should().Be(2);
    }

    [Test]
    public async Task ShouldCombineMultipleFilters()
    {
        // Create test patients
        await SendAsync(new CreatePatientCommand
        {
            Name = "John Test",
            FileNo = 99999,
            CitizenId = "999999999",
            Birthdate = new DateTime(1985, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 0,
            Nationality = "Test",
            PhoneNumber = "999-999-9999",
            Country = "TestCountry",
            City = "TestCity",
            FirstVisitDate = DateTime.UtcNow
        });

        await SendAsync(new CreatePatientCommand
        {
            Name = "Jane Test",
            FileNo = 99998,
            CitizenId = "999999998",
            Birthdate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Gender = 1,
            Nationality = "Test",
            PhoneNumber = "999-888-7777",
            Country = "TestCountry",
            City = "TestCity",
            FirstVisitDate = DateTime.UtcNow
        });

        var query = new GetPatientsWithPaginationQuery
        {
            Name = "John",
            PhoneNumber = "999-999-9999",
            PageNumber = 1,
            PageSize = 10
        };

        var result = await SendAsync(query);

        result.Items.Should().HaveCount(1);
        result.Items.First().Name.Should().Contain("John");
        result.Items.First().PhoneNumber.Should().Be("999-999-9999");
    }
}
