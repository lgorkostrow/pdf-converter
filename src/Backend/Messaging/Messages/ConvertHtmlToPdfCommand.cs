using Messaging.Abstractions;

namespace Messaging.Messages;

public class ConvertHtmlToPdfCommand : IMessage
{
    public string FileName { get; set; }
    
    public byte[] FileContent { get; set; }
}