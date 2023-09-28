using System.Text.Json.Serialization;
using Shared.Converters;

namespace PdfConverter.ApiOrchestrator.Requests;

public record ConvertingRequest : BaseRequest
{
    public string FileName { get; set; }
    
    public string MimeType { get; set; }
    
    [JsonConverter(typeof(Base64FileJsonConverter))]
    public IFormFile FileContent { get; set; }
}