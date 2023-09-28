using Microsoft.EntityFrameworkCore;
using PdfConverter.Storage.Entities;

namespace PdfConverter.Storage.Database;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<FileEntity> Files { get; set; }
}