namespace PdfConverter.ApiOrchestrator.Requests;

public record BaseRequest
{
    public Guid CorrelationId { get; set; } = Guid.NewGuid();
}