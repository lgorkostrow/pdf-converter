using PdfConverter.Storage.Dtos;

namespace PdfConverter.Storage.Storages;

public interface IStorage
{
    Task<FileDto> GetFileById(Guid fileId);
    
    Task Save(string fileName, string mimeType, byte[] fileContent);
}