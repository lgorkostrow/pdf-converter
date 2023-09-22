using MassTransit;
using Messaging.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Messaging.Extensions;

public static class StartupExtensions
{
    public static IServiceCollection ConfigureMessaging(this IServiceCollection services, IConfigurationSection configurationSection)
    {
        services.AddScoped<IBusProvider, BusProvider>();
        
        services.AddMassTransit(x =>
        {
            x.UsingRabbitMq((context,cfg) =>
            {
                cfg.Host(configurationSection.GetSection("Host").Value, configurationSection.GetSection("VHost").Value, h => {
                    h.Username(configurationSection.GetSection("User").Value);
                    h.Password(configurationSection.GetSection("Pass").Value);
                });

                cfg.ConfigureEndpoints(context);
            });
        });

        return services;
    }
}