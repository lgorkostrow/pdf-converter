using MassTransit;
using Messaging.Abstractions;
using Messaging.Constants;
using Messaging.Messages;
using PdfConverter.Storage.Storages;

namespace PdfConverter.Storage.Consumers;

public class HtmlToPdfConvertedConsumer : IConsumer<HtmlToPdfConvertedEvent>
{
    private readonly IStorage _storage;
    private readonly IBusProvider _busProvider;

    public HtmlToPdfConvertedConsumer(IStorage storage, IBusProvider busProvider)
    {
        _storage = storage;
        _busProvider = busProvider;
    }

    public async Task Consume(ConsumeContext<HtmlToPdfConvertedEvent> context)
    {
        var file = await _storage.Save(context.Message.FileName, context.Message.MimeType, context.Message.FileContent);

        await _busProvider.Publish(new NotificationEvent()
        {
            Name = NotificationEventNames.FileSaved,
            Payload = new
            {
                Id = file.Id,
            },
        });
    }
}