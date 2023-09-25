namespace Messaging.Abstractions;

public interface IBusProvider
{
    Task Publish<TMessage>(TMessage message) where TMessage : class, IMessage;
    
    Task<TResponse> RequestAsync<TRequest, TResponse>(TRequest message) where TRequest : class, IMessage where TResponse : class;
}