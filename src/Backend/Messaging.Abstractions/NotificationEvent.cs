namespace Messaging.Abstractions;

public class NotificationEvent : IMessage
{
    public string Name { get; set; }

    public object Payload { get; set; }
}