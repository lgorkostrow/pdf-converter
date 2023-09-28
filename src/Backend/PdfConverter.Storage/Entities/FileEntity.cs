namespace PdfConverter.Storage.Entities;

public class FileEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string FileName { get; set; }

    public string MimeType { get; set; }

    public string StorageProvider { get; set; }

    public string StoragePath { get; set; }

    // TODO Update with an user id
    public Guid UploadedBy { get; set; } = Guid.NewGuid();

    public DateTimeOffset UploadedAt { get; set; }
}