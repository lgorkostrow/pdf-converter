using MassTransit;
using Messaging.Abstractions;
using Microsoft.AspNetCore.SignalR;
using PdfConverter.NotificationService.Hubs;

namespace PdfConverter.NotificationService.Consumers;

public class NotificationConsumer : IConsumer<NotificationEvent>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<NotificationEvent> context)
    {
        await _hubContext.Clients.All.SendAsync(context.Message.Name, context.Message.Payload);
    }
}