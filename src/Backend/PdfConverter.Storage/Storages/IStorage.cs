using PdfConverter.Storage.Dtos;
using PdfConverter.Storage.Entities;

namespace PdfConverter.Storage.Storages;

public interface IStorage
{
    Task<FileDto> GetFileById(Guid fileId);
    
    Task<FileEntity> Save(string fileName, string mimeType, byte[] fileContent);
}