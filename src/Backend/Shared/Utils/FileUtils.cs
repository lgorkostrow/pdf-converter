using Microsoft.AspNetCore.Http;

namespace Shared.Utils;

public static class FileUtils
{
    public static byte[] ConvertFileFormToByteArray(IFormFile formFile)
    {
        using var memoryStream = new MemoryStream();
        formFile.CopyTo(memoryStream);

        return memoryStream.ToArray();
    }
    
    public static string ConvertFileFormToBase64(IFormFile formFile)
    {
        using var memoryStream = new MemoryStream();
        formFile.CopyTo(memoryStream);

        return Convert.ToBase64String(memoryStream.ToArray());
    }

    public static string MimeTypeToExtension(string mimeType)
    {
        var mimeToExtension = new Dictionary<string, string>
        {
            { "image/jpeg", ".jpg" },
            { "image/png", ".png" },
            { "application/pdf", ".pdf" },
            { "text/plain", ".txt" },
        };

        if (!mimeToExtension.ContainsKey(mimeType))
        {
            throw new Exception($"Extension not found for {mimeType}");
        }

        return mimeToExtension[mimeType];
    }
}