using MassTransit;
using Messaging.Abstractions;

namespace Messaging;

public class BusProvider : IBusProvider
{
    private static readonly TimeSpan DefaultRequestTimeout = TimeSpan.FromSeconds(30);
    
    private readonly IBus _bus;
    private readonly IPublishEndpoint _publishEndpoint;

    public BusProvider(IBus bus, IPublishEndpoint publishEndpoint)
    {
        _bus = bus;
        _publishEndpoint = publishEndpoint;
    }

    public async Task Publish<TMessage>(TMessage message) where TMessage : class
    {
        await _publishEndpoint.Publish(message);
    }

    public async Task<TResponse> RequestAsync<TRequest, TResponse>(TRequest message) where TRequest : class where TResponse : class
    {
        using var client = _bus.CreateClientFactory().CreateRequest(message, timeout: DefaultRequestTimeout);
        var response = await client.GetResponse<TResponse>();

        return response.Message;
    }
}