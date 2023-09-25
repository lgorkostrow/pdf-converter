using Messaging.Abstractions;

namespace Messaging.Messages;

public class ConvertHtmlToPdfCommand : IMessage
{
    public byte[] FileContent { get; set; }
}