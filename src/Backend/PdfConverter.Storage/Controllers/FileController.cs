using Microsoft.AspNetCore.Mvc;
using PdfConverter.Storage.Storages;
using Shared.Controllers;

namespace PdfConverter.Storage.Controllers;

[ApiController]
public class FileController : BaseApiController
{
    private readonly IStorage _storage;

    public FileController(IStorage storage)
    {
        _storage = storage;
    }

    [HttpGet("{fileId:guid}")]
    public async Task<FileContentResult> GetFile(Guid fileId)
    {
        var fileDto = await _storage.GetFileById(fileId);
        
        return File(fileDto.FileContent, fileDto.MimeType, fileDto.FileName);
    }
}