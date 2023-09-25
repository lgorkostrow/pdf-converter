using Messaging.Abstractions;
using Messaging.Messages;
using Microsoft.AspNetCore.Mvc;
using PdfConverter.ApiOrchestrator.Requests;
using Shared.Utils;

namespace PdfConverter.ApiOrchestrator.Controllers;

[ApiController]
public class ConvertingController : BaseApiController
{
    private readonly ILogger<ConvertingController> _logger;
    private readonly IBusProvider _busProvider;

    public ConvertingController(ILogger<ConvertingController> logger, IBusProvider busProvider)
    {
        _logger = logger;
        _busProvider = busProvider;
    }

    [HttpPost("convert")]
    public async Task<IActionResult> Convert([FromBody] ConvertingRequest request)
    {
        await _busProvider.Publish(new ConvertHtmlToPdfCommand()
        {
            FileContent = FileUtils.ConvertFileFormToByteArray(request.FileContent)
        });

        return new AcceptedResult();
    }
}
