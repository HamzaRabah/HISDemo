using HISDemo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HISDemo.Infrastructure.Data.Configurations;

public class PatientConfiguration : IEntityTypeConfiguration<Patient>
{
    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.Property(t => t.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(t => t.CitizenId)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(t => t.PhoneNumber)
            .HasMaxLength(20);

        builder.Property(t => t.Email)
            .HasMaxLength(100);

        builder.Property(t => t.Country)
            .HasMaxLength(100);

        builder.Property(t => t.City)
            .HasMaxLength(100);

        builder.Property(t => t.Street)
            .HasMaxLength(200);

        builder.Property(t => t.Address1)
            .HasMaxLength(200);

        builder.Property(t => t.Address2)
            .HasMaxLength(200);

        builder.Property(t => t.ContactPerson)
            .HasMaxLength(200);

        builder.Property(t => t.ContactRelation)
            .HasMaxLength(100);

        builder.Property(t => t.ContactPhone)
            .HasMaxLength(20);

        builder.Property(t => t.Nationality)
            .HasMaxLength(100);
        
        builder.HasIndex(p => p.FileNo)
            .IsUnique();
    }
}
