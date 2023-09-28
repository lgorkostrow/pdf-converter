namespace PdfConverter.Storage.Dtos;

public class FileDto
{
    public string FileName { get; set; }

    public string MimeType { get; set; }

    public byte[] FileContent { get; set; }
}