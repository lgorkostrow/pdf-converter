# Use the official ASP.NET Core SDK as the build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the solution files and restore dependencies
COPY ./src/Backend/PdfConverter.ApiOrchestrator/PdfConverter.ApiOrchestrator.csproj ./PdfConverter.ApiOrchestrator/
COPY ./src/Backend/Messaging/Messaging.csproj ./Messaging/
COPY ./src/Backend/Messaging.Abstractions/Messaging.Abstractions.csproj ./Messaging.Abstractions/
COPY ./src/Backend/Shared/Shared.csproj ./Shared/

# Restore NuGet packages for all projects
RUN dotnet restore "PdfConverter.ApiOrchestrator/PdfConverter.ApiOrchestrator.csproj"

# Copy the source code files to the container
COPY ./src/Backend/ ./

# Build the solution
RUN dotnet build "PdfConverter.ApiOrchestrator/PdfConverter.ApiOrchestrator.csproj" -c Release

# Publish the projects
RUN dotnet publish "PdfConverter.ApiOrchestrator/PdfConverter.ApiOrchestrator.csproj" -c Release -o /app/publish --no-build

# Use the official ASP.NET Core runtime as the final image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set the working directory to /app
WORKDIR /app

# Copy the published output from the build image
COPY --from=build /app/publish .

# Expose the port your application listens on
EXPOSE 80

# Define the entry point for your application
CMD ["dotnet", "PdfConverter.ApiOrchestrator.dll"]