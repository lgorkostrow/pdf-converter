using Messaging.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace PdfConverter.ApiOrchestrator.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IBusProvider _busProvider;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IBusProvider busProvider)
    {
        _logger = logger;
        _busProvider = busProvider;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<string> Get()
    {
        // await _busProvider.Publish(new Request() { Content = "Test string"});
        var test = await _busProvider.RequestAsync<Request, Response>(new Request() { Content = "Test string"});

        return test.Content;
    }
}
