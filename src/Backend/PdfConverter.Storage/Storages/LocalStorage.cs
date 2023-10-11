using PdfConverter.Storage.Database;
using PdfConverter.Storage.Dtos;
using PdfConverter.Storage.Entities;
using Shared.Utils;

namespace PdfConverter.Storage.Storages;

public class LocalStorage : IStorage
{
    private readonly string _basePath = AppDomain.CurrentDomain.BaseDirectory;
    private readonly string _fileFolderName = "Files";

    private readonly ApplicationDbContext _context;
    
    public LocalStorage(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<FileDto> GetFileById(Guid fileId)
    {
        var file = await _context.Files.FindAsync(fileId);
        if (file is null)
        {
            throw new Exception("File not found");
        }

        return new FileDto()
        {
            FileName = file.FileName,
            MimeType = file.MimeType,
            FileContent = await File.ReadAllBytesAsync(file.StoragePath), 
        };
    }

    public async Task<FileEntity> Save(string fileName, string mimeType, byte[] fileContent)
    {
        var folderPath = Path.Combine(_basePath, _fileFolderName);
        CheckFolder(folderPath);

        var fileNameWithExtension = fileName + FileUtils.MimeTypeToExtension(mimeType);
        var fullPath = Path.Combine(folderPath, fileNameWithExtension);
        
        await File.WriteAllBytesAsync(fullPath, fileContent);

        var file = new FileEntity()
        {
            FileName = fileNameWithExtension,
            MimeType = mimeType,
            StorageProvider = "local",
            StoragePath = fullPath,
            UploadedAt = DateTimeOffset.Now,
        };

        await _context.Files.AddAsync(file);
        await _context.SaveChangesAsync();
        
        return file;
    }

    private void CheckFolder(string folderPath)
    {
        if (Directory.Exists(folderPath))
        {
            return;
        }

        Directory.CreateDirectory(folderPath);
    }
}