namespace Messaging.Abstractions;

public interface IBusProvider
{
    Task Publish<TMessage>(TMessage message) where TMessage : class;
    
    Task<TResponse> RequestAsync<TRequest, TResponse>(TRequest message) where TRequest : class where TResponse : class;
}