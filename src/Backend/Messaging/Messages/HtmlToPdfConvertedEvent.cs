using Messaging.Abstractions;

namespace Messaging.Messages;

public class HtmlToPdfConvertedEvent : IMessage
{
    public string FileName { get; set; }
    
    public string MimeType { get; set; }
    
    public byte[] FileContent { get; set; }
}