using Microsoft.AspNetCore.SignalR;

namespace PdfConverter.NotificationService.Hubs;

public class NotificationHub : Hub
{
    // public async Task SendNotification() =>
    //     await Clients.All.SendAsync("newNotification", "test");
}