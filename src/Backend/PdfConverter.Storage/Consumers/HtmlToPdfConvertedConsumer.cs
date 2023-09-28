using MassTransit;
using Messaging.Messages;
using PdfConverter.Storage.Storages;

namespace PdfConverter.Storage.Consumers;

public class HtmlToPdfConvertedConsumer : IConsumer<HtmlToPdfConvertedEvent>
{
    private readonly IStorage _storage;

    public HtmlToPdfConvertedConsumer(IStorage storage)
    {
        _storage = storage;
    }

    public async Task Consume(ConsumeContext<HtmlToPdfConvertedEvent> context)
    {
        await _storage.Save(context.Message.FileName, context.Message.MimeType, context.Message.FileContent);
    }
}