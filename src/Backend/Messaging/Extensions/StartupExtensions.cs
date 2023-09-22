using MassTransit;
using MassTransit.Transports.Fabric;
using Messaging.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Messaging.Extensions;

public static class StartupExtensions
{
    public static IServiceCollection ConfigureMessaging(this IServiceCollection services)
    {
        services.AddScoped<IBusProvider, BusProvider>();
        
        services.AddMassTransit(x =>
        {
            // elided...

            x.UsingRabbitMq((context,cfg) =>
            {
                cfg.Host("localhost", "CUSTOM_HOST", h => {
                    h.Username("guest");
                    h.Password("guest");
                });

                cfg.ConfigureEndpoints(context);
            });
        });

        return services;
    }
}